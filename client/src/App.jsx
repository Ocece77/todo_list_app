import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './public_page/Home';
import Login from './public_page/Login';
import Sign from './public_page/Sign';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './private_page/Dashboard';
import NavDashboard from './components/NavDashboard';
import Navbar from './components/Navbar';
import NotFound from './public_page/NotFound';

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const PrivateLayout = () => (
  <>
    <NavDashboard />
    <Outlet />
  </>
);

const App = () => {

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="sign" element={<Sign />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Private routes */}
      <Route path="dashboard" element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
      {/* Redirect any unmatched route to 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
