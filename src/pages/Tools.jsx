import { Link } from 'react-router-dom'
import { tools, site } from '../data/content'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal'
import { SketchTools, SketchWiggleLine } from '../components/SketchSvg'
import { SketchCat, SketchPeony } from '../components/sketch/SketchLife'

export default function Tools() {
  return (
    <div className="page-inner">
      <header className="page-header">
        <ScrollReveal>
          <span className="section-kicker">Toolbox</span>
          <h1>实用工具</h1>
          <SketchWiggleLine />
          <p className="page-lead">
            一些实用的在线小工具。会持续更新和增加，欢迎随时来看看有没有新玩具可以用。
          </p>
        </ScrollReveal>
        <SketchTools className="page-header-art" />
      </header>

      <div className="tools-inline-deco" aria-hidden="true">
        <SketchPeony className="tools-deco-peony" />
        <SketchCat className="tools-deco-cat" />
      </div>

      <StaggerGroup className="tools-grid">
        {tools.map((tool) => (
          <StaggerItem key={tool.id}>
            <article className="tool-card">
              <span className="tool-status is-live">{tool.status}</span>
              <h2>{tool.title}</h2>
              <p>{tool.desc}</p>
              {tool.external ? (
                <a
                  className="tool-primary-btn link-btn"
                  href={tool.path}
                  target="_blank"
                  rel="noreferrer"
                >
                  打开工具 →
                </a>
              ) : (
                <Link className="tool-primary-btn link-btn" to={tool.path}>
                  打开工具 →
                </Link>
              )}
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <ScrollReveal className="tools-coming">
        <p>有想用的工具？写信告诉我，我会优先做进日记本里。</p>
        <a className="sketch-link" href={`mailto:${site.email}`}>
          {site.email} →
        </a>
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
