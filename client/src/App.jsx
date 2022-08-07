import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import CreatePost from "./pages/createpost/CreatePost";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        {/* <Route path="/posts" element={<Homepage />} /> */}
        <Route
          path="/register"
          element={user ? <Homepage /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Homepage /> : <Login />}
        />
        <Route path="/post/:id" element={<Single />} />
        <Route
          path="/createpost"
          element={user ? <CreatePost /> : <Login />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
