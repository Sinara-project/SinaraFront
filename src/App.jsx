  import './App.css'
  import { Outlet, useLocation, useNavigate } from 'react-router-dom'
  import { useEffect, useState } from 'react'
  import Sidebar from './components/sidebar/Sidebar';
  import Notifications from './components/notifications/Notifications';
import { getNotificationByEnterpriseId } from './services/mongoDB/Notifications/Notifications';

  function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    const [notificationLoading, setNotificationLoading] = useState(true);

    const [notifications, setNotifications] = useState([]);

    const testSidebar = () => {
      const endpoints = [
        '/splash',
        '/editar'
      ]
      return user && !endpoints.includes(location.pathname);
    }

    const [notificationsVisibility, setNotificationsVis] = useState(false);

    const openNotifications = () => {
      setNotificationsVis(true);
    }

    const closeNotifications = () => {
      setNotificationsVis(false);
    }

    useEffect(() => {
      navigate("/splash");

      async function getNotifications() {
        try {
          const data = await getNotificationByEnterpriseId(JSON.parse(localStorage.getItem("user")).id);
          setNotifications(data);
        } catch (err) {
          console.log(err);
        } finally {
          setNotificationLoading(false);
        }
      } 

      getNotifications();
    }, [])

    return (
      <>
        <Notifications isVisible={notificationsVisibility} closeNotifications={closeNotifications} notifications={notifications} isLoading={notificationLoading} />
        { testSidebar() && (<Sidebar openNotifications={openNotifications} />) }
        <Outlet/>
      </>
    )
  }

  export default App
