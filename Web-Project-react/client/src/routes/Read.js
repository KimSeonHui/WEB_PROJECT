import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import ReadPage from "../component/ReadPage";
import { useParams } from "react-router-dom";
import SearchTable from "../component/SearchTable";



function Read() {
    const [categories, setCategory] = useState({});
    const [session, setSession] = useState({});
    const [post, setPost] = useState({});
    const [page, setPage] = useState(0);
    const [results, setResult] = useState([]);
    const { postId } = useParams();

    const callApi = async () => {
        const res = await axios.get(`/read/${postId}`);

        if(res.statusText === 'OK') {
            setPost(res.data.post);
            setCategory(res.data.category);   
            setSession(res.data.session);
            setPage(res.data.page);
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
                {results.length > 0 ? <SearchTable results={results}/> : <ReadPage curPost={post} page={page}/>} 
            </Grid>
    </Grid>    
</div>
}

export default Read;