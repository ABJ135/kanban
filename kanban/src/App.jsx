import { Routes, Route } from 'react-router-dom'
import AddTask from './pages/AddTask'
import Task from './pages/Task'
import Navbar from './components/Navbar'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Task />} />
        <Route path='/AddTask' element={<AddTask />} />
        <Route path='/Task' element={<Task />} />
      </Routes>
    </>
  )
}

export default App
