import { stripe } from '@/utils/stripe-server';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lineItems } = body;
    const headersList = await headers();
    const origin = headersList.get('origin') || 'http://localhost:3000';

    if (!lineItems?.length) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        items: JSON.stringify(lineItems.map(item => item.price))
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      customer_email: undefined, 
      locale: 'en', 
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
