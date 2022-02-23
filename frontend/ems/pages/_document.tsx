import { Html, Head, Main, NextScript } from 'next/document';
import { FC } from 'react';

const Document: FC = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id='root-modal'></div>
      </body>
    </Html>
  );
};

export default Document;
