import { Box, Typography, Divider, Container, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Table from "./BoardTable";
import Paginavigation from './Paginavigation';

const theme = createTheme({
    palette: {
      primary: {
          main : '#003964',
      }
    },
  });

function BoardPage({category, cid, page, post}) {
    const [selected, setSelected] = useState({});
    const [posts, setPosts] = useState({});
    const getSelectedCategory = (category, cid) => {
        if(category.length !== undefined) {
            setSelected(category[cid - 1]);
        }
    }

    const getPost = () => {
        if(post.length !== undefined) {
            setPosts(post);
        }
    }

    useEffect(() => {
        getSelectedCategory(category, cid);
        getPost();
    }, [category, post]);
   
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
        <Table cid={cid} page={page}/>

        {post.length !== undefined && post.length !== 0 ? 
            <Paginavigation cid={cid} page={page} post={posts} /> : ''}        

        </Box>
    </Container>
}

export default BoardPage;