import axios from "axios";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Navbar from "../component/Navbar";
import Sidebar from "../component/Sidebar";
import UpdatePage from "../component/UpdatePage";
import SearchTable from "../component/SearchTable";

function Update() {
    const [categories, setCategory] = useState({});
    const [session, setSession] = useState({});
    const [results, setResult] = useState([]);
    const [contents, setContent] = useState([]);
    const [postCategory, setPostCate] = useState({});
    const {pid} = useParams();

    console.log('pid', pid);

    const callApi = async () => {
        const res = await axios.get(`/update/${pid}`, 
            {params : {postid : pid}}
        );

        if(res.statusText === 'OK') {
            console.log('res.data', res.data);
            setCategory(res.data.category);
            setSession(res.data.session);
            setContent(res.data.content);
            setPostCate(res.data.postCategory);
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
                {results.length > 0 ? <SearchTable results={results}/> : 
                    <UpdatePage contents={contents} postCategory={postCategory} category={categories}/> } 
            </Grid>
        </Grid>    
</div>
}

export default Update;