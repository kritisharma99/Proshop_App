import Container from 'react-bootstrap/Container';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
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
          </Routes>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
