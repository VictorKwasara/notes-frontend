import React from 'react'
import {Button} from "@mui/material"
import * as styles from "../styles/form.module.css"

const Form = ({handlesubmit, note, setNote}) => {
  return (
		<form className={styles.fm}>
			<fieldset className={styles.fset}>
				<label htmlFor='title'>
					<input
						className={styles.input}
						placeholder='Whats my name, Oh nah nah...'
						type='text'
						value={note.title}
						name='title'
						onChange={(e) => setNote({ ...note, title: e.target.value })}
					/>
				</label>
			</fieldset>
			<fieldset className={styles.fset}>
				<label htmlFor='title'>
					<textarea
						className={styles.input}
						placeholder='Whats on your mind...?'
						value={note.note}
						onChange={(e) => setNote({ ...note, note: e.target.value })}
						rows={15}
						type='text'
						name='title'
					/>
				</label>
			</fieldset>
			<Button variant="contained" onClick={handlesubmit}>Submit</Button>
		</form>
	);
}

export default Form