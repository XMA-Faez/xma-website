import { unstable_cache } from 'next/cache'
import { getFeaturedShowcaseWebsites } from '@/sanity/lib/showcase'
import Section from '@/components/ui/section'
import BrowserShowcaseClient from './BrowserShowcaseClient'

const getCachedShowcaseWebsites = unstable_cache(
  async () => getFeaturedShowcaseWebsites(4),
  ['showcase-websites'],
  { revalidate: 3600 }
)

const BrowserShowcaseSection = async () => {
  const websites = await getCachedShowcaseWebsites()

  if (websites.length === 0) return null

  return (
    <Section size="xl" padding="md" id="browser-showcase">
      <BrowserShowcaseClient websites={websites} />
    </Section>
  )
}

export default BrowserShowcaseSection
