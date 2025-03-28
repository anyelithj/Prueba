import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";


class MyDocument extends Document {
   static async getInitialProps(ctx:DocumentContext) {
    const  initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
   }
   render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&family=Lora:wght@400;700&display=swap" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
   }
}
export default MyDocument;
