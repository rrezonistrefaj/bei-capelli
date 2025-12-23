import sanitizeHtml from "sanitize-html"
import type { RichTextBlock, RichTextChild } from "@/types/strapi"

// Server-side only version of parseRichText that uses sanitize-html
// This prevents sanitize-html from being bundled in client components
export function parseRichTextServer(blocks: RichTextBlock[] | string | null | undefined): string {
  if (!blocks) return ''

  if (typeof blocks === 'string') {
    return parseMarkdown(blocks)
  }

  if (!Array.isArray(blocks)) {
    return ''
  }

  const html = blocks
    .map((block: RichTextBlock) => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        const rawText = block.children
          .filter((ch): ch is RichTextChild => ch && typeof ch === 'object' && 'text' in ch)
          .map((ch: RichTextChild) => String(ch.text || ''))
          .join('')
        if (/^#{1,6}\s+/.test(rawText.trim())) {
          return parseMarkdown(rawText)
        }

        return (
          '<p>' +
          block.children
            .filter((ch): ch is RichTextChild => ch && typeof ch === 'object')
            .map((ch: RichTextChild) => {
              const text = String(ch.text || '')
              if (ch.bold) return `<strong>${text}</strong>`
              if (ch.italic) return `<em>${text}</em>`
              if (ch.type === 'link' && ch.url) {
                return `<a href="${ch.url}" target="_blank" rel="noopener noreferrer">${text}</a>`
              }
              return text
            })
            .join('') +
          '</p>'
        )
      }
      if (block.type === 'heading' && Array.isArray(block.children)) {
        const level = block.level || 1
        return (
          `<h${level}>` +
          block.children
            .filter((ch): ch is RichTextChild => ch && typeof ch === 'object')
            .map((ch: RichTextChild) => {
              const text = String(ch.text || '')
              if (ch.type === 'link' && ch.url) {
                return `<a href="${ch.url}" target="_blank" rel="noopener noreferrer">${text}</a>`
              }
              return text
            })
            .join('') +
          `</h${level}>`
        )
      }
      if (block.type === 'list' && Array.isArray(block.children)) {
        const tag = block.format === 'ordered' ? 'ol' : 'ul'
        return (
          `<${tag}>` +
          block.children
            .filter((item): item is RichTextBlock => item && typeof item === 'object' && 'children' in item)
            .map((item: RichTextBlock) => `<li>${parseRichTextServer(item.children as RichTextBlock[])}</li>`)
            .join('') +
          `</${tag}>`
        )
      }
      return ''
    })
    .join('')

  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: true
  })
}

function parseMarkdown(text: string): string {
  if (!text) return ''

  let html = text

  html = html.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>')
  html = html.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>')
  html = html.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>')
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')

  const blocks = html.split(/\n{2,}/)
  html = blocks
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (/^<h[1-6]>/.test(trimmed)) {
        return trimmed
      }
      const withLineBreaks = trimmed.replace(/\n/g, '<br>')
      return `<p>${withLineBreaks}</p>`
    })
    .join('')

  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class']
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: true
  })
}

