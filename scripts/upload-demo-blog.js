const contentful = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

async function uploadDemoBlog() {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    console.log('Uploading demo image asset...');
    
    // First, create an asset for the featured image
    const asset = await environment.createAsset({
      fields: {
        title: {
          'en-US': 'Demo Blog Featured Image'
        },
        description: {
          'en-US': 'A placeholder image for the demo blog post'
        },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
            fileName: 'demo-blog-image.jpg',
            upload: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop'
          }
        }
      }
    });

    // Process the asset
    await asset.processForAllLocales();
    console.log('Processing asset...');
    
    // Wait for processing to complete
    let processedAsset;
    let attempts = 0;
    while (attempts < 10) {
      await new Promise(resolve => setTimeout(resolve, 3000));
      processedAsset = await environment.getAsset(asset.sys.id);
      if (processedAsset.fields.file['en-US'].url) {
        break;
      }
      attempts++;
    }

    // Publish the asset
    await processedAsset.publish();
    console.log('✅ Asset uploaded and published');

    console.log('Creating demo blog post...');

    // Create the blog post entry
    const blogPost = await environment.createEntry('blogPost', {
      fields: {
        title: {
          'en-US': 'Welcome to Our New Blog: A Journey into Modern Web Development'
        },
        slug: {
          'en-US': 'welcome-to-our-new-blog'
        },
        excerpt: {
          'en-US': 'Discover the latest trends in web development, from cutting-edge frameworks to best practices in user experience design. Join us as we explore the technologies shaping the future of the web.'
        },
        content: {
          'en-US': {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'heading-1',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Welcome to Our New Blog',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'We\'re excited to launch our new blog where we\'ll be sharing insights, tutorials, and thoughts on modern web development. This is just the beginning of an exciting journey!',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'heading-2',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'What to Expect',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'In the coming weeks and months, we\'ll be covering a wide range of topics including:',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'unordered-list',
                data: {},
                content: [
                  {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                      {
                        nodeType: 'paragraph',
                        data: {},
                        content: [
                          {
                            nodeType: 'text',
                            value: 'React and Next.js best practices',
                            marks: [],
                            data: {}
                          }
                        ]
                      }
                    ]
                  },
                  {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                      {
                        nodeType: 'paragraph',
                        data: {},
                        content: [
                          {
                            nodeType: 'text',
                            value: 'Modern CSS techniques and Tailwind CSS',
                            marks: [],
                            data: {}
                          }
                        ]
                      }
                    ]
                  },
                  {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                      {
                        nodeType: 'paragraph',
                        data: {},
                        content: [
                          {
                            nodeType: 'text',
                            value: 'Performance optimization strategies',
                            marks: [],
                            data: {}
                          }
                        ]
                      }
                    ]
                  },
                  {
                    nodeType: 'list-item',
                    data: {},
                    content: [
                      {
                        nodeType: 'paragraph',
                        data: {},
                        content: [
                          {
                            nodeType: 'text',
                            value: 'TypeScript tips and tricks',
                            marks: [],
                            data: {}
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                nodeType: 'heading-2',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Our Mission',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Our mission is to provide high-quality, practical content that helps developers at all levels improve their skills and build better applications. Whether you\'re just starting out or you\'re a seasoned professional, we hope you\'ll find something valuable here.',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'blockquote',
                data: {},
                content: [
                  {
                    nodeType: 'paragraph',
                    data: {},
                    content: [
                      {
                        nodeType: 'text',
                        value: 'The best way to predict the future is to invent it.',
                        marks: [],
                        data: {}
                      }
                    ]
                  }
                ]
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Stay tuned for more content, and don\'t forget to check back regularly for new posts!',
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        },
        featuredImage: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: processedAsset.sys.id
            }
          }
        },
        author: {
          'en-US': 'XMA Team'
        },
        publishDate: {
          'en-US': new Date().toISOString()
        },
        categories: {
          'en-US': ['Technology', 'Development']
        },
        tags: {
          'en-US': ['web development', 'nextjs', 'react', 'blog launch']
        },
        metaTitle: {
          'en-US': 'Welcome to Our New Blog | XMA'
        },
        metaDescription: {
          'en-US': 'Join us on our journey exploring modern web development, from React and Next.js to performance optimization and best practices.'
        },
        readingTime: {
          'en-US': 3
        }
      }
    });

    // Publish the blog post
    await blogPost.publish();
    console.log('✅ Demo blog post created and published!');
    
    console.log('\nYou can now visit your blog at /blog to see the demo post.');
    console.log(`Direct link: /blog/${blogPost.fields.slug['en-US']}`);

  } catch (error) {
    console.error('Error uploading demo blog:', error);
    if (error.details?.errors) {
      console.error('Validation errors:', JSON.stringify(error.details.errors, null, 2));
    }
    process.exit(1);
  }
}

uploadDemoBlog();