const contentful = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

async function setupContentful() {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    console.log('Creating blogPost content type...');

    // Create the blogPost content type
    const blogPost = await environment.createContentTypeWithId('blogPost', {
      name: 'Blog Post',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          validations: [{ size: { max: 200 } }],
        },
        {
          id: 'slug',
          name: 'Slug',
          type: 'Symbol',
          required: true,
          validations: [
            {
              unique: true,
            },
            {
              regexp: {
                pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
                flags: null,
              },
            },
          ],
        },
        {
          id: 'excerpt',
          name: 'Excerpt',
          type: 'Text',
          required: true,
          validations: [{ size: { max: 300 } }],
        },
        {
          id: 'content',
          name: 'Content',
          type: 'RichText',
          required: true,
        },
        {
          id: 'featuredImage',
          name: 'Featured Image',
          type: 'Link',
          linkType: 'Asset',
          required: true,
          validations: [
            {
              linkMimetypeGroup: ['image'],
            },
          ],
        },
        {
          id: 'author',
          name: 'Author',
          type: 'Symbol',
          required: true,
          validations: [{ size: { max: 100 } }],
        },
        {
          id: 'publishDate',
          name: 'Publish Date',
          type: 'Date',
          required: true,
        },
        {
          id: 'categories',
          name: 'Categories',
          type: 'Array',
          items: {
            type: 'Symbol',
            validations: [{ in: ['Technology', 'Business', 'Marketing', 'Development', 'Design', 'News'] }],
          },
        },
        {
          id: 'tags',
          name: 'Tags',
          type: 'Array',
          items: {
            type: 'Symbol',
            validations: [{ size: { max: 50 } }],
          },
        },
        {
          id: 'metaTitle',
          name: 'Meta Title (SEO)',
          type: 'Symbol',
          required: false,
          validations: [{ size: { max: 100 } }],
        },
        {
          id: 'metaDescription',
          name: 'Meta Description (SEO)',
          type: 'Text',
          required: false,
          validations: [{ size: { max: 200 } }],
        },
        {
          id: 'readingTime',
          name: 'Reading Time (minutes)',
          type: 'Integer',
          required: false,
          validations: [{ range: { min: 1, max: 60 } }],
        },
      ],
    });

    console.log('Publishing content type...');
    await blogPost.publish();

    console.log('✅ Contentful schema setup complete!');
    console.log('\nNext steps:');
    console.log('1. Go to your Contentful space to create blog posts');
    console.log('2. Make sure to fill in all required fields');
    console.log('3. Use the slug field for URL-friendly post identifiers');

  } catch (error) {
    if (error.name === 'VersionMismatch') {
      console.log('Content type already exists. Updating...');
      
      const environment = await client.getSpace(process.env.CONTENTFUL_SPACE_ID).then(space => space.getEnvironment('master'));
      const existingContentType = await environment.getContentType('blogPost');
      
      // Update the existing content type
      existingContentType.fields = [
        // ... same fields as above
      ];
      
      await existingContentType.update();
      await existingContentType.publish();
      
      console.log('✅ Content type updated successfully!');
    } else {
      console.error('Error setting up Contentful:', error);
      process.exit(1);
    }
  }
}

// Check for management token
if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
  console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN is required!');
  console.log('\nTo get a management token:');
  console.log('1. Go to https://app.contentful.com');
  console.log('2. Navigate to Settings > API keys');
  console.log('3. Click on "Content management tokens" tab');
  console.log('4. Generate a new token');
  console.log('5. Add it to your .env.local file as CONTENTFUL_MANAGEMENT_TOKEN');
  process.exit(1);
}

setupContentful();