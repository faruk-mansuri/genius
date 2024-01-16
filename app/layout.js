import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import ModalProvider from '@/components/ModalProvider';
import ToastProvider from '@/components/ToastProvider';
import CrispProvider from '@/components/CrispProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Genius',
  description: 'AI Platform',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
