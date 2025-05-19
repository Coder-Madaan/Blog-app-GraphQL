// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from '@/components/ApolloWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog Application',
  description: 'A simple blog application using Next.js and GraphQL',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <main className="min-h-screen p-4">
            {children}
          </main>
        </ApolloWrapper>
      </body>
    </html>
  );
}