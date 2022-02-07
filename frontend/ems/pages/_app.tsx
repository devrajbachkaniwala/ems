import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../app/graphql';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>

     <Head>
        <title>Event Management System</title>
      </Head>

      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Provider>
     
    </>
  )
}

export default MyApp
