"use client";

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { marked } from 'marked';
import { cn } from '@/lib/utils';

interface RichTextProps {
  content: BlocksContent | string | { content?: BlocksContent; body?: string | BlocksContent } | null | undefined;
  className?: string;
}

const DEFAULT_WRAPPER_CLASSES =
  "space-y-4 [&_p]:text-gray-800 [&_p]:leading-relaxed [&_p]:mb-4 " +
  "[&_h1]:text-3xl [&_h1]:font-light [&_h1]:text-gray-800 [&_h1]:mt-8 [&_h1]:mb-6 " +
  "[&_h2]:text-2xl [&_h2]:font-light [&_h2]:text-gray-800 [&_h2]:mt-6 [&_h2]:mb-4 " +
  "[&_h3]:text-xl [&_h3]:font-light [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-3 " +
  "[&_h4]:text-lg [&_h4]:font-light [&_h4]:text-gray-800 [&_h4]:mt-4 [&_h4]:mb-2 " +
  "[&_h5]:text-base [&_h5]:font-light [&_h5]:text-gray-800 [&_h5]:mt-3 [&_h5]:mb-2 " +
  "[&_h6]:text-sm [&_h6]:font-light [&_h6]:text-gray-800 [&_h6]:mt-3 [&_h6]:mb-2 " +
  "[&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 " +
  "[&_li]:mb-1 [&_strong]:font-bold [&_em]:italic [&_u]:underline " +
  "[&_a]:text-gray-800 [&_a:hover]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_hr]:my-6";

const headingClassMap: Record<number, string> = {
  1: 'text-3xl font-light mb-6 mt-8 text-gray-800',
  2: 'text-2xl font-light mb-4 mt-6 text-gray-800',
  3: 'text-xl font-light mb-3 mt-5 text-gray-800',
  4: 'text-lg font-light mb-2 mt-4 text-gray-800',
  5: 'text-base font-light mb-2 mt-3 text-gray-800',
  6: 'text-sm font-light mb-2 mt-3 text-gray-800',
};

marked.setOptions({
  breaks: true,
  gfm: true, // GitHub Flavored Markdown
});

function normalizeToBlocksContent(
  content: BlocksContent | string | { content?: BlocksContent; body?: string | BlocksContent } | null | undefined
): BlocksContent | string | null {
  if (!content) {
    return null;
  }

  if (Array.isArray(content)) {
    return content;
  }

  if (typeof content === 'object' && content !== null) {
    // Check for 'content' property first (standard BlocksContent)
    if ('content' in content) {
      const contentValue = (content as { content?: BlocksContent }).content;
      if (Array.isArray(contentValue)) {
        return contentValue;
      }
    }
    
    // Check for 'body' property (common in Strapi policy sections)
    if ('body' in content) {
      const bodyValue = (content as { body?: string | BlocksContent }).body;
      if (Array.isArray(bodyValue)) {
        return bodyValue; // It's BlocksContent
      }
      if (typeof bodyValue === 'string') {
        return bodyValue; // It's a plain string, return as-is for markdown parsing
      }
    }
  }

  if (typeof content === 'string') {
    const trimmed = content.trim();
    if (!trimmed) {
      return null;
    }

    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      if (parsed && typeof parsed === 'object' && parsed !== null && 'content' in parsed) {
        const parsedContent = (parsed as { content?: BlocksContent }).content;
        if (Array.isArray(parsedContent)) {
          return parsedContent;
        }
      }
    } catch {
      return trimmed;
    }
  }

  return null;
}

