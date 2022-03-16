import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import MainPage from "../component/MainPage";


function MainHome() {
    const [categories, setCategory] = useState({});

    const callApi = async () => {
        const res = await axios.get('/main');

        if(res.statusText === 'OK') {
            setCategory(res.data.category);
        }
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
                    <MainPage />
                </Grid>
        </Grid>    
  </div>
}

export default MainHome;