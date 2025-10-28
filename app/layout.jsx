import "./globals.css";



export const metadata = {
  title: "E.STORE",
  description: "E-commerce site developed by CODEWRLD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
