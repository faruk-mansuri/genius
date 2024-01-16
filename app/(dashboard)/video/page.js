'use client';

import Heading from '@/components/Heading';
import { VideoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { formSchema } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';

const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    setVideo(null);
    try {
      const response = await axios.post('/api/video', values);
      setVideo(response.data[0]);
      form.reset();
    } catch (error) {
      // TODO open pro model
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Something went wrong');
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title='Video Generation'
        description='Turn your prompt into video.'
        icon={VideoIcon}
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'
      />

      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
            >
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0  outline-none focus-visible:ring-0 focus-visible:ring-transparent tracking-wide'
                        disabled={isLoading}
                        placeholder='A Woman Sitting on Edge of a Cliff'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className='col-span-12 lg:col-span-2'
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className='p-8 rounded-lg flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}

          {!video && !isLoading && <Empty label='No Video generated' />}

          {video && (
            <video
              controls
              className='w-full md:w-[70%] md:mx-auto max-h-80 aspect-video mt-8 border bg-black'
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
