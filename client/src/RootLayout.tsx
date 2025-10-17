import React from 'react';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`font-sans antialiased min-h-screen`}>
      {children}
    </div>
  );
}