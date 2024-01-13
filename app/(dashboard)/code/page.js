'use client';

import Heading from '@/components/Heading';
import { Code } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/UserAvatar';
import BotAvatar from '@/components/BotAvatar';
import ReactMarkdown from 'react-markdown';

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    try {
      const userMessage = { role: 'user', content: values.prompt };
      const newMessages = [...messages, userMessage];
      const response = await axios.post('/api/code', {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error) {
      // TODO open pro model
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title='Code Generation'
        description='Generate code using descriptive text.'
        icon={Code}
        iconColor='text-green-700'
        bgColor='bg-green-700/10'
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
                        placeholder='Simple toggle button using react hooks?'
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

          {messages.length === 0 && !isLoading && (
            <Empty label='No conversation started' />
          )}

          <div className='flex flex-col-reverse gap-y-4'>
            {messages.map((message, i) => {
              return (
                <div
                  key={i}
                  className={cn(
                    'p-8 flex items-start gap-x-8 rounded-lg',
                    message.role === 'user'
                      ? 'bg-white border border-black/10'
                      : 'bg-muted'
                  )}
                >
                  {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => {
                        return (
                          <div className='overflow-auto my-2 bg-black/10 p-2 rounded-lg'>
                            <pre {...props} />
                          </div>
                        );
                      },
                      code: ({ node, ...props }) => {
                        return (
                          <code
                            className='bg-black/10 p-1 rounded-lg'
                            {...props}
                          />
                        );
                      },
                    }}
                    className='text-sm overflow-hidden leading-7'
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;