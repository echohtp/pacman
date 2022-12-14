
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
    BackpackWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { ToastContainer } from 'react-toastify'

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }: AppProps) {

    const router = useRouter()
   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
   const network = WalletAdapterNetwork.Mainnet;

   // You can also provide a custom RPC endpoint.
   const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC!

   // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
   // Only the wallets you configure here will be compiled into your application, and only the dependencies
   // of wallets that your users connect to will be loaded.
   const wallets = useMemo(
       () => [
           new BackpackWalletAdapter(),
           new PhantomWalletAdapter(),
           new SlopeWalletAdapter(),
           new SolflareWalletAdapter({ network }),
           new TorusWalletAdapter(),
           new LedgerWalletAdapter(),
           new SolletWalletAdapter({ network }),
           new SolletExtensionWalletAdapter({ network }),
       ],
       [network]
   );

  return (
    
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
                <ToastContainer theme='dark' position='top-center'/>
                <Component {...pageProps} />
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    
);

}

export default MyApp
