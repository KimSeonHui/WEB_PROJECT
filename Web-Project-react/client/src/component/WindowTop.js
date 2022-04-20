import { Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

function WindowTop({setClick}) {
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
                company
            </Typography>
            
            <IconButton onClick={closeWindow}>
                <CloseIcon />
            </IconButton >
        </div>
}

export default WindowTop;

 