import { Link, useParams, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getArticleById, articles, site } from '../data/content'
import MarkdownContent from '../components/MarkdownContent'
import { ScrollReveal } from '../components/ScrollReveal'
import { SketchWiggleLine } from '../components/SketchSvg'
import { SketchBooks } from '../components/sketch/SketchLife'
import { BrandLogo } from '../components/DecorImage'

export default function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function loadArticle() {
      setLoading(true)
      const data = await getArticleById(id)
      if (data) {
        setArticle(data)
      } else {
        setNotFound(true)
      }
      setLoading(false)
    }
    loadArticle()
  }, [id])

  if (loading) {
    return (
      <div className="page-inner article-detail">
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  if (notFound || !article) {
    return <Navigate to="/articles" replace />
  }

  const others = articles.filter((a) => a.id !== id).slice(0, 2)

  return (
    <div className="page-inner article-detail">
      <header className="page-header article-header">
        <ScrollReveal>
          <Link className="sketch-link subtle back-link" to="/articles">
            ← 返回文章列表
          </Link>
          <div className="entry-meta article-meta-top">
            <span>{article.category}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
          <h1>{article.title}</h1>
          <SketchWiggleLine />
          <p className="page-lead">{article.excerpt}</p>
        </ScrollReveal>
        <SketchBooks className="page-header-art" />
      </header>

      <ScrollReveal>
        <article className="article-body-card">
          <MarkdownContent source={article.body} />
        </article>
      </ScrollReveal>

      <ScrollReveal className="article-end-brand">
        <BrandLogo className="article-end-logo" />
      </ScrollReveal>

      {others.length > 0 && (
        <section className="article-more">
          <h2>继续阅读</h2>
          <ul>
            {others.map((a) => (
              <li key={a.id}>
                <Link to={`/articles/${a.id}`}>{a.title}</Link>
              </li>
            ))}
          </ul>
        </section>
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
