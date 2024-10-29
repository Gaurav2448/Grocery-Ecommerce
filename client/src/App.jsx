import {BrowserRouter, Routes,Route} from "react-router-dom";
import {Home} from './pages/Home';
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/admin-layout";
import { AdminUsers } from "./pages/Admin-users";
import { AdminContacts } from "./pages/Admin-contacts";
import { AdminItem } from "./pages/Admin-item";
import { AdminAddItem } from "./pages/Admin-additem";
import { Grocery } from "./pages/Grocery";
import { CartPage } from "./pages/CartPage";

const App=()=>{
  return <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/grocery' element={<Grocery/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path="/admin" element={<AdminLayout/>}>
        <Route path='/admin/users' element={<AdminUsers/>}/>
        <Route path='/admin/contacts' element={<AdminContacts/>}/>
        <Route path='/admin/items' element={<AdminItem/>}/>
        <Route path='/admin/additems' element={<AdminAddItem/>}/>
          
        </Route>
        
      </Routes>
    </BrowserRouter>
  </>
};

export default App;