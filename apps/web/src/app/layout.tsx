import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import StyledComponentsRegistry from '../../lib/registry';

const font = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Woovi Challenge',
  description: 'The safest way to pay with PIX',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
