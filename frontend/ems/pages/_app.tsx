import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../app/graphql';
import Layout from 'components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Event Management System</title>
      </Head>

      <Provider store={store}>
        <Layout>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
