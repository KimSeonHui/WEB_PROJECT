import { Box, Typography, Divider, Container, Button, ButtonGroup } from '@mui/material';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
          main : '#003964',
      }
    },
  });

function CreatePage() {

    return <Container maxWidth="xl">
    <Box sx={{width : "100%", p : '20px'}}>
    <Box sx={{display : 'flex', justifyContent: 'space-between'}} >
        <Typography 
            variant='h5' 
            component="div" 
            gutterBottom
        >
            글쓰기
        </Typography>
        <ThemeProvider theme={theme}>
            <ButtonGroup variant="outlined" sx={{mb : 1}}>
                <Button href="#update">수정</Button>
                <Button >삭제</Button>
            </ButtonGroup>    
        </ThemeProvider>  
    </Box>
   
    <Divider />

    </Box>
</Container>
}

export default CreatePage;