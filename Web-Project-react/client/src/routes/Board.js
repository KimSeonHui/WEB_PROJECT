import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import BoardPage from "../component/BoardPage";
import { useParams } from "react-router-dom";



function Board() {
    const [categories, setCategory] = useState({});
    const { cid } = useParams();

    const callApi = async () => {
        axios.get(`/board/:${cid}`)
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
                <BoardPage category={categories} cid={cid}/>
            </Grid>
    </Grid>    
</div>
}

export default Board;