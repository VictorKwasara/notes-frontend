import {useEffect, FC, useState} from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';


const CheckConection = () => {
	// const [connected, setConnected] = useState(false);
	const router = useRouter();
	const { connection } = useConnection();
	const wallet = useWallet();
	
		if (wallet.connected) {
			// setConnected(true);
		} else {
			// setConnected(false);
			router.push('/');
		}
}

export default CheckConection