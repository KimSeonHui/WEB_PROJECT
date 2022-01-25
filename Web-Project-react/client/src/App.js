import axios from "axios";
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Main from "./component/Main";

function App() {
  const [categories, setCategory] = useState({});

  const callApi = async () => {
    axios.get('/main')
    .then((res) => {
      setCategory(res.data);
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
    <Grid container>
      <Grid item>
        <Sidebar category={categories} sx={{width: '250px', height: '100vh'}}/>
      </Grid>
      <Grid item xs>
       <Main />
      </Grid>
    </Grid>
    
    
    
    
  </div>
}

export default App;
