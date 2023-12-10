import React from 'react'
import './App.css';
import WeatherApp from './components/WeatherApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='page'>
      <ToastContainer />
      <WeatherApp />
    </div>
  )
}

export default App;
