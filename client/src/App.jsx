import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom'
import Sign_in from './Cutomers_Section/pages/User_access/Sign_in'
import Sign_up from './Cutomers_Section/pages/User_access/Sign_up'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Sign_in/>}/>
      <Route exact path='/sign_up' element={<Sign_up/>}/>
    </Routes>
   </BrowserRouter>

   </>
  )
}

export default App
