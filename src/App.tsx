
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DatabaseExport from './pages/database/DatabaseExport';
import DatabaseSchemaCSVPage from './pages/database/DatabaseSchemaCSVPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DatabaseSchemaCSVPage />} />
        <Route path="/database/export" element={<DatabaseExport />} />
        <Route path="/database/schema" element={<DatabaseSchemaCSVPage />} />
      </Routes>
    </Router>
  );
}

export default App;
