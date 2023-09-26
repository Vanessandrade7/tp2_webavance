import { useState } from 'react';
import './App.css';
import Home from "./components/Home";
import Products from "./components/Products";
import Navbar from './components/Navbar';

const App = () => {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "products":
        return <Products />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navbar setPage={setPage} />
      {renderPage()}
    </div>
  );
};

export default App;