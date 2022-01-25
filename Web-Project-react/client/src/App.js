import axios from "axios";
import {useEffect, useState} from "react";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Main from "./component/Main";

function App() {
  const [categories, setCategory] = useState({});

  const callApi = async () => {
    axios.get('/main')
    .then((res) => {
      setCategory(res.data.result);
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
    <Sidebar category={categories}/>
    <Main />
    
    
  </div>
}

export default App;
