import './globals.css'

export const metadata = {
  title: 'codeCat',
  description: 'Unlock the door to code mastery with our online editor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
