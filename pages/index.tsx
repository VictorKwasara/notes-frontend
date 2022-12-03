import {useEffect,useState} from "react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '/styles/Home.module.css'
import Box from "@mui/material/Box"
import dynamic from 'next/dynamic'
import Stack from '@mui/material/Stack'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';

const WalletMultiButton = dynamic(
	async () =>
		(await import('@solana/wallet-adapter-material-ui')).WalletMultiButton,
	{ ssr: false }
);


export default function Home() {
  const [connected, setConnected] = useState(false)
  const router = useRouter();
	const { connection } = useConnection();
	const wallet = useWallet();

  useEffect(()=>{
    console.log("wallet connected", wallet.connected)

    if (wallet.connected){
      setConnected(true)
      router.push("/notes")
    }else{
      setConnected(false)
    }
  },[wallet])

  return (
		<Box className={styles.box}>
			Make Quick Private Notes
			<WalletMultiButton
				size='large'
				sx={{ color: '#FED668', margin: '20px 0px 0px 500px' }}
			/>
		</Box>
	);
}
