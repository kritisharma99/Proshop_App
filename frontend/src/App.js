import Container from 'react-bootstrap/Container';
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchBox from './components/searchBox';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserLIstScreen';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
          <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen/>} />
            <Route exact path="/search/:keyword" element={<SearchBox/>} />
            <Route exact path="/product/:id" element={<ProductScreen/>} />
            {/* /cart/:id?  -> by this way we make id optional */}
            <Route exact path="/cart/:id?" element={<CartScreen/>}/>
            <Route exact path="/signIn" element={<LoginScreen/>}/>
            <Route exact path="/register" element={<RegisterScreen/>}/>
            <Route exact path="/profile" element={<ProfileScreen/>}/>
            <Route exact path="/shipping" element={<ShippingScreen/>}/>
            <Route exact path="/payment" element={<PaymentMethodScreen/>}/>
            <Route exact path="/placeorder" element={<PlaceOrderScreen/>}/>
            <Route exact path="/order/:id" element={<OrderScreen/>}/>
            <Route exact path="/page/:pageNumber" element={<HomeScreen/>}/>
            <Route exact path="/search/:keyword/page/:pageNumber" element={<HomeScreen/>}/>
            <Route exact path="/admin/userlist" element={<UserListScreen/>}/>
          </Routes>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
