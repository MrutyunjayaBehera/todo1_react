import './App.css';
import Todo from './Todo';
import { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import firebase from 'firebase';
import db from './firebase';


function App() {

	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	// when the app loads, we need to learn to database and fetch new data 
	useEffect(() => {
		// whenever the app loads, this code fires && fires when there is a change in var in []
		db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
			// console.log(snapshot.docs.map(doc=>doc.data())), this gives an object
			setTodos(snapshot.docs.map(doc => ({id:doc.id, todo:doc.data().todo})));
		})
	}, []);

	const addTodo = (e) => {
		// this code will run when we click the button
		e.preventDefault();
		// setTodos([...todos, input]); updating directly to firebase database
		db.collection('todos').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
		setInput('');
	}

	return (
		<div className="todo-app">
			<h1>Let's create a TODO App</h1>

			<form>
				<FormControl>
					<InputLabel>✅ Write a Todo</InputLabel>
					<Input type="text" value={input} onChange={e => setInput(e.target.value)} />
				</FormControl>
				<Button disabled={!input} variant='contained' color='primary' type="submit"
					onClick={addTodo}>
					Add Todo
				</Button>
			</form>
			
			<ul>
				{todos.map(todo => (
					<Todo todo={todo.todo} id={todo.id} />
				))}
			</ul>
		</div>
	);
}

export default App;
