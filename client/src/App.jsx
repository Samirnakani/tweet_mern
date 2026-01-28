import Home from "./components/home";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Check from "./components/Check";
import About from "./components/about";
import CreateTweet from "./components/CreateTweet";

const App = () => {
  return (
    <div className="h-full ">
      <Routes >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Check />}>
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateTweet />} />

          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
