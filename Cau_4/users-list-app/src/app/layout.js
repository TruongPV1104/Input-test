import './globals.css'

export const metadata = {
  title: 'Users List',
  description: 'Danh sách người dùng',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
