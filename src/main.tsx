import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './lib'
import './style.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
