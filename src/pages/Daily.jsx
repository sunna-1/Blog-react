import { dailyEntries, site } from '../data/content'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal'
import { SketchWiggleLine } from '../components/SketchSvg'
import { SketchPen } from '../components/SketchSvg'

export default function Daily() {
  return (
    <div className="page-inner">
      <header className="page-header">
        <ScrollReveal>
          <span className="section-kicker">Daily Notes</span>
          <h1>日常分享</h1>
          <SketchWiggleLine />
          <p className="page-lead">
            轻一点的记录：今天的心情、偶然的想法、还没长成文章的小片段。
          </p>
        </ScrollReveal>
        <SketchPen className="page-header-art" />
      </header>

      <div className="daily-timeline">
        <StaggerGroup>
          {dailyEntries.map((entry, index) => (
            <StaggerItem key={entry.id}>
              <article className="daily-card">
                <div className="daily-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="daily-body">
                  <div className="entry-meta">
                    <span>{entry.date}</span>
                    <span className="daily-mood">{entry.mood}</span>
                  </div>
                  <h2>{entry.title}</h2>
                  <p>{entry.excerpt}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

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
