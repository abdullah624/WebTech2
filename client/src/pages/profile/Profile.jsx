import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./profile.css";

export default function Profile() {
  const [file, setFile] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setUpdateMode(false);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setUploadMode(false);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="profile">
      <div className="profileWrapper">
        <dev className="profileInfoContainer">
          <div className="profilePic">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="profilePicIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
                setUploadMode(true);
              }}
            />
            <div className="profileInfo">
              <h1>{user.username}</h1>
              <h4 className="postCounts">Total Posts: 100</h4>
              <h4 className="postCategories">
                Categories: <u className="mouse">Bangladesh</u>{" "}
                <u className="mouse">Cricket</u>
              </h4>
            </div>
            <div className="profileAction">
              {!updateMode ? (
                <button
                  className="mouse"
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdateMode(true);
                  }}
                >
                  <i className="fas fa-pen"></i> Edit Profile
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          {uploadMode ? (
            <button className="uploadPic" onClick={handleUpload}>
              Update
            </button>
          ) : (
            ""
          )}
        </dev>
        {updateMode ? (
          <form className="profileForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="profileSubmit" type="submit">
              Update
            </button>
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
