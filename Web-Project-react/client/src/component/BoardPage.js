import { Box, Typography, Divider, Container, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Table from "./BoardTable";

const theme = createTheme({
    palette: {
      primary: {
          main : '#003964',
      }
    },
  });

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
        <Box sx={{display : 'flex', justifyContent: 'space-between'}} >
            <Typography 
                variant='h5' 
                component="div" 
                gutterBottom
            >
                {selected !== undefined ? selected.name : null}
            </Typography>
            <ThemeProvider theme={theme}>
                <Button 
                    variant="outlined"
                    href="/create"
                    sx={{mb : 1}}
                >
                    글쓰기
                </Button>
            </ThemeProvider>  
        </Box>
       
        <Divider />
        <Table cid={cid}/>

        </Box>
    </Container>
}

export default BoardPage;