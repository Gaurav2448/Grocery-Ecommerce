import {BrowserRouter, Routes,Route} from "react-router-dom";
import {Home} from './pages/Home';
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/admin-layout";
import { AdminUsers } from "./pages/Admin-users";
import { AdminContacts } from "./pages/Admin-contacts";

const App=()=>{
  return <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path="/admin" element={<AdminLayout/>}>
        <Route path='/admin/users' element={<AdminUsers/>}/>
        <Route path='/admin/contacts' element={<AdminContacts/>}/>
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  </>
};

export default App;