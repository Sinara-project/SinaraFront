  import './App.css'
  import { Outlet, useLocation, useNavigate } from 'react-router-dom'
  import { useEffect, useState } from 'react'
  import Sidebar from './components/sidebar/Sidebar';
  import Notifications from './components/notifications/Notifications';
  import { getAllNotifications } from './services/Notifications/Notifications';

  function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    const [notificationLoading, setNotificationLoading] = useState(true);

    const [notifications, setNotifications] = useState([
      {
        _id: 1,
        data: new Date(2025, 9, 12, 13, 40),
        mensagem: "O(a) operário(a) João Batista respondeu um formulário!",
        tipo: "Operário",
        categoria: "Formulário respondido",
      },
      {
        _id: 2,
        data: new Date(2025, 9, 12, 13, 40),
        mensagem: "O(a) operário(a) Lucas Silvestre registrou um relatório!",
        tipo: "Operário",
        categoria: "Formulário registrado",
      },
    ]);

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
          const data = await getAllNotifications();
          console.log(data);
          
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
