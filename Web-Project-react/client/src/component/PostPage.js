import axios from 'axios';
import {useState} from 'react';
import { Box, Typography, Divider, Container, Button, MenuItem, TableCell, tableCellClasses } from '@mui/material';
import { Paper, TableContainer , Table, TableHead, Link, Menu } from '@mui/material';
import {TableRow, TableBody, styled, Checkbox, Pagination, PaginationItem } from "@mui/material";

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

const maxRow = 20;

function PostPage({posts, query}) {
    const [all, setAll] = useState(false);
    const [checked, setChecked] = useState(document.querySelectorAll('input[name=check]:checked'));

    const [filterAnchor, setFilter] = useState(null);
    const [orderAnchor, setOrder] = useState(null);
    const filterOpen = Boolean(filterAnchor);
    const orderOpen = Boolean(orderAnchor);
    
    const handleFilter = (e) => {
        setFilter(e.target);
    }
    const closeFilter = () => {
        setFilter(null);
    }

    const handleOrder = (e) => {
        setOrder(e.target);
    }
    const closeOrder = () => {
        setOrder(null);
    }

    const handleCheckbox = (e) => {
        const check = document.querySelectorAll('input[name=check]');
        const checked = document.querySelectorAll('input[name=check]:checked');

        if(e.target.name === 'all') {
            setAll(e.target.checked)
            check.forEach((item) => {
                if(e.target.checked) {
                    item.parentElement.classList.add('Mui-checked');
                    item.nextElementSibling.setAttribute('data-testid', 'CheckBoxIcon');
                    item.nextElementSibling.children[0].setAttribute('d', `M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11
                     0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z`);
                    
                     setChecked(check);
                }
                else {
                    item.parentElement.classList.remove('Mui-checked');
                    item.nextElementSibling.setAttribute('data-testid', 'CheckBoxOutlineBlankIcon');
                    item.nextElementSibling.children[0].setAttribute('d', `M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9
                     2-2V5c0-1.1-.9-2-2-2z`);
                    
                    setChecked([]);
                }
            });
        }
        else {
            setChecked(checked);
            setAll(check.length === checked.length ? true : false);
        }
    }

    const getChecked = () => {
        if(checked.length > 1) {
            const data = [];
            checked.forEach((item) => {
                data.push(item.value);
            });
            return data;
        }
        else {
            return checked[0].value;
        }
    }

    const handleOpen = async () => {
        if(window.confirm('선택한 글을 공개로 전환하시겠습니까?')) {
            const res = await axios.post('/setting/post/admin', {
                modify : 'open',
                check : getChecked()
            });

            if(res.statusText === 'OK') {
                console.log('data', res.data);

                if(res.data !== 'error') {
                    alert(`선택한 게시글이 ${res.data} 처리되었습니다.`);
                    window.location.href = `../setting/post?order=${query.order}&page=${query.page}&filter=${query.filter}`;
                }
                else {
                    alert('오류가 발생했습니다.');
                }
            }
        }
    }

    const handleDelete = async () => {
        if(window.confirm('선택한 글을 삭제하시겠습니까?')) {
            const res = await axios.post('/setting/post/admin', {
                modify : 'delete',
                check : getChecked()
            });

            if(res.statusText === 'OK') {
                console.log('data', res.data);

                if(res.data === 'authorityFail') {
                    alert('관리자 권한이 필요합니다.');
                    window.location.href = '/';
                }
                if(res.data === 'error') {
                    alert('오류가 발생했습니다.');
                }
                else {
                    alert(`선택한 게시글이 ${res.data} 처리되었습니다.`);
                    window.location.href = `../setting/post?order=${query.order}&page=${query.page}&filter=${query.filter}`;
                    
                }
            }
        }
    }

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
            disabled={all || checked.length > 0 ? false : true}
            onClick={handleOpen}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            공개
        </Button>

        <Button
            variant='outlined'
            type='button'
            disabled={all || checked.length > 0 ? false : true}
            onClick={handleDelete}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            삭제
        </Button>

        <Button
            variant='outlined'
            type='button'
            onClick={handleFilter}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            필터
        </Button>
        <Menu
            anchorEl={filterAnchor}
            open={filterOpen}    
            onClose={closeFilter}
        >
            <MenuItem component="a" href={`/setting/post?order=${query.order}&page=1&filter=no`}>적용 안함</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=${query.order}&page=1&filter=0`}>공개</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=${query.order}&page=1&filter=1`}>삭제</MenuItem>
        </Menu>

        <Button
            variant='outlined'
            type='button'
            onClick={handleOrder}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            정렬
        </Button>
        <Menu
            anchorEl={orderAnchor}
            open={orderOpen}    
            onClose={closeOrder}
        >
            <MenuItem component="a" href={`/setting/post?order=category&page=1&filter=${query.filter}`}>카테고리</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=TITLE&page=1&filter=${query.filter}`}>제목</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=CREATER&page=1&filter=${query.filter}`}>작성자</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=ADDTIME DESC&page=1&filter=${query.filter}`}>최근 순</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=ADDTIME&page=1&filter=${query.filter}`}>오래된 순</MenuItem>
        </Menu>

        <TableContainer component={Paper} >
            <Table size="medium" >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Checkbox name='all' checked={all} onChange={handleCheckbox} />
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
                                <Checkbox name='check' onChange={handleCheckbox} value={post.POSTID} />
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

        <Box sx={{display : 'flex', justifyContent : 'center', mt: 6 }}>
            <Pagination 
                count={posts.length !== undefined ? Math.ceil(400 / maxRow) : 0} 
                shape="rounded" 
                color='info'
                hidePrevButton 
                hideNextButton 
                showFirstButton 
                showLastButton
                siblingCount={1}
                boundaryCount={2}
                defaultPage={1}
                page={query.page !== undefined ? parseInt(query.page) : 1}
                renderItem={(item) => {
                        return <PaginationItem
                            component={Link}
                            href={`/setting/post?order=${query.order}&page=${item.page}&filter=${query.filter}`}
                            type={item.type}
                            page={item.page}
                            selected={item.selected}
                            shape='rounded'
                            color='info'
                        />           
                }}
            />
        </Box>
    </div>

</Box>
</Container>
}

export default PostPage;