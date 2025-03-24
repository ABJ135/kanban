import { Routes, Route } from 'react-router-dom';
import AddTask from './pages/AddTask';
import Task from './pages/Task';
import Navbar from './components/Navbar';
import Edit from './pages/Edit';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Task />} />
        <Route path='/AddTask' element={<AddTask />} />
        <Route path='/Task' element={<Task />} />
        <Route path='/Edit/:id' element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
