import { Box, Typography, Divider, Container   } from '@mui/material';
import { useState, useEffect } from 'react';
import Table from "./BoardTable";


function BoardPage({category, cid}) {
    const [selected, setSelected] = useState({});
    const getSelectedCategory = (category, cid) => {
        if(category !== {}) {
            setSelected(category[cid - 1]);
        }
    }

    useEffect(() => {
        getSelectedCategory(category, cid);
    }, [category]);
   
    return <Container maxWidth="xl">
        <Box sx={{width : "100%", p : '20px'}}>
        <Typography 
            variant='h5' 
            component="div" 
            gutterBottom
        >
            {selected !== undefined ? selected.name : null}
        </Typography>
        <Divider />
        <Table cid={cid}/>

        </Box>
    </Container>
}

export default BoardPage;