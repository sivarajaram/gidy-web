import { useEffect } from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonical?: string
}

export function SEOHead({
  title = 'GIDY Technologies - Internships & Technology Solutions',
  description = 'GIDY Technologies offers practical internship programs and cutting-edge technology solutions. Gain real industry experience and transform your career.',
  keywords = 'internship, technology, software development, AI, ML, DevOps, web development, GIDY Technologies',
  ogImage = '/og-image.jpg',
  canonical,
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('keywords', keywords)
    setOgMeta('og:title', title)
    setOgMeta('og:description', description)
    setOgMeta('og:image', ogImage)
    setOgMeta('og:type', 'website')
    setOgMeta('twitter:card', 'summary_large_image')
    setOgMeta('twitter:title', title)
    setOgMeta('twitter:description', description)
    setOgMeta('twitter:image', ogImage)
    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canonical
    }
  }, [title, description, keywords, ogImage, canonical])

  return null
}

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

function setOgMeta(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.content = content
}
