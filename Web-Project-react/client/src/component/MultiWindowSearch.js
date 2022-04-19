import ReactDOM from 'react-dom'
import { Typography, IconButton  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function MultiWindowSearch({frameDoc}) {
    let ele = null;
    console.log('frameDoc', frameDoc)

    if(frameDoc !== null) {
        const children = 
            <div style=
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
                   
                <IconButton >
                    <CloseIcon />
                </IconButton >
            </div>
            
        ele = frameDoc.querySelector('#container');

        console.log('ele', ele)
        return ReactDOM.createPortal(children, ele) ;
    }

    return null;

}

export default MultiWindowSearch;

 