import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LoadingProvider } from "@/context/LoadingContext";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" });


export const metadata: Metadata = {
  title: "Pavvi Dovvi Vibing | Portfolio",
  description: "A digital space for persistence and hustle.",
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
      <body className={`${inter.variable} ${dancingScript.variable} font-sans flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200`}>


        <ThemeProvider>
          <AuthProvider>
            <LoadingProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </LoadingProvider>
          </AuthProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
