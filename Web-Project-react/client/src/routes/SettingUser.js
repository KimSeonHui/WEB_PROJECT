import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from '../component/Navbar';
import SettingSidebar from '../component/SettingSidebar';
import UserPage from "../component/UserPage";


function SettingUser() {
    const [session, setSession] = useState({});
    const [users, setUsers] = useState({});
    const [query, setQuery] = useState({});

    const callApi = async () => {
        const res = await axios.get('/setting/user', 
            {params : parseQuery()}
        );
        if(res.statusText === 'OK') {
            console.log('res.data', res.data);
            if(res.data === 'authorityFail') {
                alert('관리자 권한이 필요합니다.');
                window.location.href = '/';
            }
            else if(res.data === 'error') {
                alert('오류가 발생했습니다.');
            }
            else {
                setSession(res.data.session);
                setUsers(res.data.users);
                setQuery(res.data.query);
            }
            
        }
    }

    const parseQuery = () => {
        const qs = window.location.search.substring(1);
        const parse = {};
        const temp = qs.split('&');
        for(let i = 0; i < temp.length; i++) {
            let query = temp[i].split('=');
            if(query[1].includes('%20')) {
                query[1] = query[1].replace('%20', ' ');
            }
            parse[query[0]] = query[1];
        }

        console.log('parse', parse)
        return parse;
    }

    useEffect(() => {
        callApi();
    }, [])

    return <div>
        <Navbar session={session}/>
        <Grid container>
            <Grid item>
                <SettingSidebar sx={{width: '250px', height: '100vh'}}/>
            </Grid>
            <Grid item xs>
                <UserPage users={users} query={query} />
            </Grid>
        </Grid>    
    </div>
}

export default SettingUser;