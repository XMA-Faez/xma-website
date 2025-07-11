import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/contentful'

export const revalidate = 3600
import { BlogGrid } from '@/components/blog/BlogGrid'
import { BlogFilters } from '@/components/blog/BlogFilters'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { Pagination } from '@/components/blog/Pagination'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | XMA - Digital Marketing Insights',
  description: 'Stay updated with the latest digital marketing insights, strategies, and industry trends from XMA experts.',
  openGraph: {
    title: 'Blog | XMA - Digital Marketing Insights',
    description: 'Stay updated with the latest digital marketing insights, strategies, and industry trends from XMA experts.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | XMA - Digital Marketing Insights',
    description: 'Stay updated with the latest digital marketing insights, strategies, and industry trends from XMA experts.',
  },
}

interface BlogPageProps {
  searchParams: {
    page?: string
    search?: string
    category?: string
    tag?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = parseInt(searchParams.page || '1')
  const postsPerPage = 20
  const skip = (currentPage - 1) * postsPerPage

  const [blogData, categories, tags] = await Promise.all([
    getAllBlogPosts(postsPerPage, skip, searchParams.search, searchParams.category, searchParams.tag),
    getAllCategories(),
    getAllTags(),
  ])

  const totalPages = Math.ceil(blogData.total / postsPerPage)

  return (
    <div className="container pt-40 mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-relaxed bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">Blog</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover the latest insights, strategies, and trends in digital marketing
          </p>
        </div>

        <div className="mb-8">
          <BlogSearch initialValue={searchParams.search} />
        </div>

        <div className="mb-8">
          <BlogFilters
            categories={categories}
            tags={tags}
            selectedCategory={searchParams.category}
            selectedTag={searchParams.tag}
          />
        </div>

        <BlogGrid posts={blogData.posts} />

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              baseUrl="/blog"
              searchParams={searchParams}
            />
          </div>
        )}

        {blogData.posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
