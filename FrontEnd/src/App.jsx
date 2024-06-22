import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/books/Home'
import  CreateBooks  from './pages/books/CreateBook'
import EditBook  from './pages/books/EditBook'
import DeleteBook from './pages/books/DeleteBook'
import ShowBook from './pages/books/ShowBook'
import Signup from './pages/authentication/Signup'
import Login from './pages/authentication/Login'

 const App = () => {
  return (
<Routes>
  <Route path ='/' element ={<Home/>}/>
  <Route path ='/books/create' element ={<CreateBooks/>}/>
  <Route path ='/books/details/:id' element ={<ShowBook/>}/>
  <Route path ='/books/edit/:id' element ={<EditBook/>}/>
  <Route path ='/books/delete/:id' element ={<DeleteBook/>}/>
  <Route path ='/signup' element ={<Signup/>}/>
  <Route path ='/login' element ={<Login/>}/>


</Routes>  )
}
export default App