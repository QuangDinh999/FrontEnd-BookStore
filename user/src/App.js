import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './Web/Index'
import ProductDetail from './Web/ProductDetail/ProductDetail'
import Cart from './Web/Cart/Cart'
import Login from './Web/Login/Login'
import CheckOut from './Web/CheckOut/CheckOut'
import BookByCategory from './Web/Shop/BookByCategory';
import BookByPublisher from './Web/Shop/BookByPublisher';
import BookBySearch from './Web/Shop/BookBySearch';
import Register from './Web/Login/Register';
import Thanks from './Web/CheckOut/Thanks';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Wrap Routes around Route components */}
          <Route path="/" element={<Index />} /> {/* Use 'element' prop instead of 'component' */}
          <Route path="/BookByCategory" element={<BookByCategory />} />
          <Route path="/BookByPublisher" element={<BookByPublisher />} />
          <Route path="/BookBySearch" element={<BookBySearch />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
