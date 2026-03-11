import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import path from 'path'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-01-07',
  useCdn: false,
})

interface WebsiteEntry {
  title: string
  slug: string
  externalUrl: string
  imagePath: string
}

const websites: WebsiteEntry[] = [
  {
    title: 'Timeless Touch Ceramics',
    slug: 'timeless-touch-ceramics',
    externalUrl: 'https://www.timelesstouchceramics.com/',
    imagePath: 'public/Website Images/timelesstouch.png',
  },
  {
    title: 'eBox Pro Logistics',
    slug: 'ebox-pro-logistics',
    externalUrl: 'https://www.eboxprologistics.com/',
    imagePath: 'public/Website Images/ebox.png',
  },
  {
    title: 'ConvoFlow',
    slug: 'convoflow',
    externalUrl: 'https://www.convoflow.ae/',
    imagePath: 'public/Website Images/convoflow.png',
  },
  {
    title: 'Dream Drives DXB',
    slug: 'dream-drives-dxb',
    externalUrl: 'https://www.dreamdrivesdxb.com/',
    imagePath: 'public/Website Images/dreamdrive.png',
  },
]

async function addShowcaseWebsites() {
  const existing = await client.fetch<{ externalUrl: string }[]>(
    `*[_type == "showcaseWebsite"]{ externalUrl }`
  )
  const normalizeUrl = (url: string) => url.replace(/\/+$/, '')
  const existingUrls = new Set(existing.map((d) => normalizeUrl(d.externalUrl)))

  for (const website of websites) {
    if (existingUrls.has(normalizeUrl(website.externalUrl))) {
      console.log(`Skipping "${website.title}" — already exists`)
      continue
    }

    console.log(`Uploading image for "${website.title}"...`)
    const imageBuffer = readFileSync(path.resolve(website.imagePath))
    const imageAsset = await client.assets.upload(
      'image',
      imageBuffer,
      { filename: path.basename(website.imagePath), contentType: 'image/png' }
    )
    console.log(`  Image uploaded: ${imageAsset._id}`)

    const doc = await client.create({
      _type: 'showcaseWebsite',
      title: website.title,
      slug: { _type: 'slug', current: website.slug },
      externalUrl: website.externalUrl,
      featured: true,
      thumbnail: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      },
    })

    console.log(`  Created document: ${doc._id} — "${website.title}"`)
  }

  console.log('\nAll done! Verify in Sanity Studio.')
}

addShowcaseWebsites().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
