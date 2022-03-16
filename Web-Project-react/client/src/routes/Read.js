import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import ReadPage from "../component/ReadPage";
import { useParams } from "react-router-dom";



function Read() {
    const [categories, setCategory] = useState({});
    const [post, setPost] = useState({});
    const { postId } = useParams();

    const callApi = async () => {
        const res = await axios.get(`/read/${postId}`);

        if(res.statusText === 'OK') {
            setPost(res.data.post);
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
                <Sidebar category={categories}  sx={{width: '250px', height: '100vh'}}/>
            </Grid>
            <Grid item xs>
                <ReadPage curPost={post}/>
            </Grid>
    </Grid>    
</div>
}

export default Read;