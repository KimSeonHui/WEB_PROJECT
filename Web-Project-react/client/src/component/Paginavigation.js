import { Box, Pagination } from '@mui/material';
import axios from "axios";

function Paginavigation() {

    return <Box sx={{display : 'flex', justifyContent : 'center', mt: 6 }}>
        <Pagination 
            count={10} 
            shape="rounded" 
            color='info'
            hidePrevButton 
            hideNextButton 
            showFirstButton 
            showLastButton
            boundaryCount={5}
        />
    </Box>
}

export default Paginavigation;