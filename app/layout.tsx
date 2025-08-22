import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import DialogContainer from "@/components/dialog-container";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
          <DialogContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
