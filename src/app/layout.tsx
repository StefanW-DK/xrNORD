// Root layout — minimal pass-through so [locale] layout can own <html lang="...">
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
