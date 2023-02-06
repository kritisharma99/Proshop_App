import Container from 'react-bootstrap/Container';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
          <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen/>} />
            <Route exact path="/product/:id" element={<ProductScreen/>} />
            {/* /cart/:id?  -> by this way we make id optional */}
            <Route exact path="/cart/:id?" element={<CartScreen/>}/>
          </Routes>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
