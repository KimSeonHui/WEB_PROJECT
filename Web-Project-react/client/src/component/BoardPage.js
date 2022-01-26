import { Box, Typography, Divider, Container   } from '@mui/material';
import Table from "./BoardTable";

function BoardPage() {

    return <Container maxWidth="xl">
        <Box sx={{width : "100%", p : '20px'}}>
        <Typography 
            variant='h5' 
            component="div" 
            gutterBottom
        >
            카테고리 이름
        </Typography>
        <Divider />
        <Table />

        </Box>
    </Container>
}

export default BoardPage;