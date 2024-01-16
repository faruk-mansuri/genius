import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';

const settingUrl = absoluteUrl('/settings');

export const GET = async (req) => {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!user || !userId)
      return new NextResponse('Unauthorized', { status: 401 });

    const userSubscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSessions = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: {
              name: 'Genius Pro',
              description: 'Unlimited AI Generation',
            },
            unit_amount: 200000,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSessions.url }));
  } catch (error) {
    console.log('[STRIPE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
