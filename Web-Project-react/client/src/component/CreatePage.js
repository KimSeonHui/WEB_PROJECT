import {useEffect, useState} from "react";
import { Box, Typography, Divider, Container, Button, ButtonGroup } from '@mui/material';
import { FormControl, Select, MenuItem  } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SummernoteEditor from './SummernoteEditor';

const theme = createTheme({
    palette: {
      primary: {
          main : '#003964',
      }
    },
  });

function CreatePage() {
    const [large, setLarge] = useState('');
    const [medium, setMedium] = useState('');
    const [small, setSmall] = useState('');

    const handleLarge = (event) => {
        setLarge(event.target.value);
    }
    const handleMedium = (event) => {
        setMedium(event.target.value);
    }
    const handleSmall = (event) => {
        setSmall(event.target.value);
    }

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
   
    <Divider sx={{mb : 2}} />
    <FormControl sx={{mb : 2, width: 1/3}}>
        <Select id='large' value={large} onChange={handleLarge} sx={{ mr: 1}} displayEmpty>
            <MenuItem value="">
                <em>카테고리 1 선택</em>
            </MenuItem>
            <MenuItem value="1">one</MenuItem>
        </Select>
    </FormControl>
    <FormControl sx={{mb : 2, width: 1/3}}>
        <Select id='large' value={medium} onChange={handleMedium} sx={{ mx: 1}} displayEmpty>
            <MenuItem value="">
                <em>카테고리 2 선택</em>
            </MenuItem>
        </Select>
    </FormControl>
    <FormControl sx={{mb : 2, width: 1/3}}>
        <Select id='large' value={small} onChange={handleSmall} sx={{ ml: 1}} displayEmpty>
            <MenuItem value="">
                <em>카테고리 3 선택</em>
            </MenuItem>
        </Select>
    </FormControl>
    <SummernoteEditor />
    </Box>
</Container>
}

export default CreatePage;