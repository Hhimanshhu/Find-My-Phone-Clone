export const metadata = { title: "Find Hub – Demo", description: "Find My Device UI clone" };

import "./globals.css";
import { ToastProvider } from "./context/ToastContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ScriptTheme />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

/** inline script to set theme before paint */
function ScriptTheme() {
  const js = `
    try {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const dark = saved ? saved === 'dark' : prefersDark;
      document.documentElement.classList.toggle('dark', dark);
    } catch(e){}
  `;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
