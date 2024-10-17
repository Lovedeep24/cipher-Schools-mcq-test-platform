import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MediaStreamProvider } from "./Context/MediaStreamContext";
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Test from './Test';
import Results from './Results';
import Permissions from './Permissions';
import AdminPortal from './AdminPortal'
import AddQuestion from'./AddQuestion';
import Submissions from'./Submissions';

const App = () => {
  return (
    <MediaStreamProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/results" element={<Results />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="/test" element={<Test />} />
          <Route path="/admin" element={< AdminPortal/>} />
          <Route path="/addquestions" element={<AddQuestion/>} />
          <Route path="/submissions" element={<Submissions/>} />
          <Route path="/" element={<Dashboard />} />
 
        </Routes>
      </Router>
    </MediaStreamProvider>
  );
}

export default App;
