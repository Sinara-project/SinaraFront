import './App.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar';
import History from './components/history/History';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const testSidebar = () => {
    const endpoints = [
      '/splash',
      '/editar'
    ]
    return user && !endpoints.includes(location.pathname);
  }

  const [historyVisibility, setHistory] = useState(false);

  const openHistory = () => {
    console.log(historyVisibility);
    
    setHistory(true);
  }

  const closeHistory = () => {
    setHistory(false);
  }

  useEffect(() => {
    navigate("/splash");
  }, [])

  return (
    <>
      <History isVisible={historyVisibility} closeHistory={closeHistory} />
      { testSidebar() && (<Sidebar openHistory={openHistory} />) }
      <Outlet/>
    </>
  )
}

export default App
