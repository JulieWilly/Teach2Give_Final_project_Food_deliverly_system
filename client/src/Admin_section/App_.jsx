import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Orders from './Pages/Order/Orders';
import NavigationLink from './components/NavigationLink';
import ManageUsers from './Pages/ManageUsers/ManageUsers';
import Reviewers from './Pages/Reviews/Reviewers';
import Products from './Pages/Products/Products'
const App = () => {
    return <div>
            <BrowserRouter>
            <Header/>
            <NavigationLink/>
                <Routes>
                    <Route exact path='dashboard' element={<Dashboard/>}/>
                    <Route exact path='orders' element={<Orders/>}/>
                    <Route exact path='manage_users' element={<ManageUsers/>}/>
                    <Route exact path='products' element={<Products/>}/>
                    <Route exact path='reviewers' element={<Reviewers/>}/>
                    <Route exact path='*' element={<div>Page not found.</div>}/>
                </Routes>
            </BrowserRouter>
    </div>
}



export default App;