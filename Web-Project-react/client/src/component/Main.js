import { Box, Typography, Divider, Container   } from '@mui/material';
import Table from "./TableTemplete";

function Main() {
    return <Container maxWidth="xl">
        <Box sx={{width : "100%", p : '20px'}}>
        <Typography 
            variant='h5' 
            component="div" 
            gutterBottom
        >
            최다 조회 매뉴얼
        </Typography>
        <Divider />
        <Table />

        </Box>
    </Container>
    
   
}

export default Main;