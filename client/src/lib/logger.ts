
type LogLevel = 'info' | 'error' | 'warn' | 'debug'

interface LogContext {
  section?: string
  endpoint?: string
  status?: number
  data?: any
  error?: any
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private shouldLog(): boolean {
    return this.isDevelopment
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0]
    const prefix = context?.section ? `[${context.section}]` : '[Strapi API]'
    const levelEmoji = {
      info: 'ℹ️',
      error: '❌',
      warn: '⚠️',
      debug: '🔍'
    }[level]

    return `${levelEmoji} ${timestamp} ${prefix} ${message}`
  }

  info(message: string, context?: LogContext): void {
    if (!this.shouldLog()) return

    if (context?.data) {
      return
    } else {
      return
    }
  }

  error(message: string, error?: any): void {
    if (!this.shouldLog()) return

    return
  }

  warn(message: string, context?: LogContext): void {
    if (!this.shouldLog()) return
    return
  }

  debug(message: string, context?: LogContext): void {
    if (!this.shouldLog()) return
    return
  }

  logApiRequest(endpoint: string): void {
    return
  }

  logApiResponse(endpoint: string, status: number, data?: any): void {
    const context = {
      endpoint,
      status,
      data: data && Object.keys(data).length > 0 ? data : undefined
    }

    return
  }

  logSectionError(section: string, error: any): void {
    return
  }
}

export const logger = new Logger()
