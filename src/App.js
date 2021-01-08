//import logo from "./logo.svg";
import "./App.css";
import Get from "./components/get";
import Post from "./components/post";
//import Put from "./components/put";

function App() {
  return (
    <div>
      <li>
        Get Method
        <Get />
      </li>
      <li>Post method</li>
      <Post />
    </div>
  );
}

export default App;
