import {Box, Link, Divider } from '@mui/material';

function Sidebar() {
    return <Box
        sx={{
            width : '250px',
            height : '100vh',
            backgroundColor : '#f8f9fa'
        }}
    >
        <Link
             href="/" 
             underline='none' 
             sx={{
                 color : '#6c757d', 
                 fontSize : '26px', 
                 display : 'flex',
                 justifyContent: 'center',
                 py : '15px',
            }}
        >
            매뉴얼
        </Link>
        <Divider />
        
    </Box>
}

export default Sidebar;