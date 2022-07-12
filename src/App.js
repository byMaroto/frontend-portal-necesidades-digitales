import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import ServicePage from "./pages/ServicePage";
import ServicesPage from "./pages/ServicesPage";
import RegisterNewServicePage from "./pages/RegisterNewServicePage";
import ProfilePage from "./pages/ProfilePage";
import CheckMyServicesPage from "./pages/CheckMyServicesPage";
import CheckEmailPage from "./pages/CheckEmailPage";
import useUser from "./hooks/useUser";

function App() {
  const { user, setUser } = useUser();
  return (
    <BrowserRouter>
      <Header user={user} />
      <main>
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/services" element={<RegisterNewServicePage />} />
          <Route path="/service/:serviceId" element={<ServicePage />} />
          <Route path="/users" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/user"
            element={<ProfilePage user={user} setUser={setUser} />}
          />
          <Route path="/myservices" element={<CheckMyServicesPage />} />
          <Route path="/checkemail" element={<CheckEmailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastContainer position="bottom-center" />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
