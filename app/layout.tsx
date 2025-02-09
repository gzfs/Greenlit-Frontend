import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
export const onest = Onest({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Greenlit - ESG Reporting Made Easy",
  description: "Streamline your ESG reporting process with Greenlit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
