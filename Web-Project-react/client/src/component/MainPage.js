import { Box, Typography, Divider, Container, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Table from "./MainTable";
import FloatingBtn from './FloatingBtn';
import Iframe from './Iframe';
import { useState } from 'react';
import WindowTop from './WindowTop';
import WindowSearch from './WindowSearch';
import WindowTable from './WindowTable';

const theme = createTheme({
    palette: {
      primary: {
          main : '#003964',
      }
    },
});

function Main() {
    const [isClicked, setClick] = useState(false);
    const [isSearching, setSearching] = useState(false);
    const [rows, setRows] = useState([]);

    return <Container maxWidth="xl">
        <Box sx={{width : "100%", p : '20px'}}>
        <Box sx={{display : 'flex', justifyContent: 'space-between'}} >
            <Typography 
                variant='h5' 
                component="div" 
                gutterBottom
            >
                최다 조회 매뉴얼
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
        <Table />

        <FloatingBtn isClicked={isClicked} setClick={setClick}/>
        <Iframe isClicked={isClicked}>
            <WindowTop setClick={setClick} />
           {isSearching ?  <WindowTable rows={rows} setSearching={setSearching}/> 
           : <WindowSearch setSearching={setSearching} setRows={setRows} />  } 
        </Iframe>
        
        </Box>
    </Container>
    
   
}

export default Main;