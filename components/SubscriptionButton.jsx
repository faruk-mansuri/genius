'use client';

import { Zap } from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const SubscriptionButton = ({ isPro }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Something went wrong');
      console.log('BILLING_ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      variant={isPro ? 'default' : 'premium'}
      onClick={onClick}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className='h-4 w-4 ml-2 fill-white' />}
    </Button>
  );
};

export default SubscriptionButton;
