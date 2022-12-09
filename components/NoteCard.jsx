import React from 'react'
import styles from '/styles/NoteCard.module.css';

const NoteCard = ({title,date,note}) => {
  return (
    <div className={styles.container} styles={{"margin-top": "50px"}}>
      <h1 className={styles.heading}>{title}</h1>
      <h5>{date}</h5>
      <p>{note}</p>
    </div>
  )
}

export default NoteCard