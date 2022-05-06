import { Typography, Button, Box } from '@mui/material';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Autocomplete from './Autocomplete';

function WindowSearch({setSearching, setRows}) {
    const [keyword, setKeyword] = useState('');
    const multiBtn = useRef(null);

    const search = async () => {
        console.log('submit')
        const res = await axios.get('/search/multi', 
            {params : {key : keyword}}
        );

        if(res.statusText === 'OK') {
            console.log('res.data', res.data);

            if(res.data === 'error') {
                alert('오류가 발생했습니다.');
            }
            else {
                setSearching(true);
                setRows(res.data);
            }
        }
    }

    return  <Box
            component='div' 
            sx={{
                boxShadow : '0 0.5rem 1rem rgba(0, 0, 0, 0.15)', 
                justifyContent : 'space-between', 
                borderRadius : '5%',
                px : '4px',
                mt : 2
            }}
        >
            <Typography 
                variant='h6' 
                component="div" 
                sx={{
                    pt : 2
                }}
            >
                검색
            </Typography>
                <Autocomplete isMulti={true} setKeyword={setKeyword} multiBtn={multiBtn}/>
            <Button 
                ref={multiBtn}
                variant='contained'
                type='submit'
                onClick={search}
                sx={{
                    width : '100%',
                    my : 2,
                    backgroundColor : '#003565'
                }}
            >
                Search
            </Button>
        </Box>
}

export default WindowSearch;

 