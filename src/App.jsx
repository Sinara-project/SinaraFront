import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    navigate("/splash");
  }, [])

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
