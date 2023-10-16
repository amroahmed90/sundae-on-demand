import React from 'react';
import './App.css';
import SummaryForm from './pages/summary/SummaryForm';
import Options from './pages/entry/Options';

function App() {
  return (
    <>
      <Options optionType='scoops' />
      <br />
      <br />
      <Options optionType='toppings' />
    </>
  );
}

export default App;
