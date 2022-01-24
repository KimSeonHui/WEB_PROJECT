import axios from "axios";
import {useEffect} from "react";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";

function App() {
  const callApi = async () => {
    axios.get('/main')
    .then((res) => {
      console.log(res.data.test);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    callApi();
  }, []);

  return <div>
    <Navbar />
    <Sidebar />
  </div>
}

export default App;
