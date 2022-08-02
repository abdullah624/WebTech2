import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import CreatePost from "./pages/createpost/CreatePost";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";

function App() {
  const currentUser = true;
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/posts" element={<Homepage />} />
        <Route
          exact
          path="/register"
          element={currentUser ? <Homepage /> : <Register />}
        />
        <Route
          exact
          path="/login"
          element={currentUser ? <Homepage /> : <Login />}
        />
        <Route exact path="/post/:id" element={<Single />} />
        <Route
          exact
          path="/create_post"
          element={currentUser ? <CreatePost /> : <Login />}
        />
        <Route
          exact
          path="/profile"
          element={currentUser ? <Profile /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
