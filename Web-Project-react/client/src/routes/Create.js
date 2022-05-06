import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useParams } from "react-router-dom";
import CreatePage from "../component/CreatePage";
import SearchTable from "../component/SearchTable";

function Create() {
    const [categories, setCategory] = useState({});
    const [session, setSession] = useState({});
    const [results, setResult] = useState([]);
    const { cid } = useParams();

    const callApi = async () => {
        const res = await axios.get(`/create`);

        if(res.statusText === 'OK') {
            setCategory(res.data.category);
            setSession(res.data.session)
        }
    };

    useEffect(() => {
        callApi();
    }, []);


    return <div>
         <Navbar session={session} setResult={setResult}/>
        <Grid container>
            <Grid item>
                <Sidebar category={categories}  sx={{width: '250px', height: '100vh'}}/>
            </Grid>
            <Grid item xs>
                {results.length > 0 ? <SearchTable results={results}/> :<CreatePage category={categories} /> } 
            </Grid>
    </Grid>    
</div>
}

export default Create;