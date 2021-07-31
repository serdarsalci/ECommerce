import React from 'react'
import './default.scss'
import Header from './components/header'
import Homepage from './pages/Homepage'

function App() {
	return (
		<div className='App'>
			<Header />
			<div className='main'>
				<Homepage />
			</div>
		</div>
	)
}

export default App
