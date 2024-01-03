import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddProperty from './pages/AddProperty';
import AllProperties from './pages/AllProperties';
import PropertyView from './components/PropertyView';


function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/register' element={<Login register />} ></Route>
        <Route path='/profile' element={<Profile />} ></Route>
        <Route path='/add-property' element={<AddProperty />} ></Route>
        <Route path='/all-properties' element={< AllProperties/>} ></Route>
        <Route path='/view-property' element={<PropertyView/>} ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
