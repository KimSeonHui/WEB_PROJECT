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
        if(window.confirm('????????? ?????? ????????? ?????????????????????????')) {
            const res = await axios.post('/setting/post/admin', {
                modify : 'open',
                check : getChecked()
            });

            if(res.statusText === 'OK') {
                console.log('data', res.data);

                if(res.data !== 'error') {
                    alert(`????????? ???????????? ${res.data} ?????????????????????.`);
                    window.location.href = `../setting/post?order=${query.order}&page=${query.page}&filter=${query.filter}`;
                }
                else {
                    alert('????????? ??????????????????.');
                }
            }
        }
    }

    const handleDelete = async () => {
        if(window.confirm('????????? ?????? ?????????????????????????')) {
            const res = await axios.post('/setting/post/admin', {
                modify : 'delete',
                check : getChecked()
            });

            if(res.statusText === 'OK') {
                console.log('data', res.data);

                if(res.data === 'authorityFail') {
                    alert('????????? ????????? ???????????????.');
                    window.location.href = '/';
                }
                if(res.data === 'error') {
                    alert('????????? ??????????????????.');
                }
                else {
                    alert(`????????? ???????????? ${res.data} ?????????????????????.`);
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
            ????????? ??????
        </Typography>
    </Box>
    <Divider />

    <div style={{marginTop : '2em'}}>
    <Typography 
        variant='h5' 
        component="h5" 
        gutterBottom
    >
        ?????? ????????? ??????
    </Typography>
    <Button
            variant='outlined'
            type='button'
            disabled={all || checked.length > 0 ? false : true}
            onClick={handleOpen}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            ??????
        </Button>

        <Button
            variant='outlined'
            type='button'
            disabled={all || checked.length > 0 ? false : true}
            onClick={handleDelete}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            ??????
        </Button>

        <Button
            variant='outlined'
            type='button'
            onClick={handleFilter}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            ??????
        </Button>
        <Menu
            anchorEl={filterAnchor}
            open={filterOpen}    
            onClose={closeFilter}
        >
            <MenuItem component="a" href={`/setting/post?order=${query.order}&page=1&filter=no`}>?????? ??????</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=${query.order}&page=1&filter=0`}>??????</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=${query.order}&page=1&filter=1`}>??????</MenuItem>
        </Menu>

        <Button
            variant='outlined'
            type='button'
            onClick={handleOrder}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            ??????
        </Button>
        <Menu
            anchorEl={orderAnchor}
            open={orderOpen}    
            onClose={closeOrder}
        >
            <MenuItem component="a" href={`/setting/post?order=category&page=1&filter=${query.filter}`}>????????????</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=TITLE&page=1&filter=${query.filter}`}>??????</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=CREATER&page=1&filter=${query.filter}`}>?????????</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=ADDTIME DESC&page=1&filter=${query.filter}`}>?????? ???</MenuItem>
            <MenuItem component="a" href={`/setting/post?order=ADDTIME&page=1&filter=${query.filter}`}>????????? ???</MenuItem>
        </Menu>

        <TableContainer component={Paper} >
            <Table size="medium" >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Checkbox name='all' checked={all} onChange={handleCheckbox} />
                        </StyledTableCell>
                        <StyledTableCell>????????????</StyledTableCell>
                        <StyledTableCell>??????</StyledTableCell>
                        <StyledTableCell>?????????</StyledTableCell>
                        <StyledTableCell>?????????</StyledTableCell>
                        <StyledTableCell>?????? ?????????</StyledTableCell>
                        <StyledTableCell>??????</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.length !== 0 && posts.length !== undefined? posts.map((post) => (
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
                            <TableCell>{post.ISDELETED === 1 ? '??????' : '??????'}</TableCell>
                        </StyledTableRow>
                    )) : <StyledTableRow>
                            <TableCell colSpan={7} sx={{textAlign : 'center'}}>????????? ????????????.</TableCell>
                        </StyledTableRow>}
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
                            href={query.uid !== undefined ? `/setting/post?order=${query.order}&page=${item.page}&filter=${query.filter}&uid=${query.uid}`
                                : `/setting/post?order=${query.order}&page=${item.page}&filter=${query.filter}`}
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