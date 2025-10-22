import './App.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from './components/sidebar/Sidebar';
import Notifications from './components/notifications/Notifications';

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

  const [notificationsVisibility, setNotifications] = useState(false);

  const openNotifications = () => {
    console.log(notificationsVisibility);
    
    setNotifications(true);
  }

  const closeNotifications = () => {
    setNotifications(false);
  }

  useEffect(() => {
    navigate("/splash");
  }, [])

  return (
    <>
      <Notifications isVisible={notificationsVisibility} closeHistory={closeNotifications} />
      { testSidebar() && (<Sidebar openNotifications={openNotifications} />) }
      <Outlet/>
    </>
  )
}

export default App
