import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MultiWindowSearch from './MultiWindowSearch';

const style = {
    position : 'fixed',
    right : '30px',
    bottom : '30px',
    width : '350px',
    height : '650px',
    borderRadius : '5%',
    border : '0',
    backgroundColor : '#fff',
    zIndex : '10000',
    boxShadow : '0 1rem 3rem rgba(0, 0, 0, 0.175)' 
}

function MultiWindow({isClicked}) {  
    const [doc, setDoc] = useState(null);
    const frame = document.getElementById('frame');
    let frameDoc = null;
    console.log('frame22', frame);

    useEffect(() => {
        if(frame !== null) {
            frameDoc = frame.contentDocument;
            setDoc(frameDoc);
            console.log('document', frameDoc);

            frameDoc.open();
            frameDoc.write(`<!DOCTYPE html>
            <html><head><meta charset="utf-8"></head>
            <body><div id="multiWindow" name="multiWindow">
                <div id="container" name="container"></div>
            </div></body></html>`);
            frameDoc.close();
        }
    }, [frame]);

    return <Box 
        component='iframe'
        id='frame'
        sx={ isClicked ? {
            display : 'block',
            ...style
        } 
        : {
            display : 'none',
            ...style
        }}
    >
    </Box>

}

export default MultiWindow;