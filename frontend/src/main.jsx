
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  AppContextProvider from './context/AppContext'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>     <App /> </AppContextProvider>
 
  </BrowserRouter>,
)


