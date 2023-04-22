import './App.css';
import {Route, Routes} from "react-router-dom"
import Products from './pages/admin/Products';
import NewProduct from './pages/admin/NewProduct';
import GetProductImage from './pages/admin/GetProductImage';
import EidtProdut from './pages/admin/EidtProdut';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Index from './pages';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Index />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/new-product' element={ <NewProduct />}/>
        <Route path="/image/:id" element={<GetProductImage />}/>
        <Route path='/products-dashbord' element={<Products />} />
        <Route path='/edit-product/:id' element={<EidtProdut />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
