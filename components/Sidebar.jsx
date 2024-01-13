'use client';

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  MusicIcon,
  Settings,
  VideoIcon,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-pink-500',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: 'text-orange-700',
  },
  {
    label: 'Music Generation',
    icon: MusicIcon,
    href: '/music',
    color: 'text-emerald-500',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-green-700',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    // color: 'text-green-700',
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className='space-y-4 py-4  flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2'>
        <Link href='/dashboard' className='flex items-center pl-3 mb-14'>
          {/* <div className='relative w-8 h-8 mr-4 '>
            <Image fill alt='logo' src='/logo.png' />
          </div> */}

          <Image
            width={32}
            height={32}
            alt='logo'
            src='/logo.png'
            className='mr-4'
          />

          <h1 className={cn('text-2xl font-bold', montserrat.className)}>
            Genius
          </h1>
        </Link>

        <div className='space-y-1'>
          {routes.map((route) => {
            return (
              <Link
                href={route.href}
                key={route.label}
                className={cn(
                  'text-sm p-3 flex justify-start font-medium cursor-pointer hover:text-white hover:bg-gray-800 rounded-lg translation',
                  pathname === route.href
                    ? 'text-white bg-gray-800'
                    : 'text-zinc-400'
                )}
              >
                <div className='flex items-center'>
                  <route.icon className={cn('h5 w-5 mr-5', route.color)} />
                  {route.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;