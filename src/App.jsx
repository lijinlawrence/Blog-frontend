import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavigationBar from "./components/NavigationBar";
import NewPost from "./pages/NewPost";
import Settings from "./pages/Settings";
import UserPage from "./pages/UserPage";
import MyArticle from "./pages/MyArticle";
import FavoriteArticels from "./pages/FavoriteArticels";
import UserLayout from "./Layouts/UserLayout";
import ErrorPage from "./pages/ErrorPage";
import SingleArticle from "./pages/SingleArticel";
import EditArticle from "./pages/EditArticle";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/newPost" element={<NewPost />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/user" element={<UserLayout />}>
            <Route index element={<MyArticle />} />
            <Route path="article" element={<MyArticle />} />
            <Route path="favorite" element={<FavoriteArticels />} />
            </Route>
          <Route path="/single/:id" element={<SingleArticle/>}> </Route>
          <Route path="/editArticle/:postId" element={<EditArticle/>}></Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
