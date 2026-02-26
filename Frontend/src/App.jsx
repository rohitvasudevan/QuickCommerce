import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import OrderStatus from './pages/OrderStatus';


export default function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/cart" element={<Cart />} />
<Route path="/order/:id" element={<OrderStatus />} />
</Routes>
</BrowserRouter>
);
}