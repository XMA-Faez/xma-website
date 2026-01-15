import { getFeaturedShowcaseWebsites } from '@/sanity/lib/showcase'
import Section from '@/components/ui/section'
import WebsitesShowcaseClient from './WebsitesShowcaseClient'

const WebsitesShowcaseSection = async () => {
  const websites = await getFeaturedShowcaseWebsites(4)

  if (websites.length === 0) return null

  return (
    <Section size="xl" padding="md" id="websites-showcase">
      <WebsitesShowcaseClient websites={websites} />
    </Section>
  )
}

export default WebsitesShowcaseSection
