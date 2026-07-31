import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Header from "@/components/Header";
import WebGLCanvas from "@/components/WebGLCanvas";
import CustomCursor from "@/components/CustomCursor";
import SectionNavigation from "@/components/SectionNavigation";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yash Verma | Creative Portfolio",
  description: "Personal engineering portfolio of Yash Kumar Verma. Built with Next.js, GSAP, and WebGL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="bg-[#070708] text-[#ededed] font-sans min-h-screen overflow-x-hidden selection:bg-white selection:text-black">
        <SmoothScrollProvider>
          {/* z-[0] WebGL Canvas Layer (Fixed position, full viewport) */}
          <div id="webgl-layer" className="fixed inset-0 z-[0] pointer-events-none">
            <WebGLCanvas />
          </div>

          {/* z-[10] DOM Content Layer */}
          <main className="relative z-[10]">
            {children}
          </main>

          {/* z-[40] Section Indicators */}
          <SectionNavigation />

          {/* z-[50] Overlay Navigation Layer */}
          <Header />

          {/* z-[100] Custom Cursor */}
          <CustomCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
