import { Box } from '@mui/material';

function MultiWindow() {

    return <Box 
        component='iframe'
        sx={{
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
        }}
    >

    </Box>

}

export default MultiWindow;