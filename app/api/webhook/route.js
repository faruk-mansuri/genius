import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import prisma from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';

export const POST = async (req) => {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object;

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    if (!session?.metadata?.userId) {
      return new NextResponse('UserId is required', { status: 400 });
    }

    await prisma.userSubscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    const userSubscription = await prisma.userSubscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (userSubscription) {
      await prisma.userSubscription.update({
        where: { stripeSubscriptionId: subscription.id },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    }
  }

  return new NextResponse(null, { status: 200 });
};
