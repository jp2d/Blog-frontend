import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostListPage from "././modules/posts/pages/PostListPage";
import PostCrudPage from "././modules/posts/pages/PostCrudPage";
import UserCrudPage from "././modules/user/page/UserCrudPage";
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import Navbar from "./shared/NavBar";
import { AuthProvider } from "./core/AuthContext";
import Header from "./shared/Header";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/postsCrud" element={<PostCrudPage />} />
          <Route path="/users" element={<UserCrudPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;