import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header, Footer } from './components/layout';
import { Text } from './components/common';
import { ROUTES, TOAST_OPTIONS } from './utils/constants';
import 'react-toastify/dist/ReactToastify.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Temporary placeholder pages
const HomePage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <Text variant="h1" className="mb-4" center>
        Welcome to Salon Booking
      </Text>
      <Text variant="body-lg" color="muted" className="mb-8" center>
        Book your beauty appointments with ease
      </Text>
      <div className="inline-flex gap-4">
        <a
          href={ROUTES.SERVICES}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          Browse Services
        </a>
        <a
          href={ROUTES.REGISTER}
          className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors"
        >
          Sign Up
        </a>
      </div>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Text variant="h2" className="mb-8">Our Services</Text>
      <Text color="muted">Services page coming soon...</Text>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Text variant="h2" className="mb-8">About Us</Text>
      <Text color="muted">About page coming soon...</Text>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Text variant="h2" className="mb-8">Contact Us</Text>
      <Text color="muted">Contact page coming soon...</Text>
    </div>
  </div>
);

const BookingHistoryPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Text variant="h2" className="mb-8">My Bookings</Text>
      <Text color="muted">Booking history coming soon...</Text>
    </div>
  </div>
);

const ProfilePage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Text variant="h2" className="mb-8">My Profile</Text>
      <Text color="muted">Profile page coming soon...</Text>
    </div>
  </div>
);

const LoginPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <Text variant="h3" className="mb-6">Login</Text>
      <Text color="muted">Login page coming soon...</Text>
    </div>
  </div>
);

const RegisterPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <Text variant="h3" className="mb-6">Sign Up</Text>
      <Text color="muted">Registration page coming soon...</Text>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path={ROUTES.BOOKING_HISTORY} element={<BookingHistoryPage />} />
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer {...TOAST_OPTIONS} />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
