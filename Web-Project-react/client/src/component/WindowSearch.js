import { Typography, InputBase, Button } from '@mui/material';
import React, { useState } from 'react';

function WindowSearch() {
    const [word, setWord] = useState('');
    const onChange = (e) => {
        setWord(e.target.value)
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

 