import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Logon from './pages/auth/logon/Logon.jsx';
import LogonInsertCode from './pages/auth/logon-insert-code/LogonInsertCode.jsx';
import PlanChoice from './pages/auth/plan-choice/PlanChoice.jsx';
import Payment from './pages/auth/payment/Payment.jsx';
import Thanks from './pages/auth/thanks/Thanks.jsx';
import RestrictPassword from './pages/auth/restrict-password/RestrictPassword.jsx';
import Login from './pages/auth/login/Login.jsx';
import LoginConfirm from './pages/auth/login-confirm/LoginConfirm.jsx';
import Splash from './pages/splash/Splash.jsx';
import Home from './pages/home/Home.jsx';
import Dashboards from './pages/dashboards/Dashboards.jsx';
import SheetsList from './pages/sheets-list/SheetsList.jsx';
import CreateForm from './pages/create-form/CreateForm.jsx';
import Profile from './pages/profile/Profile.jsx';
import Settings from './pages/edit/settings/Settings.jsx';
import EditData from './pages/edit/editData/EditData.jsx';
import RestrictedAreaEnter from './pages/restricted-area/enter/RestrictedAreaEnter.jsx';
import RestrictedAreaMenu from './pages/restricted-area/menu/RestrictedAreaMenu.jsx';
import Permissions from './pages/restricted-area/permissions/Permissions.jsx';
import Workers from './pages/restricted-area/workers/Workers.jsx';
import LogonWorker from './pages/restricted-area/logon-worker/LogonWorker.jsx';
import EditWorker from './pages/restricted-area/edit-worker/EditWorker.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
      <Route path='splash' element={<Splash />} />
        <Route path='cadastrar' element={<Logon />} />
        <Route path='inserir-codigo' element={<LogonInsertCode />} />
        <Route path='escolher-plano' element={<PlanChoice />} />
        <Route path='pagamento' element={<Payment />} />
        <Route path='obrigado' element={<Thanks />} />
        <Route path='senha-restrita' element={<RestrictPassword />} />
        <Route path='entrar' element={<Login />} />
        <Route path='confirmar-entrada' element={<LoginConfirm />} />
        <Route path='home' element={<Home />} />
        <Route path='dashboards' element={<Dashboards />} />
        <Route path='planilhas' element={<SheetsList />} />
        <Route path='criar-formulario' element={<CreateForm />} />
        <Route path='perfil' element={<Profile />} />
        <Route path='configuracoes' element={<Settings/>} />
        <Route path='editar' element={<EditData/>} />
        <Route path='entrar-area-restrita' element={<RestrictedAreaEnter />} />
        <Route path='menu-area-restrita' element={<RestrictedAreaMenu />} />
        <Route path='permissoes' element={<Permissions />} />
        <Route path='operarios' element={<Workers />} />
        <Route path='cadastrar-operario' element={<LogonWorker />} />
        <Route path='editar-operario' element={<EditWorker />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
