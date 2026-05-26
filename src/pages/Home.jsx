import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { site, quotes, articles, dailyEntries } from '../data/content'
import { ScrollReveal, StaggerGroup, StaggerItem } from '../components/ScrollReveal'
import QuoteCards from '../components/QuoteCards'
import {
  SketchEye,
  SketchDiary,
  SketchPen,
  SketchWiggleLine,
} from '../components/SketchSvg'
import { SketchPeony, SketchCat } from '../components/sketch/SketchLife'

const heroEase = [0.22, 1, 0.36, 1]

export default function Home() {
  const featuredQuote = quotes[0]

  return (
    <div className="page-home">
      <div className="home-inline-deco" aria-hidden="true">
        <SketchPeony className="home-deco-peony" />
        <SketchCat className="home-deco-cat" />
      </div>
      <section className="hero-sketch">
        <div className="hero-copy">
          <motion.p
            className="hero-script"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: heroEase }}
          >
            你好，这里是
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: heroEase }}
          >
            {site.nameCn}
          </motion.h1>
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: heroEase }}
          >
            {site.tagline}
          </motion.p>
          <SketchWiggleLine className="hero-underline" />
          <motion.p
            className="hero-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.28 }}
          >
            {site.intro}
          </motion.p>
          <motion.div
            className="hero-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link className="sketch-link" to="/articles">
              阅读文章 →
            </Link>
            <Link className="sketch-link subtle" to="/daily">
              翻翻日常 →
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: heroEase }}
        >
          <SketchEye className="hero-eye" />
          <blockquote className="hero-quote">
            <p>「{featuredQuote.text}」</p>
            <cite>— {featuredQuote.author}</cite>
            <span className="quote-cn">{featuredQuote.cn}</span>
          </blockquote>
        </motion.div>
      </section>

      <section className="home-panels">
        <StaggerGroup className="panel-grid">
          <StaggerItem>
            <article className="sketch-panel">
              <SketchDiary className="panel-icon" />
              <h2>关于这本日记</h2>
              <p>
                不赶热点，也不堆功能。这里更像一本会慢慢变厚的本子：写下日常、收藏想法、留下文章。
              </p>
              <Link className="sketch-link" to={`/articles/${articles[0].id}`}>
                更多文章 →
              </Link>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="sketch-panel">
              <SketchPen className="panel-icon" />
              <h2>近期文章</h2>
              <p>{articles[0].excerpt}</p>
              <Link className="sketch-link" to="/articles">
                进入文章页 →
              </Link>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="sketch-panel">
              <div className="panel-icon panel-icon-text" aria-hidden="true">
                ☁
              </div>
              <h2>日常片段</h2>
              <p>{dailyEntries[0].excerpt}</p>
              <Link className="sketch-link" to="/daily">
                看看日常 →
              </Link>
            </article>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className="quotes-section">
        <ScrollReveal>
          <div className="section-head">
            <span className="section-kicker">Words worth keeping</span>
            <h2>名人名言 · 偶尔照亮一行字</h2>
          </div>
        </ScrollReveal>
        <QuoteCards />
      </section>

      <footer className="page-footer" id="page-end">
        <ScrollReveal>
          <SketchWiggleLine className="footer-line" />
          <h2>保持联系</h2>
          <p>如果你也想聊聊想法、合作或只是打个招呼，欢迎来信。</p>
          <div className="footer-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.github} target="_blank" rel="noreferrer">
              {site.githubLabel}
            </a>
          </div>
          <p className="footer-note">Built with care · Sunna&apos;s Diary</p>
        </ScrollReveal>
      </footer>
    </div>
  )
}
