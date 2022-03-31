import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from '../component/Navbar';
import SettingSidebar from '../component/SettingSidebar';
import ManagerPage from '../component/ManagerPage';

function SettingManager() {
    const [session, setSession] = useState({});

    const callApi = async () => {
        const res = await axios.get('/setting');
        if(res.statusText === 'OK') {
            console.log('data', res.data);
            setSession(res.data);
        }
    }

    useEffect(() => {
        callApi();
    }, []);

    return <div>
    <Navbar session={session}/>
        <Grid container>
            <Grid item>
                <SettingSidebar  session={session} sx={{width: '250px', height: '100vh'}}/>
            </Grid>
            <Grid item xs>
                <ManagerPage />
            </Grid>
    </Grid>    
</div>
}

export default SettingManager;