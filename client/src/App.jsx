import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom'
import Sign_in from './Cutomers_Section/pages/User_access/Sign_in'
import Sign_up from './Cutomers_Section/pages/User_access/Sign_up'
import AdminHome from './Admin_section/Pages/Home/AdminHome'
import Home from './Cutomers_Section/pages/Home/Home'
import App_ from './Admin_section/App_'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Sign_in/>}/>
      <Route exact path='/sign_up' element={<Sign_up/>}/>
      <Route exact path='/admin_home' element={<AdminHome/>}/>
      <Route exact path='/users_home' element={<App_/>}/>
    </Routes>
   </BrowserRouter>
   <App_/>

   </>
  )
}

export default App
