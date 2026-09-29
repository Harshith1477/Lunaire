import "./globals.css";
import { CartProvider } from "../components/cart";

export const metadata = {
  title: "Lunaire — Measured Purity",
  description: "Hand-cast jewelry, finished in the Lunaire atelier.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://i.postimg.cc" />
        <link rel="preconnect" href="https://i.postimg.cc" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/hero-video.mp4" as="video" type="video/mp4" />
        <style>{`
          @font-face {
            font-family: 'Vintage Halloween';
            src: url('/fonts/vintage-halloween.otf') format('opentype');
            font-display: swap;
          }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
