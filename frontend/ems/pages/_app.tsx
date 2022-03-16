import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../app/graphql';
import Layout from 'components/layout';
import { ReactNode } from 'react';
import { TPageLayout } from 'types/pageLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const title = (
    <Head>
      <title>Event Management System</title>
    </Head>
  );

  const component = Component as typeof Component & TPageLayout;

  if (component.getLayout) {
    return (
      <>
        {title}
        {component.getLayout(<Component {...pageProps} />)}
      </>
    );
  }

  return (
    <>
      {title}
      <Component {...pageProps} />
    </>
  );

  /* return (
    <>
      {title}
      
      <Provider store={store}>
        <Layout>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Layout>
      </Provider>
    </>
  ); */
}

export default MyApp;
