import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const component = Component as typeof Component & {
    getLayout?: (page: any) => ReactNode;
  };

  if (component.getLayout) {
    return component.getLayout(
      <>
        <Head>
          <title>EMS Admin</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>EMS Admin</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
