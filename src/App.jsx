import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      // Navegar para home
    } else {
      navigate("/cadastrar")
    }
  }, [])

  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
