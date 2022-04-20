import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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

function Iframe({children, isClicked}) {
    const [contentRef, setContentRef] = useState(null);

    const frame = document.getElementById('frame');
    let frameDoc = null;
    
    useEffect(() => {
        if(frame !== null) {
            frameDoc = frame.contentDocument;
            frameDoc.open();
            frameDoc.write(`<!DOCTYPE html>
            <html><head><meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body><div id="multiWindow" name="multiWindow">
                <div id="container" name="container"></div>
            </div></body></html>`);

            frameDoc.close();
        }
    }, [frame]);

    const mountNode = contentRef?.contentWindow?.document?.getElementById('container')

    return <Box 
            component='iframe'
            id='frame'
            ref={setContentRef}
            sx={ isClicked ? {
                display : 'block',
                ...style
            } 
            : {
                display : 'none',
                ...style
            }}
        >
            {mountNode && createPortal(children, mountNode)}
        </Box> 

}

export default Iframe;