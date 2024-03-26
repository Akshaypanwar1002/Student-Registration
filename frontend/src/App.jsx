import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CreateStudent from './pages/CreateStudent'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import AllCourse from './pages/AllCourse';
import Course from './pages/Course';
import AddCourse from './pages/AddCourse';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


<BrowserRouter basename="/">
      <Routes>
        <Route path="/" Component={CreateStudent} />
        <Route path="/allCourse" Component={AllCourse} />
        <Route path="/course/:name" Component={Course} />
        <Route path="/addCourse" Component={AddCourse} />
      </Routes>
    </BrowserRouter>
    {/* <CreateStudent/>
    <AllCourse/>
    <Course/>
    <AddCourse/> */}
    </>
  )
}

export default App
