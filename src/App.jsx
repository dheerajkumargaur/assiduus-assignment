import { useEffect, useRef } from 'react';
import './index.css'
import NavBar from '@components/NavBar'
import DashBoard from '@views/DashBoard'
import Accounts from '@views/Accounts'
import Paypal from '@views/Paypal'
import Reports from '@views/Reports'
import Advisor from '@views/Advisor'
import Contacts from '@views/Contacts'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import UserInfo from '@data/UserInfo';

function App() {
  return (
    <div className='bg-gray-100'>   
      <NavBar>        
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/Accounts" element={<Accounts />} />
              <Route path="/Paypal" element={<Paypal />} />
              <Route path="/Reports" element={<Reports />} />
              <Route path="/Advisor" element={<Advisor />} />
              <Route path="/Contacts" element={<Contacts />} />              
            </Routes>
          </BrowserRouter>  
          <UserInfo/>         
      </NavBar>
    </div>
  )
}

export default App
