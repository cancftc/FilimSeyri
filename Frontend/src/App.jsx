import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminCategory from './pages/AdminCategory'
import CategoryDetails from './pages/CategoryDetails.jsx'
import PostDetails from './pages/PostDetails.jsx'
import UserProfile from './pages/UserProfile.jsx'

function App() {

  return (
    <div className='deneme'> 
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/category' element={<AdminCategory/>}></Route>
        <Route path='/category-details/:name' element={<CategoryDetails/>}></Route>
        <Route path='/post-details/:postId' element={<PostDetails/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/userProfile/:userId' element={<UserProfile/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </div>
  )
}

export default App
