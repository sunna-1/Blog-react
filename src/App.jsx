import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Daily from './pages/Daily'
import Tools from './pages/Tools'
import MarkdownPreview from './tools/MarkdownPreview'
import ComplexityAnalyzer from './tools/ComplexityAnalyzer'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<ArticleDetail />} />
        <Route path="daily" element={<Daily />} />
        <Route path="tools" element={<Tools />} />
        <Route path="tools/markdown" element={<MarkdownPreview />} />
        <Route path="tools/complexity" element={<ComplexityAnalyzer />} />
      </Route>
    </Routes>
  )
}
