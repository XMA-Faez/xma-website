const stripe = require("stripe")("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");

async function createAddOns() {
  // Add-ons configuration
  const addOns = [
    {
      name: 'Website Design',
      description: 'Custom website design tailored to your brand',
      price: 8000,
      lookup_key: 'website_design',
      tax_code: 'txcd_10000000', // General - Non-physical goods
      metadata: {
        type: 'addon',
        category: 'web'
      }
    },
    {
      name: 'Website Redesign',
      description: 'Refresh and update your existing website',
      price: 4000,
      lookup_key: 'website_redesign',
      tax_code: 'txcd_10000000', // General - Non-physical goods
      metadata: {
        type: 'addon',
        category: 'web'
      }
    },
    {
      name: 'Logo Design',
      description: 'Professional logo design with multiple concepts',
      price: 2000,
      lookup_key: 'logo_design',
      tax_code: 'txcd_10000000', // General - Non-physical goods
      metadata: {
        type: 'addon',
        category: 'design'
      }
    },
    {
      name: 'Business Email',
      description: 'Professional email setup with your domain',
      price: 500,
      lookup_key: 'business_email',
      tax_code: 'txcd_20030000', // Software as a service (SaaS)
      metadata: {
        type: 'addon',
        category: 'email'
      }
    },
    {
      name: 'Hosting',
      description: 'Reliable web hosting for your website',
      price: 500,
      lookup_key: 'hosting',
      tax_code: 'txcd_20030000', // Software as a service (SaaS)
      metadata: {
        type: 'addon',
        category: 'hosting'
      }
    },
    {
      name: 'Domain',
      description: 'Domain registration for one year',
      price: 200,
      lookup_key: 'domain',
      tax_code: 'txcd_20030000', // Software as a service (SaaS)
      metadata: {
        type: 'addon',
        category: 'domain'
      }
    },
    {
      name: 'Payment Gateway Integration',
      description: 'Secure payment processing setup',
      price: 500,
      lookup_key: 'payment_gateway',
      tax_code: 'txcd_20030000', // Software as a service (SaaS)
      metadata: {
        type: 'addon',
        category: 'payment'
      }
    }
  ];

  console.log('Starting to create add-ons in Stripe...');

  for (const addOn of addOns) {
    try {
      // Create the product
      const product = await stripe.products.create({
        name: addOn.name,
        description: addOn.description,
        metadata: addOn.metadata,
        tax_code: addOn.tax_code,
      });

      console.log(`Created product: ${addOn.name}`);

      // Create the price for the product
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: addOn.price * 100, // Convert to cents
        currency: 'aed',
        lookup_key: addOn.lookup_key,
        tax_behavior: 'exclusive', // Tax will be calculated based on tax rules
        metadata: {
          tax_category: addOn.tax_code
        }
      });

      console.log(`Created price for ${addOn.name}`);
      console.log(`Product ID: ${product.id}`);
      console.log(`Price ID: ${price.id}`);
      console.log(`Lookup Key: ${addOn.lookup_key}`);
      console.log(`Tax Code: ${addOn.tax_code}`);
      console.log('------------------------');

    } catch (error) {
      console.error(`Error creating ${addOn.name}:`, error);
    }
  }

  console.log('Finished creating add-ons in Stripe!');
}

// Run the function
createAddOns()
  .then(() => console.log('Complete!'))
  .catch((error) => console.error('Error:', error));
