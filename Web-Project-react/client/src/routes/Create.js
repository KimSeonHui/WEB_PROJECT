import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import { useParams } from "react-router-dom";
import CreatePage from "../component/CreatePage";

function Create() {
    const [categories, setCategory] = useState({});
    const { cid } = useParams();

    const callApi = async () => {
        axios.get(`/create`)
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
                <Sidebar category={categories}  sx={{width: '250px', height: '100vh'}}/>
            </Grid>
            <Grid item xs>
                <CreatePage />
            </Grid>
    </Grid>    
</div>
}

export default Create;