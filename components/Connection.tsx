import React, {FC, useMemo,ReactNode} from 'react'
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-wallets';
import {
	WalletDialogProvider,
} from '@solana/wallet-adapter-material-ui';
import { clusterApiUrl } from '@solana/web3.js';
import dynamic from "next/dynamic"
// require('@solana/wallet-adapter-react-ui/styles.css');

const WalletMultiButton = dynamic(
	async () =>
		(await import('@solana/wallet-adapter-material-ui')).WalletMultiButton,
    { ssr: false}
);

const Connection: FC<{children: ReactNode}> = ({children}) => {
  const network = WalletAdapterNetwork.Devnet ;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(()=>[
    new PhantomWalletAdapter ,
  ],
  [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
            {children}
        </WalletDialogProvider>
      </WalletProvider>   
    </ConnectionProvider>
    
  )
}

export default Connection