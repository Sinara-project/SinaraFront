import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import SheetsList from './pages/sheets/sheets-list/SheetsList.jsx';

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
      </Route>
    </Routes>
  </BrowserRouter>
)
