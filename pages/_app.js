import '../styles/globals.css'
 import Nav from '../components/navbar'
import Fot from '../components/foo'
import { NextUIProvider } from '@nextui-org/react';
import {SessionProvider} from 'next-auth/react'
import Head from 'next/head'
import { Provider } from 'react-redux';
import  store  from '../store'
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from "redux-persist"
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
let persistor = persistStore(store)
  return (
    
    <PersistGate persistor={persistor}>
    <Provider store ={store}>
     <SessionProvider session={pageProps.session}>
      <Head >
        <meta charSet="utf-8" />


        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
{router.pathname=="/sum"?null: <Nav></Nav>}
           <Component {...pageProps} />


           {router.pathname=="/sum"||router.pathname=="/basket"?null:<Fot></Fot>}
    </SessionProvider>
             </Provider></PersistGate>
             )
          }

export default  MyApp
