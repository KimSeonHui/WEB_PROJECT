import axios from 'axios';
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

function ReadPage({ curPost, page }) {
    console.log('curPost', curPost);
    const insertDesc = (desc) => {
        document.getElementById('desc').innerHTML = desc;
    }

    const deletePost = async () => {
        if(window.confirm('글을 삭제하시겠습니까?')) {
            const res = await axios.post('/delete', {
                postid : curPost.POSTID,
                bid : curPost.BOARDID,
                uid : curPost.UID
            });
    
            if(res.statusText === 'OK') {
                console.log('res.data', res.data);

                if(res.data === 'delete') {
                    alert('게시글을 삭제했습니다.');
                    window.location.href = `../board/${curPost.BOARDID}/1`;
                }
                else if(res.data === 'notLogined') {
                    alert('로그인 후 이용해 주세요');
                    window.location.href = `../user/login`
                }
                else if(res.data === 'fail')  alert('게시글 삭제에 실패했습니다.');
                else if(res.data === 'infoFail') alert('정보를 불러오지 못했습니다.');
                else alert('권한이 없습니다.');
            }
        }
        else {
            return false;
        }

    }

    return <Container maxWidth="xl">
        <Box sx={{width : "100%", p : '20px'}}>
        <Box sx={{display : 'flex', justifyContent: 'space-between'}} >
            <Typography 
                variant='subtitle1' 
                component="div" 
                gutterBottom
                sx={{color : '#6c757d'}}
            >
                {curPost.NAME !== undefined ? curPost.NAME : ''}
            </Typography>
            <Typography 
                variant='h5' 
                component="div" 
                gutterBottom
                id='title'
            >
               {curPost.TITLE !== undefined ? curPost.TITLE : ''}
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
                        onClick={deletePost}
                        sx={{mb : 1}}
                    >
                        삭제
                    </Button>
                </ButtonGroup>
                
            </ThemeProvider>  
        </Box>
        <Divider />

        <Box component='div' sx={{my : 2}}>
            <Box component='div' id='desc'>
                {curPost.DESCRIPTION !== undefined ? insertDesc(curPost.DESCRIPTION) : ''}
            </Box>
        </Box>
        <Divider />
        <ThemeProvider theme={theme}>
            <ButtonGroup variant="outlined" 
                sx={{mt : 1, display : 'flex', justifyContent : 'flex-end'}} >
                <Button 
                    href={curPost.BOARDID !== undefined && page !== undefined ? `/board/${curPost.BOARDID}/${page}` : ''}
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