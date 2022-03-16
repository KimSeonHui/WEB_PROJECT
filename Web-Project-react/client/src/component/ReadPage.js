import { Box, Typography, Divider, Container, Button, ButtonGroup  } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const theme = createTheme({
    palette: {
      primary: {
          main : '#003964',
      }
    },
  });

function ReadPage({ curPost }) {

    return <Container maxWidth="xl">
        <Box sx={{width : "100%", p : '20px'}}>
        <Box sx={{display : 'flex', justifyContent: 'space-between'}} >
            <Typography 
                variant='subtitle1' 
                component="div" 
                gutterBottom
                sx={{color : '#6c757d'}}
            >
                {curPost[0] !== undefined ? curPost[0].NAME : ''}
            </Typography>
            <Typography 
                variant='h5' 
                component="div" 
                gutterBottom
                id='title'
            >
               {curPost[0] !== undefined ? curPost[0].TITLE : ''}
            </Typography>
            <ThemeProvider theme={theme}>
                <ButtonGroup variant="outlined" >
                    <Button 
                        href="/update"
                        sx={{mb : 1}}
                    >
                        수정
                    </Button>
                    <Button 
                        href="#"
                        sx={{mb : 1}}
                    >
                        삭제
                    </Button>
                </ButtonGroup>
                
            </ThemeProvider>  
        </Box>
        <Divider />

        <Box sx={{my : 2, textAlign : 'center'}}>
            {curPost[0] !== undefined ? curPost[0].DESCRIPTION : ''}
        </Box>
        <Divider />
        <ThemeProvider theme={theme}>
            <ButtonGroup variant="outlined" 
                sx={{mt : 1, display : 'flex', justifyContent : 'flex-end'}} >
                <Button 
                    href="#"
                    sx={{mb : 1}}
                >
                    목록
                </Button>
                <Button 
                    href="#title"
                    sx={{mb : 1, pr : 1}}
                >
                    top <ArrowDropUpIcon sx={{px : 0}}/>
                </Button>
            </ButtonGroup>
                
        </ThemeProvider>  

        </Box>
    </Container>
    
   
}

export default ReadPage;