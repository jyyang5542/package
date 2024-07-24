import React from 'react';
import DataList from './DataList';
import './App.css'; // 스타일링을 위한 CSS 파일

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React App</h1>
        <DataList />
      </header>
    </div>
  );
}

export default App;
