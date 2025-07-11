import './globals.css';

export const metadata = {
  title: 'Send Form',
  description: 'Web used to enter information and send',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}