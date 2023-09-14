import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

import './styled.css';

function Layout() {
  return (
    <div className="AppContainer">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
