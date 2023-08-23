import { Html, Head, Main, NextScript } from 'next/document'
import Header from 'components/header/'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <div>
        <Header/>
      </div>
      <div style={{marginTop: '10rem'}}>
      <body>
        <Main />
        <NextScript />
      </body>
      </div>
      
    </Html>
  )
}
