'use client';

import Heading from '@/components/Heading';
import { Download, Image } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { amountOptions, formSchema, resolutionOptions } from './constants';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import NextImage from 'next/image';
import { useProModal } from '@/hooks/use-pro-modal';
import toast from 'react-hot-toast';

const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: '', amount: '1', resolution: '512x512' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    setImages([]);
    try {
      const response = await axios.post('/api/image', values);
      const urls = response.data.map((image) => image.url);
      setImages(urls);

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
        title='Image Generation'
        description='Turn your prompt into image.'
        icon={Image}
        iconColor='text-pink-700'
        bgColor='bg-pink-700/10'
      />

      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
            >
              {/* PROMPT */}
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-6'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0  outline-none focus-visible:ring-0 focus-visible:ring-transparent tracking-wide'
                        disabled={isLoading}
                        placeholder='A picture of a sunset over water'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* AMOUNT */}
              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {amountOptions.map((option) => {
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* RESOLUTION */}
              <FormField
                control={form.control}
                name='resolution'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {resolutionOptions.map((option) => {
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
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
            <div className='p-20'>
              <Loader />
            </div>
          )}

          {images.length === 0 && !isLoading && (
            <Empty label='No images generated.' />
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
            {images.map((src) => {
              console.log(src);
              return (
                <Card key={src} className='rounded-lg overflow-hidden'>
                  <div className='relative aspect-square'>
                    <NextImage fill src={src} alt='Image' />
                  </div>

                  <CardFooter className='p-2'>
                    <Button
                      variant='secondary'
                      className='w-full'
                      onClick={() => window.open(src)}
                    >
                      <Download className='h-4 w-4 mr-2' />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
