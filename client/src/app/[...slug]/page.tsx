import PageRenderer from '@/components/sections/PageRenderer';
import Footer from '@/components/footer';
import { getPageBySlug, getFooterData } from '@/lib/api';
import type { Metadata, ResolvingMetadata } from 'next';

type Params = { slug?: string[] };

export default async function Page({ params }: { params: Params }) {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : '';
  const [page, footerData] = await Promise.all([
    getPageBySlug(slug || 'test-page'),
    getFooterData()
  ]);
  
  if (!page) {
    return (
      <div className="min-h-screen bg-[#E0D7C9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Page Not Found</h1>
          <p className="text-lg text-black">The page &quot;{slug}&quot; could not be found.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#E0D7C9]">
      <main className="pt-24">
        <PageRenderer sections={page.sections || []} />
      </main>
      <Footer data={footerData} />
    </div>
  );
}

export async function generateStaticParams() {

  return [{ slug: ['test-page'] }];
}

export const revalidate = 60;

// Best-practice metadata for slug pages
export async function generateMetadata(
  { params }: { params: Params },
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : ''
  const page = await getPageBySlug(slug || 'test-page')

  const title = page?.seo?.metaTitle || page?.title || 'Bei Capelli'
  const description = page?.seo?.metaDescription || 'Beauty and hair services at Bei Capelli.'
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  const shareImage = page?.seo?.shareImage?.url
    ? (page.seo.shareImage.url.startsWith('http') ? page.seo.shareImage.url : `${base}${page.seo.shareImage.url}`)
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/${slug}`.replace(/\/+/, '/'),
      images: shareImage ? [{ url: shareImage }] : undefined
    },
    twitter: {
      card: shareImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: shareImage ? [shareImage] : undefined
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/${slug}`.replace(/\/+/, '/')
    }
  }
}


