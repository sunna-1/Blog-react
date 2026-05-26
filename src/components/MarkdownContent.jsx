import { useMemo } from 'react'
import { marked } from 'marked'

marked.setOptions({
  gfm: true,
  breaks: true,
})

export default function MarkdownContent({ source, className = 'md-prose' }) {
  const html = useMemo(() => {
    if (!source?.trim()) return ''
    return marked.parse(source)
  }, [source])

  if (!html) {
    return <p className="md-empty">暂无内容</p>
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
