import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Showcase of my projects and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'auto';
                const root = document.documentElement;
                
                if (theme === 'dark') {
                  root.classList.add('dark');
                } else if (theme === 'light') {
                  root.classList.remove('dark');
                } else {
                  // Auto mode - check system preference
                  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    root.classList.add('dark');
                  } else {
                    root.classList.remove('dark');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
