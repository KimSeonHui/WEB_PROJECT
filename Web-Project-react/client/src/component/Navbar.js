import axios from "axios";
import { useEffect ,useState, useRef} from "react";
import { Grid, Button, Menu, MenuItem, Link } from '@mui/material';
import Autocomplete from "./Autocomplete";


function Navbar({session}) {
    const [logined, setLogined] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (e) => {
        setAnchorEl(e.target);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = async () => {
        const res = await axios.get('/user/logout');
        if(res.statusText === 'OK') {
            if(res.data === 'logout') {
                window.location.href = '/user/login'
            }
            else {
                alert('로그인한 상태가 아닙니다')
            }
        }
    }

    const createMenuItem = (authority) => {
        const data = [];
        if(authority < 2) {
            data.push({href : '/user/withdrawal', name : '회원 탈퇴'});
        }
        else {
            data.push({href : `/setting?order=UID`, name : '관리'});
        }

        data.push({href : '/user/changepw', name : '비밀변호 변경'});
        data.push({href : '', onClick : handleLogout, name : '로그아웃'});

        return data;
    }


    useEffect(() => {
        if(session.name !== undefined) {
            setLogined(true);
        }
    }, [session]);

    
    return <Grid container spacing={2} sx={{bgcolor : '#212529', py : '10px'}}>
    <Grid item sx={{width:'250px'}}>
        <Link 
          href='/'
          underline='none'
          sx={{color : '#fff', fontSize : 'h5.fontSize', px : '70px'}}
        >
            Company
        </Link>
    </Grid>
    <Grid item xs sx={{pl: 0}}>
        <Autocomplete />
    </Grid>
    <Grid item xs={1.1}>
        <Button 
            id="btnLogin"
            aria-controls={logined ? 'dropdown' : undefined}
            variant='outlined'
            size='large'
            href={!logined ? "/user/login" : ''}
            onClick={handleClick}
            sx={{
                borderColor: '#fff', 
                color: '#fff', 
                border: 2, 
                fontSize: 15,
                '&:hover' : {
                    borderColor: '#003964',
                    backgroundColor : '#003964',
                    color: '#fff'
                }
             }}
        >
            {!logined ? '로그인' : `${session.name}`}
        </Button>
        <Menu
            id="dropdown"
            aria-labelledby="btnLogin"
            anchorEl={anchorEl}
            autoFocus={false}
            open={open && logined}
            onClose={handleClose}
        >
            {session.authority !== undefined ? createMenuItem(session.authority).map((data) => (
                <MenuItem key={data.name} component="a" href={data.href} onClick={data.onClick !== undefined ? data.onClick : null}>
                    {data.name}
                </MenuItem>
            )) : ''}
        </Menu>
    </Grid>
</Grid>
}

export default Navbar;