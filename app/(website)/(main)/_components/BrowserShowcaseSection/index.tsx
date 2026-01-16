import { getFeaturedShowcaseWebsites } from '@/sanity/lib/showcase'
import Section from '@/components/ui/section'
import BrowserShowcaseClient from './BrowserShowcaseClient'

const BrowserShowcaseSection = async () => {
  const websites = await getFeaturedShowcaseWebsites(4)

  if (websites.length === 0) return null

  return (
    <Section size="xl" padding="md" id="browser-showcase">
      <BrowserShowcaseClient websites={websites} />
    </Section>
  )
}

export default BrowserShowcaseSection
