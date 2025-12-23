declare module 'sanitize-html' {
  export interface SanitizeHtmlOptions {
    allowedTags?: string[]
    allowedAttributes?: Record<string, string[]>
    allowedSchemes?: string[]
    allowProtocolRelative?: boolean
  }

  export interface SanitizeHtmlDefaults {
    allowedTags: string[]
    allowedAttributes: Record<string, string[]>
  }

  export interface SanitizeHtmlFn {
    (dirty: string, options?: SanitizeHtmlOptions): string
    defaults: SanitizeHtmlDefaults
  }

  const sanitizeHtml: SanitizeHtmlFn
  export default sanitizeHtml
}


