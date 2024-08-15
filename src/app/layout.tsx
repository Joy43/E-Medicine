
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProviders from './Authentication/Proividers/AuthProviders';
import TanstackProvider from './TanstackProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Medicine',
  description: 'E-medicine is product sell ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          <TanstackProvider>
           <div> {children}</div>
          </TanstackProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
