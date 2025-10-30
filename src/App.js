import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import ITInfrastructure from './pages/services/ITInfrastructure';
import CloudMigration from './pages/services/CloudMigration';
import SecurityCompliance from './pages/services/SecurityCompliance';
import ManagedIT from './pages/services/ManagedIT';
import TechConsulting from './pages/services/TechConsulting';
import DataAnalytics from './pages/services/DataAnalytics';
import TechnicalTutorials from './pages/blogs/TechnicalTutorials';
import IndustryInsights from './pages/blogs/IndustryInsights';
import CaseStudies from './pages/blogs/CaseStudies';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/technical-tutorials" element={<TechnicalTutorials />} />
          <Route path="/blog/industry-insights" element={<IndustryInsights />} />
          <Route path="/blog/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
            <Route path="/services/it-infrastructure" element={<ITInfrastructure />} />
            <Route path="/services/cloud-migration" element={<CloudMigration />} />
            <Route path="/services/security-compliance" element={<SecurityCompliance />} />
            <Route path="/services/managed-it" element={<ManagedIT />} />
            <Route path="/services/tech-consulting" element={<TechConsulting />} />
            <Route path="/services/data-analytics" element={<DataAnalytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;