import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

function WindowTop({setClick ,session}) {
    const closeWindow = () => {
        setClick(false);
    }

    return  <div style=
            {{
                display : 'flex', 
                justifyContent : 'space-between', 
                paddingTop : '8px',
                paddingLeft : '4px', 
                paddingRight : '4px'
            }}
        >
            <Typography 
                variant='h5' 
                component="div" 
            >
                {session !== '' ? session.name : '로그인 해 주세요.'}
            </Typography>
            
            <IconButton id="btnClose" onClick={closeWindow} color='primary'>
                <CloseIcon />
            </IconButton >
        </div>
}

export default WindowTop;

 