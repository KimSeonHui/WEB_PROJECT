import axios from "axios";
import { useEffect ,useState, useRef, forwardRef} from "react";
import {  InputBase, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ulStyles = {
    display : 'none',
    position : 'absolute',
    zIndex : 1000,
    listStyle : 'none',
    backgroundColor : '#fff',
    border : '1px solid rgba(0, 0, 0, 0.15)',
    borderRadius : '0.5rem',
    color : '#000',
}

const liStyle = {
    display : 'block',
    padding : '0.5rem 1rem'
}


function Autocomplete({isMulti, setKeyword, multiBtn, setResult}, ref) {
    const [word, setWord] = useState('');
    const [targetNum , setNum] = useState(-1);
    const [autoData, setAuto] = useState([]);
    const [isClicked , setClick] = useState(false);

    const ul = useRef(null);
    const submitBtn = useRef(null);

    const onChange = (e) => {
        if(isMulti) {
            setKeyword(e.target.value);
        }
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

    const addClick = (e) => {
        if(!isMulti) {
            setWord(e.target.innerText);
        }
        else {
            setKeyword(e.target.innerText);
        }        
        setClick(true);     
    }

    useEffect(() => {
        if(isClicked && !isMulti) {
            submitBtn.current.click();
        }
        else if(isClicked && isMulti) {
            multiBtn.current.click();
        }

        setClick(false);
    }, [isClicked]);

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
                if(res.data.length === 0) {
                    alert('검색 결과가 없습니다.');
                }
                else {
                    setResult(res.data);
                }
            }
        }
    }

    return <div ref={ref}>
        <Paper 
            component="div"
            sx={{ 
                p: '2px 4px', 
                display: 'flex',
                alignItems: 'center', 
                border : 1, 
                borderRadius: '6px', 
                borderColor : '#d3d3d3',
                boxShadow : 0
            }}
        >
            <InputBase
                sx={{ml: 2, flex: 1}}
                placeholder="Search"
                value={word}
                inputProps={{className : 'autoComplete'}}
                onChange={onChange}
                onKeyUp={autoComplete}
            />
            {isMulti ? null : 
                <IconButton variant='outlined' type="button" onClick={search} ref={submitBtn}>
                    <SearchIcon />
                </IconButton>
            }
        
        </Paper>
        <ul ref={ul}
            style={!isMulti ? {
                ...ulStyles,
                fontSize : '1.2rem',
                padding : '0.5rem 1rem'
            } : {
                ...ulStyles,
                fontSize : '0.7rem',
                padding : '0.25rem 0rem',
                marginTop : '0px'
            }}    
        >
            {autoData.length < 0 ? null : autoData.map((data, index) => {

                if(isMulti) {
                    liStyle.padding = '0.25rem 1rem';
                }

                if(targetNum === index && word !== data.TITLE) {
                    setWord(data.TITLE);
                }

                return <li key={data.POSTID}
                    style={targetNum === index ? {
                       ...liStyle,
                       backgroundColor : '#e9ecef'
                    } : {
                        ...liStyle,
                        backgroundColor : '#fff'
                    }}
                    onClick={addClick}
                >
                    {data.TITLE}
                </li>
            })}
        </ul>
    </div>
}

export default forwardRef(Autocomplete);