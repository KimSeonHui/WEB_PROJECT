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
            console.log('data', res.data);
            setSession(res.data.session);
            setManager(res.data.allUser);
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
                <SettingSidebar  session={session} sx={{width: '250px', height: '100vh'}}/>
            </Grid>
            <Grid item xs>
                <ManagerPage manager={manager} />
            </Grid>
    </Grid>    
</div>
}

export default SettingManager;