import React from 'react'
import Link from "next/link"
import MuiLink from "@mui/material/Link"
import AppBar from '@mui/material/AppBar';
import styles from "/styles/Header.module.css";
import dynamic from "next/dynamic"
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';

const WalletMultiButton = dynamic(
	async () =>
		(await import('@solana/wallet-adapter-material-ui')).WalletMultiButton,
	{ ssr: false }
);

const Header = () => {
  return (
		<>
			<AppBar position='static' color='transparent' className={styles.appbar}>
				<Toolbar className={styles.toolbar}>
					<Stack className={styles.stack} direction='row' spacing={8}>
						<Link className={styles.link} href='/notes'>
							Notes
						</Link>
						<Link className={styles.link} href='/new'>
							Make Note
						</Link>
						<WalletMultiButton sx={{color: "#171A21" , height:"40px"}} color="secondary" />
					</Stack>
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Header                   