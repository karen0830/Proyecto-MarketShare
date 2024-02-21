import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppEccomerce } from './App.jsx'
import { AppEcommerce } from './mainEcommerce.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <div>
        <App />
        <AppEcommerce/>
    </div>
)
