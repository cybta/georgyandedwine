import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LovebirdsDashboard from './views/LovebirdsDashbord';

import GuestPage from './views/GuestPage'; // We will create this next
import Home from './views/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Home Route */}
        <Route path='/' element={<Home />} />

        {/* Dynamic route for guests */}
        <Route path='/:id' element={<GuestPage />} />

        {/* Your New Route */}
        <Route path='/lovebirdsDashbord' element={<LovebirdsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
