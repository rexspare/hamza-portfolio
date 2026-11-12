import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamzazafar.online"),
  title: {
    default: "Hamza Zafar | Senior React Native Developer",
    template: "%s | Hamza Zafar",
  },
  description:
    "Senior React Native Developer & Full Stack Mobile Engineer. 6+ years building iOS and Android apps with React Native, TypeScript, and Node.js. 50+ production apps shipped.",
  keywords: [
    "React Native developer",
    "mobile app developer",
    "iOS Android developer",
    "TypeScript",
    "Node.js",
    "Full Stack Mobile Engineer",
    "cross-platform apps",
    "React Native portfolio",
  ],
  openGraph: {
    title: "Hamza Zafar | Senior React Native Developer",
    description:
      "Senior React Native Developer & Full Stack Mobile Engineer. 6+ years building iOS and Android apps. 50+ production apps shipped.",
    url: "https://hamzazafar.online",
    siteName: "Hamza Zafar",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${plexSans.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
