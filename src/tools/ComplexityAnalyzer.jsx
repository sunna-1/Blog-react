import { useState } from 'react'
import { Link } from 'react-router-dom'
import { analyzeComplexity } from '../utils/analyzeComplexity'
import { ScrollReveal } from '../components/ScrollReveal'
import { SketchWiggleLine } from '../components/SketchSvg'
import { SketchTools } from '../components/SketchSvg'
import { site } from '../data/content'

const sampleCode = `function bubbleSort(arr) {
  const n = arr.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}`

export default function ComplexityAnalyzer() {
  const [code, setCode] = useState(sampleCode)
  const [result, setResult] = useState(() => analyzeComplexity(sampleCode))

  function handleAnalyze() {
    setResult(analyzeComplexity(code))
  }

  return (
    <div className="page-inner tool-page">
      <header className="page-header">
        <ScrollReveal>
          <Link className="sketch-link subtle back-link" to="/tools">
            ← 返回工具箱
          </Link>
          <span className="section-kicker">Algorithm</span>
          <h1>复杂度评估</h1>
          <SketchWiggleLine />
          <p className="page-lead">
            在浏览器中做启发式分析，适合学习与草稿阶段。复杂算法请结合人工推导复核。
          </p>
        </ScrollReveal>
        <SketchTools className="page-header-art" />
      </header>

      <div className="tool-workspace complexity-workspace">
        <label className="tool-pane full-width">
          <span className="pane-label">代码 / 伪代码</span>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            rows={14}
            aria-label="待分析代码"
          />
        </label>
        <div className="tool-actions">
          <button type="button" className="tool-primary-btn" onClick={handleAnalyze}>
            分析复杂度
          </button>
          <button
            type="button"
            className="tool-secondary-btn"
            onClick={() => {
              setCode(sampleCode)
              setResult(analyzeComplexity(sampleCode))
            }}
          >
            载入示例
          </button>
        </div>

        {result && (
          <div className="complexity-result">
            {!result.ok ? (
              <p className="result-error">{result.error}</p>
            ) : (
              <>
                <div className="result-cards">
                  <article className="result-card">
                    <h2>时间复杂度</h2>
                    <p className="result-big-o">{result.time.bigO}</p>
                    <p className="result-label">{result.time.label}</p>
                    <p>{result.time.reason}</p>
                  </article>
                  <article className="result-card">
                    <h2>空间复杂度</h2>
                    <p className="result-big-o">{result.space.bigO}</p>
                    <ul>
                      {result.space.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </article>
                </div>
                <p className="result-meta">
                  嵌套层级估计：{result.meta.loopDepthEstimate} · 置信度：
                  {result.meta.confidence}
                  {result.meta.hints?.length > 0 && (
                    <> · {result.meta.hints.join(' ')}</>
                  )}
                </p>
                <p className="result-disclaimer">{result.meta.disclaimer}</p>
              </>
            )}
          </div>
        )}
      </div>

      <footer className="page-footer compact">
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </footer>
    </div>
  )
}
