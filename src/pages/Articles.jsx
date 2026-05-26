import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles, site } from '../data/content'
import { ScrollReveal } from '../components/ScrollReveal'
import { SketchWiggleLine } from '../components/SketchSvg'
import { SketchDiary } from '../components/SketchSvg'

const PAGE_SIZE = 5

export default function Articles() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const q = query.trim().toLowerCase()
  const filtered = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    : articles

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
          <span className="section-kicker">Articles</span>
          <h1>文章</h1>
          <SketchWiggleLine />
          <p className="page-lead">
            更长一点的思考与记录，关于建站、工具、写作，以及值得反复回看的话题。
          </p>
        </ScrollReveal>
        <SketchDiary className="page-header-art" />
      </header>

      <div className="search-bar-wrap">
        <input
          className="search-input"
          type="text"
          placeholder="搜索标题、摘要或分类…"
          value={query}
          onChange={handleSearch}
        />
        {q && (
          <span className="search-count">
            {filtered.length > 0 ? `找到 ${filtered.length} 篇` : '无匹配结果'}
          </span>
        )}
      </div>

      <div className="entry-list">
        {pageItems.length > 0 ? (
          pageItems.map((post) => (
            <article key={post.id} className="entry-card">
              <div className="entry-meta">
                <span>{post.category}</span>
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link className="sketch-link" to={`/articles/${post.id}`}>
                阅读全文 →
              </Link>
            </article>
          ))
        ) : (
          <p className="search-empty">没有找到匹配的文章，换个关键词试试？</p>
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
