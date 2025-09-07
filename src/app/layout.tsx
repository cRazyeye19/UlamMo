import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { SupabaseProvider } from "./_components/supabase/supabase-provider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <body>
            <SupabaseProvider>{children}</SupabaseProvider>
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
