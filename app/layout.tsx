import DialogContainer from "@/components/dialog-container";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kanban application",
    template: "%s | Kanban application",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        {children}
        <Toaster position="top-right" />
        <DialogContainer />
      </body>
    </html>
  );
}
