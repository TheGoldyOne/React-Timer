import React from 'react';
import './App.css';
import Timer from './components/Timer';


function App() {


	return (
		<div className="App">
			<Timer minutes={20} />
		</div>
	);
}

export default App;
