import React from 'react'
import { Editor, EditorState } from 'draft-js';
import styles from '/styles/new.module.css';

const MakeNate = () => {
  const [editorState, setEditorState] = React.useState(
		EditorState.createEmpty()
	);

	const editor = React.useRef(null);

	function focusEditor() {
		editor.current.focus();
	}

	React.useEffect(() => {
		focusEditor();
	}, []);
  return (
		<div className={styles.container}>
			<div onClick={focusEditor}>
				<Editor
					ref={editor}
					editorState={editorState}
					onChange={(editorState) => setEditorState(editorState)}
				/>
			</div>
		</div>
	);
}

export default MakeNate