import './App.css';
import {Route, Routes} from "react-router-dom"
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import GetProductImage from './pages/GetProductImage';
import EidtProdut from './pages/EidtProdut';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/products' element={<Products />}/>
        <Route path='/new-product' element={ <NewProduct />}/>
        <Route path="/image/:id" element={<GetProductImage />}/>
        <Route path='/products-dashbord' element={<Products />} />
        <Route path='/edit-product/:id' element={<EidtProdut />} />
      </Routes>
    </div>
  );
}

export default App;
