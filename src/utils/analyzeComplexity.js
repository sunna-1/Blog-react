/**
 * 客户端启发式复杂度分析（适用于 Cloudflare Pages 静态部署，无后端）
 */

const LOOP_RE =
  /\b(for|while)\s*\([^)]*\)|\bfor\s*\([^)]*\)|\bdo\s*\{[\s\S]*?\}\s*while\b/g
const FOR_OF_RE = /\bfor\s*\(\s*(const|let|var)\s+\w+\s+of\s+/g
const RECURSION_RE = /\b(\w+)\s*\([^)]*\)[\s\S]*?\b\1\s*\(/g
const SORT_RE = /\.sort\s*\(|sorted\s*\(|sort\s*\(/gi
const BINARY_SEARCH_RE = /(?:left|right|mid|lo|hi)\s*[=<>]|Math\.floor\s*\(\s*\([^)]*\/\s*2/gi
const HASH_STRUCT_RE = /\b(new\s+)?(Map|Set|Dict|defaultdict)\b|=\s*\{\}|=\s*\[\]/gi
const MATRIX_RE = /\[\s*\w+\s*\]\s*\[\s*\w+\s*\]/g

function maxLoopDepth(code) {
  const lines = code.split('\n')
  let depth = 0
  let max = 0
  for (const line of lines) {
    const opens = (line.match(/\b(for|while)\b/g) || []).length
    const closes = (line.match(/\}/g) || []).length
    depth += opens
    max = Math.max(max, depth)
    if (closes) depth = Math.max(0, depth - closes)
  }
  const loopMatches = code.match(LOOP_RE) || []
  const nestedEstimate = Math.min(4, Math.max(max, Math.ceil(loopMatches.length / 3)))
  return nestedEstimate
}

function detectRecursion(code) {
  const fnNames = [...code.matchAll(/\bfunction\s+(\w+)|(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/g)]
    .map((m) => m[1] || m[2])
    .filter(Boolean)

  for (const name of fnNames) {
    const bodyRe = new RegExp(
      `(?:function\\s+${name}|${name}\\s*=\\s*(?:async\\s*)?\\([^)]*\\)\\s*=>)[\\s\\S]*?\\b${name}\\s*\\(`,
      'i',
    )
    if (bodyRe.test(code)) return { has: true, name }
  }
  return { has: false }
}

function timeFromDepth(depth, code) {
  if (SORT_RE.test(code) && depth <= 1) {
    return { bigO: 'O(n log n)', label: '线性对数阶', reason: '检测到排序操作，通常主导复杂度为 O(n log n)。' }
  }
  if (BINARY_SEARCH_RE.test(code) && depth <= 1) {
    return { bigO: 'O(log n)', label: '对数阶', reason: '检测到二分或折半缩小搜索空间的写法。' }
  }

  const recursion = detectRecursion(code)
  if (recursion.has) {
    if (/fib|fibonacci/i.test(code) && !/memo|cache|dp|动态规划/i.test(code)) {
      return {
        bigO: 'O(2^n)',
        label: '指数阶',
        reason: `函数「${recursion.name}」存在递归，且疑似斐波那契型重复子问题（未检测到记忆化）。`,
      }
    }
    return {
      bigO: 'O(n) ~ O(2^n)',
      label: '递归',
      reason: `函数「${recursion.name}」存在递归，具体阶取决于每层递归次数与深度，需结合业务判断。`,
    }
  }

  const table = {
    0: { bigO: 'O(1)', label: '常数阶', reason: '未检测到明显循环或递归结构。' },
    1: { bigO: 'O(n)', label: '线性阶', reason: '检测到单层循环或单次遍历结构。' },
    2: { bigO: 'O(n²)', label: '平方阶', reason: '检测到约两层嵌套循环结构。' },
    3: { bigO: 'O(n³)', label: '立方阶', reason: '检测到约三层嵌套循环结构。' },
  }
  const d = Math.min(3, depth)
  return table[d] || table[3]
}

function spaceEstimate(code) {
  let notes = []
  let bigO = 'O(1)'

  const hashUses = (code.match(HASH_STRUCT_RE) || []).length
  const matrixUses = (code.match(MATRIX_RE) || []).length
  const recursion = detectRecursion(code)

  if (hashUses > 0) {
    bigO = 'O(n)'
    notes.push('使用了哈希表 / Map / Set 或动态累积结构，额外空间通常与输入规模相关。')
  }
  if (matrixUses > 0) {
    bigO = bigO === 'O(n)' ? 'O(n²)' : 'O(n²)'
    notes.push('检测到二维下标访问，可能存在二维辅助数组。')
  }
  if (recursion.has) {
    bigO = notes.length ? 'O(n) ~ O(n²)' : 'O(n)'
    notes.push('递归会占用调用栈空间，深度越大空间越高（最坏 O(n)）。')
  }
  if (/memo|cache|dp|动态规划/i.test(code)) {
    bigO = 'O(n)'
    notes.push('检测到记忆化 / DP 表，通常需要 O(n) 额外空间。')
  }
  if (!notes.length) {
    notes.push('主要为常数级辅助变量，无显著额外数据结构。')
  }

  return { bigO, label: '空间复杂度', notes }
}

export function analyzeComplexity(code) {
  const trimmed = code?.trim() ?? ''
  if (!trimmed) {
    return {
      ok: false,
      error: '请粘贴代码或算法描述后再分析。',
    }
  }

  const depth = maxLoopDepth(trimmed)
  const time = timeFromDepth(depth, trimmed)
  const space = spaceEstimate(trimmed)
  const forOfCount = (trimmed.match(FOR_OF_RE) || []).length

  const hints = []
  if (forOfCount > 0) hints.push(`含 ${forOfCount} 处 for...of，通常按 O(n) 遍历集合处理。`)
  if (SORT_RE.test(trimmed)) hints.push('含排序调用，请关注是否成为性能瓶颈。')

  const confidence =
    depth >= 2 || detectRecursion(trimmed).has ? '中' : hints.length ? '中' : '较高'

  return {
    ok: true,
    time: {
      bigO: time.bigO,
      label: time.label,
      reason: time.reason,
    },
    space: {
      bigO: space.bigO,
      notes: space.notes,
    },
    meta: {
      loopDepthEstimate: depth,
      confidence,
      hints,
      disclaimer:
        '此为浏览器端启发式估算，不能替代严格证明；递归分治、摊还分析等复杂情形请人工复核。',
    },
  }
}
