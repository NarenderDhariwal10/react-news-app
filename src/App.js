
import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';



export class App extends Component {
 
  render() {
    return (
      <div>
        <Router>
           <NavBar/>
           <Routes>
                <Route path="/" element={<News key="general" pageSize={5} country="us" category="general" />} />
                <Route path="/science" element={<News key="science" pageSize={5} country="us" category="science" />} />
                <Route path="/business" element={<News key="business" pageSize={5} country="us" category="business" />} />
                <Route path="/entertainment" element={<News key="entertainment" pageSize={5} country="us" category="entertainment" />} />
                <Route path="/general" element={<News key="general" pageSize={5} country="us" category="general" />} />
                <Route path="/health" element={<News key="health" pageSize={5} country="us" category="health" />} />
                <Route path="/sports" element={<News key="sports" pageSize={5} country="us" category="sports" />} />
                <Route path="/technology" element={<News key="technology" pageSize={5} country="us" category="technology" />} />
           </Routes>
         </Router>
      </div>
    )
  }
}


export default App;
