import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from '../component/Navbar';
import SettingSidebar from '../component/SettingSidebar';
import ManagerPage from '../component/ManagerPage';

function SettingManager() {
    const [session, setSession] = useState({});
    const [manager, setManager] = useState({});

    const callApi = async () => {
        const res = await axios.get('/setting', 
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
                window.location.href = '/setting?order=UID';
            }
            else {
                setSession(res.data.session);
                setManager(res.data.allUser);
            }
        }
    }

    const parseQuery = () => {
        const qs = window.location.search.substring(1);
        const parse = {};
        const temp = qs.split('=');
        for(let i = 0; i < temp.length; i++) {
            parse[temp[0]] = temp[1];
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
                <ManagerPage manager={manager} />
            </Grid>
    </Grid>    
</div>
}

export default SettingManager;