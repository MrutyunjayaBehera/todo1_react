import { List, ListItem, ListItemText, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import './App.css';
import db from './firebase';


const useStyles = makeStyles((theme) => ({
	todo__list: {
		backgroundColor: 'blue',
		borderRadius: '10px',
		marginBottom: '5px',
	},
	delbtn: {
		margin: theme.spacing(1),
	},
	edtbtn: {
		backgroundColor: 'gold',
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));


function Todo(props) {

	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState('');

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const updateTodo = () => {
		// update the todo with new input text
		db.collection('todos').doc(props.id).set({
			todo:input
		}, {merge: true});
		setOpen(false);
	};

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<div className={classes.paper}>
					<h1>I am a modal</h1>
					<input type="text" placeholder={props.todo} value={input} onChange={e => setInput(e.target.value)} />
					<Button onClick={updateTodo}>Update and Close</Button>
				</div>
			</Modal>

			<div>
				<List className={classes.todo__list}>
					<ListItem>
						<ListItemText primary={props.todo} secondary={props.id} />
						<Button variant="contained" color="secondary" className={classes.edtbtn}
							onClick={handleOpen}
							startIcon={<EditIcon />} fontSize="large">
							Edit
						</Button>
						<Button variant="contained" color="secondary" className={classes.delbtn}
							onClick={(e) => db.collection('todos').doc(props.id).delete()}
							startIcon={<DeleteIcon />} fontSize="large">
							Delete
						</Button>
					</ListItem>
				</List>
			</div>
		</>
	)
}

export default Todo
