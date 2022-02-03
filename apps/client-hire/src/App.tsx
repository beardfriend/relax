import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Kakao from './pages/kakao';
import Main from './pages/main';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/kakao" element={<Kakao />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
