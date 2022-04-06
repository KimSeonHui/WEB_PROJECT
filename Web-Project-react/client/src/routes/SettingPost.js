import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from '../component/Navbar';
import SettingSidebar from '../component/SettingSidebar';
import PostPage from '../component/PostPage';

function SettingPost() {
    const [session, setSession] = useState({});
    const [post, setPost] = useState({});

    const callApi = async () => {
        parseQuery();
        const res = await axios.get('/setting/post', 
            {params : parseQuery()}
        );
        if(res.statusText === 'OK') {
            console.log('res.data', res.data);
            if(res.data === 'authorityFail') {
                alert('관리자 권한이 필요합니다.');
                window.location.href = '/';
            }
            else {
                setSession(res.data.session);
                setPost(res.data.post);
            }
            
        }
    }

    const parseQuery = () => {
        const qs = window.location.search.substring(1);
        const parse = {};
        const temp = qs.split('&');
        for(let i = 0; i < temp.length; i++) {
            let query = temp[i].split('=');
            parse[query[0]] = query[1];
        }

        console.log('parse', parse)
        return parse;
    }

    useEffect(() => {
        callApi();
    }, []);


    return <div>
        <Navbar session={session}/>
        <Grid container>
            <Grid item>
                <SettingSidebar sx={{width: '250px', height: '100vh'}}/>
            </Grid>
            <Grid item xs>
                <PostPage posts={post}/>
            </Grid>
    </Grid>    
</div>
}

export default SettingPost;