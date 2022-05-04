import axios from "axios";
import { useEffect ,useState, useRef} from "react";
import { Grid, Button, InputBase, Paper, IconButton, Typography, Menu, MenuItem, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


function Navbar({session}) {
    const [word, setWord] = useState('');
    const [logined, setLogined] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const ul = useRef(null);
    const html = document.getElementsByTagName('html')[0];
    const submitBtn = useRef(null);

    const [autoData, setAuto] = useState([]);
    const [targetNum , setNum] = useState(-1);
    const [isClicked , setClick] = useState(false);

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

    const onChange = (e) => {
        setWord(e.target.value);
    }

    
    const autoComplete = async (e) => {
        console.log('e.key', e.key);

        if(e.key === 'ArrowUp') {
            if(targetNum === 0) {
                setNum(ul.current.children.length - 1);
            }
            else {
                setNum((num) => num - 1);
            }
        }
        else if(e.key === 'ArrowDown') {
            if(targetNum === ul.current.children.length - 1) {
                setNum(0);
            }
            else {
                setNum((num) => num + 1);
            }
        }
        else {
            setNum(-1);

            const res = await axios.get('/search/auto', {
                params : {key : word}}
            );
    
            if(res.statusText === 'OK') {
                console.log('auto data', res.data);
    
                if(res.data === 'error') {
                    alert('오류가 발생했습니다.');
                }
                else {
                    if(res.data.length > 0) {
                        setAuto(res.data);
                    }
                    else {
                        setAuto([{TITLE : word, POSTID : 999999}]);
                    }
                    toggleUI();
                }
            }
        }
    }

    const addClick = (e) => {
        setWord(e.target.innerText);
        setClick(true);     
    }

    useEffect(() => {
        if(isClicked) {
            submitBtn.current.click();
        }

        setClick(false);
    }, [isClicked]);

    const toggleUI = () => {
        if(word === '') {
            ul.current.style.display = 'none';
            setNum(-1);
            setAuto([]);
        }
        else {
            ul.current.style.display = 'block';
            ul.current.style.width = `${ul.current.previousElementSibling.offsetWidth}px`;
        }
    }

    const search = async () => {
        const res = await axios.get('/search', 
            {params : {key : word}}
        );

        if(res.statusText === 'OK') {
            console.log('search', res.data);

            if(res.data === 'error') {
                alert('오류가 발생했습니다.');
            }
            else {
                console.log('검색 완료');
            }
        }
    }

    html.addEventListener('click', (e) => {
        if(!e.target.classList.contains('autoComplete')) {
            ul.current.style.display = 'none';
            setNum(-1);
            setAuto([]);
        }
    })
    
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
        <Paper 
            component="div"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
        >
            <InputBase
                className="autoComplete"
                sx={{ ml: 2, flex: 1 }}
                placeholder="Search"
                value={word}
                inputProps={{className : 'autoComplete'}}
                onChange={onChange}
                onKeyUp={autoComplete}
            />
            <IconButton variant='outlined' type="button" onClick={search} ref={submitBtn}>
                <SearchIcon />
            </IconButton>
        </Paper>
        <ul  className="autoComplete" ref={ul}
            style={{
                display : 'none',
                position : 'absolute',
                zIndex : 1000,
                listStyle : 'none',
                backgroundColor : '#fff',
                border : '0.125rem solid rgba(0, 0, 0, 0.15)',
                borderRadius : '0.5rem',
                color : '#000',
                fontSize : '1.2rem',
                padding : '0.5rem 1rem'
            }}    
        >
            {autoData.length < 0 ? null : autoData.map((data, index) => {
                const styles = {
                    display : 'block',
                    width : '100%',
                    padding : '0.5rem 1rem'
                }

                if(targetNum === index && word !== data.TITLE) {
                    setWord(data.TITLE);
                }

                return <li key={data.POSTID} className="autoComplete"
                    style={targetNum === index ?{
                       ...styles,
                       backgroundColor : '#e9ecef'
                    } : {
                        ...styles,
                        backgroundColor : '#fff'
                    }}
                    onClick={addClick}
                >
                    {data.TITLE}
                </li>
            })}
        </ul>
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