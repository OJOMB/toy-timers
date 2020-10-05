import React from 'react';
import './App.css';
import MenuTabular from './components/menuTabular'
import TimerDashboard from './components/timerDashboard'

function App() {
  return (
    <div className="App">
      <MenuTabular />
      <TimerDashboard />
    </div>
  );
}

export default App;
