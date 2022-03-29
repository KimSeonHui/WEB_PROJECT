import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import BoardPage from "../component/BoardPage";
import { useParams } from "react-router-dom";



function Board() {
    const [categories, setCategory] = useState({});
    const [posts, setPosts] = useState({});
    const [session, setSession] = useState({});
    const { cid, page } = useParams();

    const callApi = async () => {
        const res = await axios.get(`/board/${cid}/${page}`);

        if(res.statusText === 'OK') {
            setCategory(res.data.category); 
            setPosts(res.data.post);
            setSession(res.data.session);
        }
    };

    useEffect(() => {
        callApi();
    }, []);


    return <div>
        <Navbar session={session}/>
        <Grid container>
            <Grid item>
                <Sidebar category={categories}  sx={{width: '250px', height: '100vh'}}/>
            </Grid>
            <Grid item xs>
                <BoardPage category={categories} post={posts} cid={cid} page={page}/>
            </Grid>
    </Grid>    
</div>
}

export default Board;