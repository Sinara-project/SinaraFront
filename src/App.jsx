import './App.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentCNPJ = localStorage.getItem("currentCNPJ");

  const testSidebar = () => {
    return currentCNPJ && location.pathname != '/splash';
  }

  useEffect(() => {
    navigate("/splash");
  }, [])

  return (
    <>
      {testSidebar() && (<Sidebar/>) }
      <Outlet/>
    </>
  )
}

export default App
