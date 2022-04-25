import axios from "axios";
import {useState} from "react";
import { Box, Typography, Divider, Container, Button } from '@mui/material';
import { FormControl, Select, MenuItem, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SummernoteEditor from './SummernoteEditor';

const theme = createTheme({
    palette: {
      primary: {
          main : '#003964',
      }
    },
  });

function CreatePage({category}) {
    const cateArr = Object.values(category);
    const [large, setLarge] = useState('');
    const [medium, setMedium] = useState('');
    const [small, setSmall] = useState('');
    const [isLargeSelected, setLargeSelected] = useState(false);
    const [isMidSelected, setMidSelected] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const handleLarge = (event) => {
        setLarge(event.target.value);
        if(medium !== '') {
            setMedium('');
            setSmall('');
            setMidSelected(false);
        }
        setLargeSelected(true);
    }
    const handleMedium = (event) => {
        setMedium(event.target.value);
        if(small !== '') setSmall('');
        setMidSelected(true);
    }
    const handleSmall = (event) => {
        setSmall(event.target.value);
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit =  async (event) => {
        event.preventDefault();

        const res = await axios.post('/create', {
            categoryLarge : large,
            categoryMedium : medium,
            categorySmall : small,
            Title : title, 
            Desc : desc
        });

        if(res.statusText === 'OK') {
            console.log('res.data', res.data);
            if(res.data === 'error') {
                alert('정보를 불러오지 못 했습니다.');
            }
            else {
                window.location.href = `./read/${res.data.POSTID}`;
            }
        }
    }

    return <Container maxWidth="xl">
    <Box sx={{width : "100%", p : '20px'}}>
    <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{display : 'flex', justifyContent: 'space-between'}} 
    >
        <Typography 
            variant='h5' 
            component="div" 
            gutterBottom
        >
            글쓰기
        </Typography>
        <ThemeProvider theme={theme}>
            <Button type="submit" variant="outlined" sx={{mb : 1}}>등록</Button> 
        </ThemeProvider>  
    </Box>
   
    <Divider sx={{mb : 2}} />
    <FormControl sx={{mb : 2, width: 1/3}}>
        <Select id='large' value={large} onChange={handleLarge} sx={{ mr: 1}} displayEmpty>
            <MenuItem value="">
                <em>카테고리 1 선택</em>
            </MenuItem>
            {cateArr.map((val) => (
                val.level === '0' ? 
                <MenuItem key={val.id} value={val.id} name="large">{val.name}</MenuItem> : null
            ))}
        </Select>
    </FormControl>
    <FormControl sx={{mb : 2, width: 1/3}}>
        <Select id='medium' value={medium} onChange={handleMedium} displayEmpty
            sx={{ mx: 1, visibility : isLargeSelected ? 'visible' : 'hidden'}} >
            <MenuItem value="">
                <em>카테고리 2 선택</em>
            </MenuItem>
            {cateArr.map((val) => (
                val.level === '1' && val.parent === Number(large) ? 
                <MenuItem key={val.id} value={val.id} name="medium">{val.name}</MenuItem> : null
            ))}
        </Select>
    </FormControl>
    <FormControl sx={{mb : 2, width: 1/3}}>
        <Select id='small' value={small} onChange={handleSmall} displayEmpty
            sx={{ ml: 1, visibility : isMidSelected ? 'visible' : 'hidden'}} >
            <MenuItem value="">
                <em>카테고리 3 선택</em>
            </MenuItem>
            {cateArr.map((val) => (
                val.level === '2' && val.parent === Number(medium) ? 
                <MenuItem key={val.id} value={val.id} name="small">{val.name}</MenuItem> : null
            ))}
        </Select>
    </FormControl>
    <TextField 
        id="title" 
        name="title" 
        variant="outlined"
        label="제목"  
        value={title}
        fullWidth 
        sx={{mb : 2}}
        onChange={onChangeTitle}
    />
    <SummernoteEditor setDesc={setDesc}/>
    </Box>
</Container>
}

export default CreatePage;