import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import MainPage from "../component/MainPage";
import SearchTable from "../component/SearchTable";


function MainHome() {
    const [categories, setCategory] = useState({});
    const [session, setSession] = useState({});
    const [results, setResult] = useState([]);

    const callApi = async () => {
        const res = await axios.get('/main');

        if(res.statusText === 'OK') {
            console.log('data', res.data)
            setCategory(res.data.category);
            setSession(res.data.session);
        }
    };

    useEffect(() => {
        callApi();
    }, []);

    return <div>
        <Navbar session={session} setResult={setResult}/>
            <Grid container>
                <Grid item>
                    <Sidebar category={categories} sx={{width: '250px', height: '100vh'}}/>
                </Grid>
                <Grid item xs>
                    {results.length > 0 ? <SearchTable results={results}/> : <MainPage session={session} />} 
                </Grid>
        </Grid>    
  </div>
}

export default MainHome;