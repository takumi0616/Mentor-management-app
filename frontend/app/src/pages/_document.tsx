import { Html, Head, Main, NextScript } from 'next/document'
import Header from 'components/header/'

export default function Document() {
  return (
    <Html lang="en">
      <Header/>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
