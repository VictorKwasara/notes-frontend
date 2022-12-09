import React, {useState, useEffect} from 'react'
// import { Editor, EditorState } from 'draft-js';
import styles from '/styles/new.module.css';
import useCheckConnection from '../hooks/useCheckConection';
import { Button } from '@mui/material';
import * as Web3 from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import * as borsh from '@project-serum/borsh';
import { useRouter } from 'next/router';
import Form from '../components/Form'
const MakeNate = () => {	
	const [note, setNote] = useState({title: "", note: ""}) 
	const { connection } = useConnection();
	const { publicKey, sendTransaction ,connected} = useWallet();
	const router = useRouter();

	 useEffect(() => {
			if(connected) {
			} else {
				router.push('/');
			}
		}, [publicKey]);
 
	const NOTE_PROGRAM_ID = 'HQA3KzCNbYTshuR2ej2dsZzeDXeVtUU6vy5NPPqBuyUF';
	// const NOTE_PROGRAM_ID = '8GoaPx2quN5vwBqvELrkV8pCtPJm6dBdhSGmRYexZf9X';
	const handlesubmit = async (e) => {
	 e.preventDefault() ;
   console.log("The title is: ", note.title);
	 console.log("The note is: ", note.note);
	 await sendNoteTransaction();
	 setNote({title:"", note: ""});
	 router.push('/notes');
	}

	let noteSchema = borsh.struct([
		borsh.u8("variant"),
		borsh.str('date'),
		borsh.str("title"),
		borsh.str("note")	
	]);


	// const notesSchema = borsh.struct([
	// 	borsh.u8("count")
	// ])

	const sendNoteTransaction = async () => {
		//get connection from wallet
 			  
		//create transaction
	 if (!publicKey || !connection) {
			alert('Please connect your wallet!');
			return;
		}


		const transaction = new Web3.Transaction();

		// const [notesAccount] =  Web3.PublicKey.findProgramAddressSync(
		// 	[publicKey.toBuffer(), new TextEncoder().encode("Notes Account")],
		// 	new Web3.PublicKey(NOTE_PROGRAM_ID)
		// );


		const [noteAccount] = Web3.PublicKey.findProgramAddressSync(
			[publicKey.toBuffer(), new TextEncoder().encode(note.title)],
			new Web3.PublicKey(NOTE_PROGRAM_ID)
		);

		//create instruction data
		const buffer = Buffer.alloc(1000)
		 const date = new Date() ;
		 const [day,month, year] = [date.getDay(), date.getMonth(), date.getFullYear()]

		noteSchema.encode({variant: 0, date:`${day}/${month}/${year}`, ...note},buffer)
		// create instruction

		const InstructionBuffer = buffer.subarray(0, noteSchema.getSpan(buffer));
		const instruction = new Web3.TransactionInstruction({
			keys: [
				{
					pubkey: publicKey,
					isSigner: true,
					isWritable: false,
				},
				{
					pubkey: noteAccount,
					isSigner: false,
					isWritable: true,
				},
				{
					pubkey: Web3.SystemProgram.programId,
					isSigner: false,
					isWritable: false,
				},
			],

			data: InstructionBuffer,

			programId: new Web3.PublicKey(NOTE_PROGRAM_ID),
		});

		// add instructions to transaction
		 transaction.add(instruction);

		// send transaction
		 try {
				let txid = await sendTransaction(transaction, connection);
				console.log(
					`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
				);
			} catch (e) {
				alert(JSON.stringify(e));
			}

	}
	//hook to return to front if diconected 
  return (
			<Form handlesubmit={handlesubmit} setNote={setNote} note={note}/>
	);
}

export default MakeNate