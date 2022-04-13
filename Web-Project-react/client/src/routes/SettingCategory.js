import axios from "axios";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Navbar from '../component/Navbar';
import SettingSidebar from '../component/SettingSidebar';
import CategoryPage from '../component/CategoryPage';

function SettingCategory() {
    const [session, setSession] = useState({});
    const [category, setCategory] = useState({});

    const callApi = async () => {
        const res = await axios.get('/setting/category');
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
                setCategory(res.data.category);
            }
        }
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
                <CategoryPage category={category}/>
            </Grid>
    </Grid>    
</div>
}

export default SettingCategory;