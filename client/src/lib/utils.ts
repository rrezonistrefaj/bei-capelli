import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import sanitizeHtml from "sanitize-html"

export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs))
}

export default cn

export function parseRichText(blocks: any): string {
  if (!blocks) return ''


  if (typeof blocks === 'string') {
    return parseMarkdown(blocks)
  }


  if (!Array.isArray(blocks)) {
    return ''
  }

  const html = blocks
    .map((block: any) => {
      if (block.type === 'paragraph' && Array.isArray(block.children)) {
        const rawText = block.children.map((ch: any) => String(ch.text || '')).join('')
        // If paragraph actually starts with markdown heading, delegate to markdown parser
        if (/^#{1,6}\s+/.test(rawText.trim())) {
          return parseMarkdown(rawText)
        }

        return (
          '<p>' +
          block.children
            .map((ch: any) => {
              const text = String(ch.text || '')
              if (ch.bold) return `<strong>${text}</strong>`
              if (ch.italic) return `<em>${text}</em>`
              if (ch.type === 'link') {
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
            .map((ch: any) => {
              const text = String(ch.text || '')
              if (ch.type === 'link') {
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
            .map((item: any) => `<li>${parseRichText(item.children)}</li>`)
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

  // Headings (#, ##, ###, ####, ##### , ######)
  html = html.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>')
  html = html.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>')
  html = html.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>')
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')

  // Bold, italic, inline code
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')

  // Paragraphs: split on blank lines, keep headings as-is
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

