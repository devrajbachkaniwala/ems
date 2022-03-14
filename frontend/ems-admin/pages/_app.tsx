import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactNode } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const component = Component as typeof Component & {
    getLayout?: (page: any) => ReactNode;
  };

  if (component.getLayout) {
    return component.getLayout(<Component {...pageProps} />);
  }

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
