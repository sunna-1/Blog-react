import { quotes } from '../data/content'
import { ScrollReveal } from './ScrollReveal'

const quoteIllustrations = [
  '/img/526-1.svg',
  '/img/526-2.svg',
  '/img/526-3.svg',
  '/img/526-4.svg',
]

const stickerTilts = ['-2.5deg', '1.8deg', '-1.2deg', '2deg']

export default function QuoteCards() {
  return (
    <div className="quotes-stack">
      {quotes.map((quote, index) => (
        <ScrollReveal key={quote.author + quote.text} delay={index * 0.06}>
          <figure className="quote-card-sketch">
            <div className="quote-card-inner">
              <div
                className="quote-card-sticker"
                style={{ '--sticker-tilt': stickerTilts[index] }}
              >
                <img
                  src={quoteIllustrations[index]}
                  alt=""
                  className="quote-card-illus"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="quote-card-body">
                <blockquote>「{quote.text}」</blockquote>
                <figcaption>
                  <cite>{quote.author}</cite>
                  <span className="quote-cn">{quote.cn}</span>
                </figcaption>
              </div>
            </div>
          </figure>
        </ScrollReveal>
      ))}
    </div>
  )
}
