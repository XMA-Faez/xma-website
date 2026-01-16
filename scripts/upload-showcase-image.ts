import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-01-07',
  useCdn: false,
})

async function uploadImageAndUpdateDocument(imagePath: string, documentId: string) {
  console.log(`Uploading image: ${imagePath}`)

  const imageAsset = await client.assets.upload('image', createReadStream(imagePath), {
    filename: path.basename(imagePath),
  })

  console.log(`Image uploaded with ID: ${imageAsset._id}`)

  const result = await client
    .patch(documentId)
    .set({
      thumbnail: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
    })
    .commit()

  console.log(`Document updated: ${result._id}`)
  return result
}

const imagePath = process.argv[2]
const documentId = process.argv[3] || '1f4b8ae1-0415-485e-8b58-8fe0f814bdca'

if (!imagePath) {
  console.error('Usage: bun scripts/upload-showcase-image.ts <image-path> [document-id]')
  console.error('Example: bun scripts/upload-showcase-image.ts ./dream-drives.png')
  process.exit(1)
}

uploadImageAndUpdateDocument(imagePath, documentId)
  .then(() => console.log('Done!'))
  .catch((err) => {
    console.error('Error:', err.message)
    process.exit(1)
  })
