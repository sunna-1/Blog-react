import {
  SketchPeony,
  SketchCat,
  SketchTeacup,
  SketchPlant,
  SketchWindow,
  SketchBooks,
} from './sketch/SketchLife'

const decorMap = {
  home: [
    { Comp: SketchPeony, className: 'bg-peony', pos: 'top-right' },
    { Comp: SketchCat, className: 'bg-cat', pos: 'mid-left' },
    { Comp: SketchTeacup, className: 'bg-tea', pos: 'bottom-right' },
  ],
  articles: [
    { Comp: SketchBooks, className: 'bg-books', pos: 'top-right' },
    { Comp: SketchPlant, className: 'bg-plant', pos: 'bottom-left' },
  ],
  daily: [
    { Comp: SketchWindow, className: 'bg-window', pos: 'top-left' },
    { Comp: SketchCat, className: 'bg-cat-sm', pos: 'bottom-right' },
  ],
  tools: [
    { Comp: SketchTeacup, className: 'bg-tea', pos: 'top-left' },
    { Comp: SketchPeony, className: 'bg-peony-sm', pos: 'bottom-right' },
  ],
  default: [{ Comp: SketchPlant, className: 'bg-plant-sm', pos: 'bottom-right' }],
}

function resolveScene(pathname) {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/articles')) return 'articles'
  if (pathname.startsWith('/daily')) return 'daily'
  if (pathname.startsWith('/tools')) return 'tools'
  return 'default'
}

export default function SketchBackground({ pathname }) {
  const scene = resolveScene(pathname)
  const items = decorMap[scene] ?? decorMap.default

  return (
    <div className="sketch-bg" aria-hidden="true">
      {items.map(({ Comp, className, pos }) => (
        <div key={className} className={`sketch-bg-item ${className} is-${pos}`}>
          <Comp animate={false} />
        </div>
      ))}
    </div>
  )
}
