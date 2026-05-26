/** 仅用于文章页尾与 favicon 同源的品牌图 */
export function BrandLogo({ className = '' }) {
  return (
    <img
      src="/img/logo.svg"
      alt="Sunna 的日记本"
      className={`brand-logo-img${className ? ` ${className}` : ''}`}
      loading="lazy"
      decoding="async"
    />
  )
}
