import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Layout from "./UI/Layout";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
      <Layout>
<Routes>
  <Route path="/" element={<ProductList />} />
  <Route path="/add-product" element={<AddProduct />} />
</Routes>
      </Layout>
  );
}

export default App;
