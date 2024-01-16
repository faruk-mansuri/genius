import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useProModal } from '@/hooks/use-pro-modal';
import { Badge } from './ui/badge';

import {
  Check,
  Code,
  Image,
  MessageSquare,
  Music,
  Video,
  Zap,
} from 'lucide-react';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: Image,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
  {
    label: 'Video Generation',
    icon: Video,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
  },
];

const ProModal = () => {
  const proModal = useProModal();
  const [isLoading, setIsLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Something went wrong');
      console.log('STRIPE_CLIENT_ERROR', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isModalOpen} onOpenChange={proModal.onClose}>
      {/* <DialogTrigger className='text-red-500'>Open</DialogTrigger> */}

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 font-bold py-1'>
              Upgrade to Genius
              <Badge variant='premium' className='uppercase text-sm py-1'>
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 text-zinc-900 font-medium space-y-2'>
            {tools.map((tool) => {
              return (
                <Card
                  key={tool.label}
                  className=' p-3 border-black/5 flex items-center justify-between gap-x-4'
                >
                  <div className='flex items-center gap-x-8'>
                    <div className={cn('p-2 rounded-md', tool.bgColor)}>
                      <tool.icon className={cn('w-6 h-6', tool.color)} />
                    </div>
                    <div className='font-semibold text-sm'>{tool.label}</div>
                  </div>

                  <Check className='text-primary w-5 h-5' />
                </Card>
              );
            })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            disabled={isLoading}
            size='lg'
            variant='premium'
            className='w-full'
            onClick={onSubscribe}
          >
            Upgrade <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
