import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Audit from './pages/Audit';
import ThankYou from './pages/ThankYou';
import ContactThankYou from './pages/ContactThankYou';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/merci-audit" element={<ThankYou />} />
        <Route path="/merci-contact" element={<ContactThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
