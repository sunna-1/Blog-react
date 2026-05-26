import { Link } from 'react-router-dom'
import { articles, site } from '../data/content'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal'
import { SketchWiggleLine } from '../components/SketchSvg'
import { SketchDiary } from '../components/SketchSvg'

export default function Articles() {
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

      <StaggerGroup className="entry-list">
        {articles.map((post) => (
          <StaggerItem key={post.id}>
            <article className="entry-card">
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
          </StaggerItem>
        ))}
      </StaggerGroup>

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
