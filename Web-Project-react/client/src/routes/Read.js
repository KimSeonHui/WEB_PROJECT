import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import ReadPage from "../component/ReadPage";
import { useParams } from "react-router-dom";



function Read() {
    const [categories, setCategory] = useState({});
    const { postId } = useParams();

    const callApi = async () => {
        axios.get(`/read/${postId}`)
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
                <ReadPage />
            </Grid>
    </Grid>    
</div>
}

export default Read;