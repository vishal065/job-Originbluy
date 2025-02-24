import { ToastContainer } from "react-toastify";
import "./App.css";
import RootRouting from "./routes";

function App() {
  return (
    <div>
      <RootRouting />
      <ToastContainer />
    </div>
  );
}

export default App;