export default function RichText({ content, className }: RichTextProps) {
  const normalized = normalizeToBlocksContent(content);

  if (!normalized) {
    
    // Fallback: try to display as plain text if it's a string or has a string property
    if (typeof content === 'string' && content.trim()) {
      const html = marked.parse(content.trim(), { breaks: true, gfm: true });
      return (
        <div className={cn(DEFAULT_WRAPPER_CLASSES, className)} dangerouslySetInnerHTML={{ __html: html }} />
      );
    }
    
    // If it's an object, try to extract any text
    if (typeof content === 'object' && content !== null) {
      const textFields = ['body', 'text', 'content', 'html', 'value', 'description'];
      const contentObj = content as Record<string, unknown>;
      for (const field of textFields) {
        if (field in contentObj && typeof contentObj[field] === 'string' && (contentObj[field] as string).trim()) {
          const html = marked.parse((contentObj[field] as string).trim(), { breaks: true, gfm: true });
          return (
            <div className={cn(DEFAULT_WRAPPER_CLASSES, className)} dangerouslySetInnerHTML={{ __html: html }} />
          );
        }
      }
    }
    
    return null;
  }

  if (typeof normalized === 'string') {
    const trimmed = normalized.trim();
    if (!trimmed) {
      return null;
    }
    
    const wrapperClass = cn(DEFAULT_WRAPPER_CLASSES, className);

    // If it's already HTML, clean it up first
    if (/</.test(trimmed) && />/.test(trimmed)) {
      // Clean up broken HTML tags (like /li>)
      const cleaned = trimmed.replace(/\/li>/g, '').replace(/<li>/g, '').replace(/<\/li>/g, '');
      return (
        <div
          className={wrapperClass}
          dangerouslySetInnerHTML={{ __html: cleaned }}
        />
      );
    }

    // Pre-process: Convert semicolon-separated lists to markdown lists
    // Pattern: "Item 1; Item 2; Item 3" -> "- Item 1\n- Item 2\n- Item 3"
    let processedText = trimmed;
    
    // Detect lines that look like lists (multiple items separated by semicolons)
    processedText = processedText.split('\n').map(line => {
      const trimmedLine = line.trim();
      // Check if line has multiple semicolons (likely a list)
      if (trimmedLine.includes(';') && trimmedLine.split(';').length > 2) {
        // Convert semicolon-separated items to markdown list
        const items = trimmedLine
          .split(';')
          .map(item => item.trim())
          .filter(item => item.length > 0 && !item.match(/^[;\s]*$/));
        
        if (items.length > 1) {
          return items.map(item => `- ${item}`).join('\n');
        }
      }
      return line;
    }).join('\n');

    // Parse as markdown (handles newlines, bold, italic, lists, etc.)
    // marked with breaks: true will convert \n to <br>
    // Convert double newlines to paragraphs for better formatting
    processedText = processedText
      .split(/\n{2,}/) // Split on double or more newlines
      .map(para => para.trim())
      .filter(para => para.length > 0)
      .map(para => {
        // If paragraph starts with "- ", it's already a list, keep newlines
        if (para.startsWith('- ')) {
          return para;
        }
        // Otherwise replace single newlines with spaces within paragraphs
        return para.replace(/\n/g, ' ');
      })
      .join('\n\n'); // Join paragraphs with double newlines for markdown
    
    const html = marked.parse(processedText, { breaks: true, gfm: true });

    return (
      <div className={wrapperClass} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

  if (!Array.isArray(normalized) || normalized.length === 0) {
    return null;
  }

  const isValidBlocksContent = normalized.every((block) => 
    block && typeof block === 'object' && block !== null && 'type' in block
  );

  if (!isValidBlocksContent) {
    
    // Try to extract text from the normalized content
    const textContent = Array.isArray(normalized) 
      ? normalized.map((item: unknown) => {
          if (typeof item === 'string') return item;
          if (item && typeof item === 'object') {
            const obj = item as Record<string, unknown>;
            if ('text' in obj && typeof obj.text === 'string') return obj.text;
            if ('body' in obj && typeof obj.body === 'string') return obj.body;
            if ('content' in obj && typeof obj.content === 'string') return obj.content;
          }
          return JSON.stringify(item);
        }).join(' ')
      : String(normalized);
    
    if (textContent.trim()) {
      const html = marked.parse(textContent, { breaks: true, gfm: true });
      return (
        <div className={cn(DEFAULT_WRAPPER_CLASSES, className)} dangerouslySetInnerHTML={{ __html: html }} />
      );
    }
    
    return null;
  }

  return (
    <div className={cn(DEFAULT_WRAPPER_CLASSES, className)}>
      <BlocksRenderer
        content={normalized}
        blocks={{
          paragraph: ({ children }) => <p className="mb-4 text-gray-800 leading-relaxed">{children}</p>,
          heading: ({ children, level }) => {
            if (!level) {
              level = 2;
            }
            const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
            const headingClassName =
              headingClassMap[level as keyof typeof headingClassMap] ||
              headingClassMap[2];
            switch (HeadingTag) {
              case 'h1': return <h1 className={headingClassName}>{children}</h1>;
              case 'h2': return <h2 className={headingClassName}>{children}</h2>;
              case 'h3': return <h3 className={headingClassName}>{children}</h3>;
              case 'h4': return <h4 className={headingClassName}>{children}</h4>;
              case 'h5': return <h5 className={headingClassName}>{children}</h5>;
              case 'h6': return <h6 className={headingClassName}>{children}</h6>;
              default: return <h2 className={headingClassName}>{children}</h2>;
            }
          },
          list: ({ children, format }) => {
            if (format === 'unordered') {
              return <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>;
            }
            return <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>;
          },
          'list-item': ({ children }) => <li className="mb-1">{children}</li>,
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
          ),
          link: ({ children, url }) => (
            <a href={url} className="text-gray-800 hover:underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          image: ({ image }) => {
            const imageUrl = image?.url || '';
            const alt = image?.alternativeText || '';
            if (!imageUrl) return null;
            return (
              <figure className="my-6">
                <img 
                  src={imageUrl.startsWith('http') ? imageUrl : (process.env.NEXT_PUBLIC_STRAPI_URL ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}` : imageUrl)}
                  alt={alt}
                  className="w-full rounded"
                />
              </figure>
            );
          },
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-bold">{children}</strong>,
          italic: ({ children }) => <em className="italic">{children}</em>,
          underline: ({ children }) => <u className="underline">{children}</u>,
          strikethrough: ({ children }) => <del className="line-through">{children}</del>,
          code: ({ children }) => (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>
          ),
        }}
      />
    </div>
  );
}

