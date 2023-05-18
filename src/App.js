import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import RequireAuth from './components/HOCs/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route
          path="main"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
