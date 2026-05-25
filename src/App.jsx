import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Calendar,
  Code,
  Compass,
  Fire,
  FolderOpen,
  Github,
  Home,
  Like,
  Link,
  Loading,
  Moon,
  Notes,
  Planet,
  ReadBook,
  Rocket,
  Rss,
  Search,
  Send,
  Sun,
  Tag,
  Terminal,
  Time,
  User,
} from '@icon-park/react'
import './App.css'

const navItems = [
  { label: '首页', href: '#home', icon: Home },
  { label: '文章', href: '#posts', icon: ReadBook },
  { label: '推荐', href: '#links', icon: Link },
  { label: '关于', href: '#about', icon: User },
]

const posts = [
  {
    title: '把个人博客搭成长期生长的数字花园',
    excerpt:
      '从信息架构、文章卡片、标签系统到部署流程，记录一个博客如何变成可持续维护的知识入口。',
    category: '建站札记',
    date: '2026-05-25',
    readTime: '6 min',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    title: 'Cloudflare Pages 部署 React 静态站点要点',
    excerpt:
      '整理 Vite 构建产物、默认分支、构建命令和环境变量的配置方式，减少上线时的来回试错。',
    category: 'Cloudflare',
    date: '2026-05-24',
    readTime: '4 min',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    title: '用小而稳定的模块管理博客内容',
    excerpt:
      '把文章、链接、标签、时间线抽成数据数组，让页面保持可编辑，也方便后续接入 CMS 或 Markdown。',
    category: 'React',
    date: '2026-05-22',
    readTime: '5 min',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    title: '写作时的输入法：先收集，再判断，最后表达',
    excerpt:
      '一套轻量写作流程：把灵感、引用、草稿和发布清单放进同一个节奏里，减少空白页压力。',
    category: '写作',
    date: '2026-05-18',
    readTime: '7 min',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
]

const recommendedLinks = [
  {
    title: 'React',
    url: 'https://react.dev',
    desc: 'React 官方文档与最佳实践。',
    icon: Code,
  },
  {
    title: 'Vite',
    url: 'https://vite.dev',
    desc: '轻量快速的前端构建工具。',
    icon: Rocket,
  },
  {
    title: 'Cloudflare Pages',
    url: 'https://pages.cloudflare.com',
    desc: '适合静态站点和前端应用的部署平台。',
    icon: Planet,
  },
  {
    title: 'IconPark',
    url: 'https://iconpark.oceanengine.com',
    desc: '丰富、统一、可组件化的图标库。',
    icon: Compass,
  },
]

const categories = ['全部', 'React', 'Cloudflare', '写作', '建站札记']

const timeline = [
  '整理博客视觉风格和首页结构',
  '补充 Markdown 或 CMS 内容源',
  '接入搜索、归档和文章详情页',
  '部署到 Cloudflare Pages 并绑定域名',
]

const stats = [
  { value: '04', label: '精选文章' },
  { value: '12', label: '主题标签' },
  { value: '∞', label: '长期更新' },
]

function Icon({ as: Component, size = 20 }) {
  return (
    <Component
      className="icon"
      theme="outline"
      size={size}
      strokeWidth={3}
      aria-hidden="true"
    />
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('全部')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  const filteredPosts = useMemo(() => {
    if (activeCategory === '全部') return posts
    return posts.filter((post) => post.category === activeCategory)
  }, [activeCategory])

  const featuredPost = posts.find((post) => post.featured)

  if (isLoading) {
    return (
      <main className="loader-page" aria-label="站点加载中">
        <div className="loader-mark">
          <Icon as={Loading} size={34} />
        </div>
        <h1>Sunna Blog</h1>
        <p>正在整理文字、灵感和链接。</p>
        <button type="button" onClick={() => setIsLoading(false)}>
          进入博客
        </button>
      </main>
    )
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Sunna Blog 首页">
          <span className="brand-mark">S</span>
          <span>Sunna Blog</span>
        </a>
        <nav aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              <Icon as={item.icon} size={18} />
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={() => setDarkMode((value) => !value)}
          aria-label={darkMode ? '切换浅色模式' : '切换深色模式'}
        >
          <Icon as={darkMode ? Sun : Moon} size={18} />
        </button>
      </header>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <h1>记录技术、写作和生活里值得反复回看的东西。</h1>
          <p>
            一个面向长期积累的个人博客模板：清爽、现代、可扩展，适合后续接入文章详情、Markdown、CMS 或 Cloudflare Pages 部署流程。
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#posts">
              阅读文章
              <Icon as={ArrowRight} size={18} />
            </a>
            <a className="secondary-action" href="#links">
              收藏站点
              <Icon as={Bookmark} size={18} />
            </a>
          </div>
          <div className="hero-stats" aria-label="博客概览">
            {stats.map((item) => (
              <span key={item.label}>
                <strong>{item.value}</strong>
                {item.label}
              </span>
            ))}
          </div>
        </div>
        <article className="feature-card" aria-label="精选文章">
          <img src={featuredPost.image} alt="" />
          <div>
            <span className="section-label">
              <Icon as={Fire} size={16} />
              今日推荐
            </span>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.excerpt}</p>
            <a href="#posts">
              查看精选
              <Icon as={ArrowRight} size={17} />
            </a>
          </div>
        </article>
      </section>

      <section className="toolbar-section" aria-label="博客工具">
        <label className="search-box">
          <Icon as={Search} size={18} />
          <input type="search" placeholder="搜索文章、标签或灵感" />
        </label>
        <div className="quick-actions">
          <button type="button">
            <Icon as={Rss} size={18} />
            RSS
          </button>
          <button type="button">
            <Icon as={Github} size={18} />
            GitHub
          </button>
        </div>
      </section>

      <section className="content-grid" id="posts">
        <div className="section-heading">
          <span className="section-label">
            <Icon as={BookOpen} size={16} />
            博客文章
          </span>
          <h2>近期文章</h2>
          <p>筛选不同主题，快速找到现在想读的内容。</p>
        </div>

        <div className="category-tabs" role="tablist" aria-label="文章分类">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <article className="post-card" key={post.title}>
              <img src={post.image} alt="" />
              <div className="post-content">
                <div className="post-meta">
                  <span>
                    <Icon as={Tag} size={15} />
                    {post.category}
                  </span>
                  <span>
                    <Icon as={Time} size={15} />
                    {post.readTime}
                  </span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <footer>
                  <span>
                    <Icon as={Calendar} size={15} />
                    {post.date}
                  </span>
                  <a href="#posts" aria-label={`阅读 ${post.title}`}>
                    <Icon as={ArrowRight} size={18} />
                  </a>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="links-section" id="links">
        <div className="section-heading">
          <span className="section-label">
            <Icon as={Link} size={16} />
            网址推荐
          </span>
          <h2>常用资源</h2>
          <p>把开发、部署、图标和文档入口放在同一个地方。</p>
        </div>
        <div className="link-list">
          {recommendedLinks.map((item) => (
            <a
              className="resource-card"
              href={item.url}
              key={item.title}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <Icon as={item.icon} size={22} />
              </span>
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="extend-section" id="about">
        <div className="about-panel">
          <span className="section-label">
            <Icon as={FolderOpen} size={16} />
            可扩展模块
          </span>
          <h2>内容可继续长出来</h2>
          <p>
            当前页面已经预留文章列表、资源链接、标签筛选、订阅入口、时间线和关于模块。后续可以把这些数据替换成 Markdown、接口或 CMS。
          </p>
          <div className="module-tags">
            {['文章详情', '归档页', '友链', '项目集', '留言板', '搜索'].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="timeline-panel">
          <h3>
            <Icon as={Notes} size={20} />
            下一步路线
          </h3>
          {timeline.map((item, index) => (
            <div className="timeline-item" key={item}>
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="subscribe-section">
        <div>
          <span className="section-label">
            <Icon as={Like} size={16} />
            保持更新
          </span>
          <h2>订阅新的文章灵感</h2>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label>
            <Icon as={Terminal} size={18} />
            <input type="email" placeholder="your@email.com" />
          </label>
          <button type="submit">
            <Icon as={Send} size={18} />
            订阅
          </button>
        </form>
      </section>

      <footer className="site-footer">
        <span>© 2026 Sunna Blog</span>
        <span>Built with React, Vite and IconPark.</span>
      </footer>
    </main>
  )
}

export default App
