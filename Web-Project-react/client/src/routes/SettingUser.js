import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from '../component/Navbar';
import SettingSidebar from '../component/SettingSidebar';


function SettingUser() {
    const [session, setSession] = useState({});

    const callApi = async () => {
        const res = await axios.get('/setting/user');
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
            }
            
        }
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
                
            </Grid>
        </Grid>    
    </div>
}

export default SettingUser;