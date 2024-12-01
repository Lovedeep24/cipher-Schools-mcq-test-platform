import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MediaStreamProvider } from "./Context/MediaStreamContext";
// import ProtectedRoute from './ProtectedRoute';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import Test from './Test';
import Results from './Results';
import Permissions from './Permissions';
import AdminPortal from './AdminPortal';
import AddQuestion from './AddQuestion';
import Submissions from './Submissions';
import TestCluster from './TestCluster';

const App = () => {
  return (
    <MediaStreamProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/permissions" element={<Permissions />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/addquestions" element={<AddQuestion />} />
          <Route path="/submissions" element={<Submissions />} />

            <Route path="/result" element={<Results />} />
            <Route path="/test/:testId" element={<Test />} />
            <Route path="/tests" element={<TestCluster />} />
     
        </Routes>
      </Router>
    </MediaStreamProvider>
  );
};

export default App;
