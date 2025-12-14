import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatWidget from './components/ChatWidget';
import AdminDashboard from './admin/AdminDashboard';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

function MainPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to our website
          </h1>
          <p className="text-gray-600 mb-8">
            Click the chat button to get assistance!
          </p>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              Our chatbot is here to assist you 24/7. Click the blue chat button
              in the bottom right corner to get started!
            </p>
            <Link 
              to="/admin" 
              className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
        <ChatWidget />
      </div>
    </>
  );
}
