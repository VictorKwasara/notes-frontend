import React, {useState, useEffect} from 'react'
import * as Web3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as borsh from '@project-serum/borsh';
import { useRouter } from 'next/router';
import { PublicKey } from "@solana/web3.js";
import NoteCard from "../components/NoteCard";
import Box from '@mui/material/Box'

const Notes = () => {
  const { connection } = useConnection();
	const { publicKey, sendTransaction ,connected} = useWallet();
	const router = useRouter();

	const [data, setData] = useState([])

  // const NOTE_PROGRAM_ID = '8GoaPx2quN5vwBqvELrkV8pCtPJm6dBdhSGmRYexZf9X';
  const NOTE_PROGRAM_ID = 'HQA3KzCNbYTshuR2ej2dsZzeDXeVtUU6vy5NPPqBuyUF';
  const bufferSchema = borsh.struct([
	  borsh.bool("isInitialized"), //8
		borsh.publicKey('owner'), //32
		borsh.str('date'), // 4+
		borsh.str('title'), // 4+
		borsh.str('note'), // 4+
	]);

	useEffect(() => {
		if (connected) {
			getData()
		} else {
			router.push('/');
		}
	}, [connection]);
  

  const getData = () => {
			if (!publicKey || !connection) {
				alert('Please connect your wallet!');
				return;
			}

			// const [notesAccount] = Web3.PublicKey.findProgramAddressSync(
			// 	[publicKey.toBuffer(), new TextEncoder().encode('Notes Account')],
			// 	new Web3.PublicKey(NOTE_PROGRAM_ID)
			// );

			connection
				.getProgramAccounts(new Web3.PublicKey(NOTE_PROGRAM_ID))
				.then(async (accounts) => {
					const Notes = accounts.reduce((accum, { publickey, account }) => {
						if (!account.data) {
							return accum;
						}
						const Note = bufferSchema.decode(account.data);

						if (!Note) {
							return accum;
						}
						console.log(Note);
						if (Note.owner.toString() != publicKey.toString()) {
							return accum;
						}

						return [...accum, Note];
					}, []);

					setData(Notes);
				});
		};

  return (
     <>
		 		{data.map((note, i)=> (					  
            <Box key={`${i}${note.title}`}>
							<NoteCard {...note} />
						</Box>						
				))}
		 </>
  )
}

export default Notes