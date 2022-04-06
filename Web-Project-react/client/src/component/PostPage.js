import axios from 'axios';
import {useState} from 'react';
import { Box, Typography, Divider, Container, Button, Select, MenuItem, TableCell, tableCellClasses } from '@mui/material';
import { Grid, InputBase, Paper, TableContainer , Table, TableHead, Link } from '@mui/material';
import {TableRow, TableBody, styled, Checkbox } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#003964',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)' : {
        backgroundColor : '#eceff1'
    }
}));

function PostPage({posts}) {

    return <Container maxWidth="xl">
    <Box sx={{width : "100%", p : '20px'}}>
    <Box sx={{display : 'flex', justifyContent: 'space-between'}} >
        <Typography 
            variant='h5' 
            component="div" 
            gutterBottom
        >
            게시글 관리
        </Typography>
    </Box>
    <Divider />

    <div style={{marginTop : '2em'}}>
    <Typography 
        variant='h5' 
        component="h5" 
        gutterBottom
    >
        전체 게시글 조회
    </Typography>
    <Button
            variant='outlined'
            type='button'
            disabled={true}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            공개
        </Button>

        <Button
            variant='outlined'
            type='button'
            disabled={true}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            삭제
        </Button>

        <Button
            variant='outlined'
            type='button'
            disabled={true}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            필터
        </Button>

        <Button
            variant='outlined'
            type='button'
            disabled={true}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            정렬
        </Button>

        <TableContainer component={Paper} >
            <Table size="medium" >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Checkbox />
                        </StyledTableCell>
                        <StyledTableCell>카테고리</StyledTableCell>
                        <StyledTableCell>제목</StyledTableCell>
                        <StyledTableCell>작성자</StyledTableCell>
                        <StyledTableCell>작성일</StyledTableCell>
                        <StyledTableCell>최종 수정일</StyledTableCell>
                        <StyledTableCell>상태</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.length !== undefined ? posts.map((post) => (
                         <StyledTableRow key={post.POSTID}>
                            <TableCell>
                                <Checkbox />
                            </TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>
                                <Link href={`/read/${post.POSTID}`} underline='none' sx={{color : '#000'}}>{post.TITLE} </Link>
                            </TableCell>
                            <TableCell>{post.CREATER}</TableCell>
                            <TableCell>{post.ADDTIME}</TableCell>
                            <TableCell>{post.UPDTIME}</TableCell>
                            <TableCell>{post.ISDELETED === 1 ? '삭제' : '공개'}</TableCell>
                        </StyledTableRow>
                    )) : null}
                </TableBody>
            </Table>
        </TableContainer>
    </div>

</Box>
</Container>
}

export default PostPage;