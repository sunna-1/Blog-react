import { useState } from 'react'
import { dailyEntries, site } from '../data/content'
import { ScrollReveal } from '../components/ScrollReveal'
import { SketchWiggleLine } from '../components/SketchSvg'
import { SketchPen } from '../components/SketchSvg'

const PAGE_SIZE = 5

export default function Daily() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const q = query.trim().toLowerCase()
  const filtered = q
    ? dailyEntries.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.excerpt.toLowerCase().includes(q) ||
          (e.mood && e.mood.toLowerCase().includes(q))
      )
    : dailyEntries

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function handleSearch(e) {
    setQuery(e.target.value)
    setPage(1)
  }

  return (
    <div className="page-inner">
      <header className="page-header">
        <ScrollReveal>
          <span className="section-kicker">Daily Notes</span>
          <h1>日常动态</h1>
          <SketchWiggleLine />
          <p className="page-lead">
            轻一点的记录：今天的心情、偶然的想法、还没长成文章的小片段。
          </p>
        </ScrollReveal>
        <SketchPen className="page-header-art" />
      </header>

      <div className="search-bar-wrap">
        <input
          className="search-input"
          type="text"
          placeholder="搜索标题、片段或心情…"
          value={query}
          onChange={handleSearch}
        />
        {q && (
          <span className="search-count">
            {filtered.length > 0 ? `找到 ${filtered.length} 条` : '无匹配结果'}
          </span>
        )}
      </div>

      <div className="daily-timeline">
        {pageItems.length > 0 ? (
          pageItems.map((entry, index) => (
            <article key={entry.id} className="daily-card">
              <div className="daily-index">
                {String((safePage - 1) * PAGE_SIZE + index + 1).padStart(2, '0')}
              </div>
              <div className="daily-body">
                <div className="entry-meta">
                  <span>{entry.date}</span>
                  <span className="daily-mood">{entry.mood}</span>
                </div>
                <h2>{entry.title}</h2>
                <p>{entry.excerpt}</p>
              </div>
            </article>
          ))
        ) : (
          <p className="search-empty">没有找到匹配的日常，换个关键词试试？</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← 上一页
          </button>
          <span className="page-info">
            {safePage} / {totalPages}
          </span>
          <button
            className="page-btn"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            下一页 →
          </button>
        </div>
      )}

      <ScrollReveal className="daily-note">
        <p>更多日常会陆续写进这本日记里。</p>
      </ScrollReveal>

      <footer className="page-footer compact">
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {' · '}
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  )
}
