import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_DESCRIPTION,APP_SLOGAN } from "@/lib/constants";
import { Roboto } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/Cursor";
import { Toaster } from 'sonner'
import CookieConsent from "@/components/cookie";


const roboto =Roboto({
  subsets:['latin'],
  weight:['400','500','700']
})

const geistSans = Geist({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title:{
    template:`%s | ${APP_NAME}`,
    default: `${APP_NAME}.${APP_SLOGAN}`,
  },
   description:APP_DESCRIPTION, 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>


     
     {children}
     <Toaster />
    
     <ScrollToTop/>
     <CustomCursor/>
     <CookieConsent/>
     
      </body>
    </html>
  );
}
