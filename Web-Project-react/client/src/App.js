import axios from "axios";
import {useEffect} from "react";
import Navbar from "./component/Navbar";

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

  return (
   <Navbar></Navbar>
  );
}

export default App;
