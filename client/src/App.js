import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './component/layout/Layout';
import IndexPage from './pages/indexpage/IndexPage';
import LoginPage from './pages/loginpage/LoginPage';
import Register from './pages/loginpage/Register';
import { UserContextProvider } from './context/UserContext';
import Create from './pages/create/Create';
import Postpage from './pages/postpage/Postpage';
import Editpost from './pages/editpost/Editpost';



function App() {
  return (
    <UserContextProvider>
 <Routes>
 <Route path="/" element={<Layout/>}> 
    <Route index element={<IndexPage/>} />
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/create" element={<Create/>}/>
    <Route path="/post/:id" element={<Postpage/>}/>
    <Route path='/edit/:id' element={<Editpost/>}/>
    </Route>
 </Routes>
 </UserContextProvider>
  );
}

export default App;
