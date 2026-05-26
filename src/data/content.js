export const site = {
  name: "Sunna's Diary",
  nameCn: 'Sunna 的日记本',
  subtitle: '日常 · 想法 · 文章',
  tagline: '把值得留下的，写进这一页纸里',
  intro:
    '这里是我记录日常、有趣想法与个人文章的地方。不追求热闹，只保留真实、好看、偶尔值得回看的片段。',
  email: 'z2984473674@gmail.com',
  github: 'https://github.com/sunna-1',
  githubLabel: 'github.com/sunna-1',
}

export const quotes = [
  {
    text: 'You sort of start thinking anything’s possible if you’ve got enough nerve.',
    author: 'J.K. Rowling',
    cn: '“如果你有足够的胆量，你就会开始觉得任何事情都是可能的。” ————J.K. 罗琳',
  },
  {
    text: ' We think too much, and feel too little.',
    author: 'Charlie Chaplin',
    cn: '“我们想的太多，却疏于感受。” ————查理·卓别林',
  },
  {
    text: 'If you shed tears when you miss the sun, you also miss the stars.',
    author: 'Rabindranath Tagore',
    cn: '“如果你在错过太阳时哭泣，那么你也将错过群星。” ————拉宾德拉纳特·泰戈尔',
  },
  {
    text: 'The art of being wise is knowing what to overlook.',
    author: 'William James',
    cn: '“智慧的艺术，就在于懂得什么可以略过。” ————威廉·詹姆斯',
  },
]

export const articles = [
  {
    id: 'garden',
    title: '把个人博客搭成长期生长的数字花园',
    excerpt:
      '从信息架构、文章卡片到部署流程，记录一个博客如何变成可持续维护的知识入口。',
    category: '建站札记',
    date: '2026-05-25',
    readTime: '6 min',
  },
  {
    id: 'cloudflare',
    title: 'Cloudflare Pages 部署 React 静态站点要点',
    excerpt: '整理 Vite 构建、分支与构建命令，减少上线时的来回试错。',
    category: 'Cloudflare',
    date: '2026-05-24',
    readTime: '4 min',
  },
  {
    id: 'modules',
    title: '用小而稳定的模块管理博客内容',
    excerpt: '把文章、标签、时间线抽成数据，方便后续接入 Markdown 或 CMS。',
    category: 'React',
    date: '2026-05-22',
    readTime: '5 min',
  },
  {
    id: 'writing',
    title: '写作时的输入法：先收集，再判断，最后表达',
    excerpt: '一套轻量写作流程，减少空白页压力，让表达更自然。',
    category: '写作',
    date: '2026-05-18',
    readTime: '7 min',
  },
]

export async function getArticleById(id) {
  const meta = articles.find((a) => a.id === id)
  if (!meta) return null

  try {
    const response = await fetch(`/articles/${id}.md`)
    if (!response.ok) return null
    const body = await response.text()
    return { ...meta, body }
  } catch (error) {
    console.error(`Failed to load article ${id}:`, error)
    return null
  }
}

export const dailyEntries = [
  {
    id: 'd1',
    date: '2026-05-26',
    mood: '晴',
    title: '给博客换上手绘本的壳',
    excerpt: '把界面从模板感，慢慢调成更像自己日记本的样子。线条、留白和动效，都在说「这是我写的地方」。',
  },
  {
    id: 'd2',
    date: '2026-05-24',
    mood: '阴转晴',
    title: '部署成功后的那一小会儿',
    excerpt: '看到 Cloudflare 上页面刷新的瞬间，比想象中安静，但心里很亮。',
  },
  {
    id: 'd3',
    date: '2026-05-20',
    mood: '夜',
    title: '一条没发出去的消息',
    excerpt: '有些想法不适合立刻分享，先写在日记里，等它自己长大。',
  },
]

export const tools = [
  {
    id: 'markdown',
    title: 'Markdown 写作预览',
    desc: '左侧书写、右侧实时预览，适合起草文章与日常片段。纯浏览器运行。',
    status: '可用',
    path: '/tools/markdown',
  },
  {
    id: 'complexity',
    title: '复杂度评估',
    desc: '粘贴代码，启发式估算时间/空间复杂度（供学习参考，需人工复核）。',
    status: '可用',
    path: '/tools/complexity',
  },
]
