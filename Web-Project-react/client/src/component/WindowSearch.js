import { Typography, InputBase, Button } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

function WindowSearch() {
    const [word, setWord] = useState('');
    const onChange = (e) => {
        setWord(e.target.value)
    }

    const search = async () => {
        console.log('submit')
        const res = await axios.get('/search/multi', 
            {params : {key : word}}
        );

        if(res.statusText === 'OK') {
            console.log('res.data', res.data);

            if(res.data === 'error') {
                alert('오류가 발생했습니다.');
            }
            else {
                //검색 결과 보여주기
            }
        }
    }

    return  <div style=
            {{
                boxShadow : '0 0.5rem 1rem rgba(0, 0, 0, 0.15)', 
                justifyContent : 'space-between', 
                width : '100%',
                borderRadius : '5%',
                marginTop : '8px',
                marginBottom : '8px',
                marginRight: 'auto',
                marginLeft: 'auto'
            }}
        >
            <Typography 
                variant='h6' 
                component="div" 
            >
                검색
            </Typography>
            
            <InputBase 
                name="key"
                placeholder='Search'
                value={word}
                onChange={onChange}
                sx={{
                    width : '100%',
                    border : 1, 
                    borderRadius: '6px', 
                    borderColor : '#d3d3d3',
                    py : 1.5,
                    pl : 1
                }}
            />
            <Button 
                variant='contained'
                type='submit'
                onClick={search}
                sx={{
                    width : '100%',
                    mb : 2,
                    backgroundColor : '#003565'
                }}
            >
                Search
            </Button>
        </div>
}

export default WindowSearch;

 