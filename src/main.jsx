import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Logon from './pages/auth/logon/Logon.jsx';
import LogonInsertCode from './pages/auth/logon-insert-code/LogonInsertCode.jsx';
import PlanChoice from './pages/auth/plan-choice/PlanChoice.jsx';
import PremiumChoice from './pages/auth/premium-choice/PremiumChoice.jsx';
import Thanks from './pages/auth/thanks/Thanks.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Logon />} />
        <Route path="inserir-codigo" element={<LogonInsertCode />} />
        <Route path="escolher-plano" element={<PlanChoice />} />
        <Route path="escolher-premium" element={<PremiumChoice />} />
        <Route path="obrigado" element={<Thanks />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
