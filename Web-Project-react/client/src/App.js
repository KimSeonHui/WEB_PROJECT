import './App.css';
import axios from "axios";
import {useEffect} from "react";

function App() {
  const callApi = async () => {
    axios.get('/api')
    .then((res) => {
      console.log(res.data.test)
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
   <div>test</div>
  );
}

export default App;
