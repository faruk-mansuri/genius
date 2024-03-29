import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import OpenAI from 'openai';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation.',
};

export const POST = async (req) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    if (!openai.apiKey)
      return new NextResponse('OpenAI API key not configured', { status: 401 });

    if (!messages)
      return new NextResponse('Messages are required', { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    // if (!freeTrial && !isPro) {
    //   return new NextResponse('Free trail has expired.', { status: 403 });
    // }
    if (!freeTrial) {
      return new NextResponse('Free trail has expired.', { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [instructionMessage, ...messages],
    });

    // if (!isPro) {
    //   await increaseApiLimit();
    // }
    await increaseApiLimit();

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log('[CODE ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
