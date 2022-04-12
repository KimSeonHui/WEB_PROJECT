import axios from 'axios';
import {useState} from 'react';
import { Box, Typography, Divider, Container, Button, MenuItem, TableCell, tableCellClasses } from '@mui/material';
import { Paper, TableContainer , Table, TableHead, Link, Menu } from '@mui/material';
import {TableRow, TableBody, styled, Checkbox, Pagination, PaginationItem } from "@mui/material";
import * as setting from '../js/SettingScript';
import Rename from './Rename';

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

function UserPage({users, query}) {
    const [all, setAll] = useState(false);
    const [checked, setChecked] = useState(document.querySelectorAll('input[name=check]:checked'));

    const [orderAnchor, setOrder] = useState(null);
    const open = Boolean(orderAnchor);

    const [postAnchor, setPostOrder] = useState(null);
    const postOpen = Boolean(postAnchor);

    const [isRename, setIsRename] = useState(false);

    const handleClick = (e) => {
        setOrder(e.target);
    }

    const handleClose = () => {
        setOrder(null);
    }

    const displayAuthority = (authority) => {
        if(authority === 2) {
            return '관리자'
        }
        else if(authority === 1) {
            return '매니저'
        }
        else {
            return '회원'
        }
    }

    const handleCheckbox = (e) => {
        const checks = document.querySelectorAll('input[name=check]');
        const checked = document.querySelectorAll('input[name=check]:checked');
        setIsRename(false);

        if(e.target.name === 'all') {
            setAll(e.target.checked);
            checks.forEach((item) => {
                if(e.target.checked) {
                    item.parentElement.classList.add('Mui-checked');
                    item.nextElementSibling.setAttribute('data-testid', 'CheckBoxIcon');
                    item.nextElementSibling.children[0].setAttribute('d', `M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11
                     0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z`);
                    
                     setChecked(checks);
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
            setAll(checks.length === checked.length ? true : false);
            setChecked(checked);
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

    const handleWithdrawalUser = async () => {
        if(window.confirm('선택한 회원을 탈퇴시키겠습니까?')) {
            const res = await axios.post('/setting/user/admin', {
                button : 'withdrawal',
                check : getChecked()
            });

            if(res.statusText === 'OK') {
                console.log('res.data', res.data);

                if(res.data === 'authorityFail') {
                    alert('관리자 권한이 필요합니다.');
                    window.location.href = '/';
                }
                else if(res.data === 'error') {
                    alert('오류가 발생했습니다.');
                }
                else {
                    alert('선택한 회원이 탈퇴되었습니다.');
                    window.location.href = `../setting/user?order=${query.order}&page=${query.page}`;
                }
            }
        }
    }

    const handleChangePW = async () => {
        if(window.confirm('선택한 회원의 비밀번호를 초기화 하시겠습니까?')) {
            const res = await axios.post('/setting/user/admin', {
                button : 'setPW',
                check : getChecked()
            });

            if(res.statusText === 'OK') {
                console.log('data', res.data);

                if(res.data === 'authorityFail') {
                    alert('관리자 권한이 필요합니다.');
                    window.location.href = '/';
                }
                else if(res.data === 'error'){
                    alert('오류가 발생했습니다.');
                }
                else {
                    alert('비밀번호를 초기화했습니다. 초기화된 비밀번호는 a123456789 입니다.');
                }
            }
        }
    }

    const handleUserPost = (e) => {
        setPostOrder(e.target);
    }

    const userPostClose = () =>{
        setPostOrder(null);
    }

    const showUserPost = () => {
        const row = document.querySelector('#users tr');
        const index = setting.getColumnIndex(row, 'UID');

        const selectedTr = postAnchor.parentNode.parentNode;
        const uid = selectedTr.children[index].innerText;

        window.location.href = `../setting/post?uid=${uid}`
    }

    const rename = () => {
        if(checked.length > 1) {
            alert('하나만 선택해 주세요.');
            setIsRename(false);
        }
        else {
            setIsRename(!isRename);
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
            회원 관리
        </Typography>
    </Box>
    <Divider />

    <div style={{marginTop : '2em'}}>
    <Typography 
        variant='h5' 
        component="h5" 
        gutterBottom
    >
        전체 회원 조회
    </Typography>
    <Button
            variant='outlined'
            type='button'
            disabled={all || checked.length > 0 ? false : true}
            onClick={handleWithdrawalUser}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            탈퇴
        </Button>

        <Button
            variant='outlined'
            type='button'
            disabled={all || checked.length > 0 ? false : true}
            onClick={handleChangePW}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            비밀번호 초기화
        </Button>

        <Button
            variant='outlined'
            type='button'
            disabled={checked.length > 0 ? false : true}
            onClick={rename}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            이름 수정
        </Button>

        <Button
            variant='outlined'
            type='button'
            onClick={handleClick}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
        >
            정렬
        </Button>
        <Menu
            anchorEl={orderAnchor}
            open={open}    
            onClose={handleClose}
        >
            <MenuItem component="a" href={`/setting/user?order=UID&page=${query.page}`}>적용 안함</MenuItem>
            <MenuItem component="a" href={`/setting/user?order=EMAIL&page=${query.page}`}>이메일</MenuItem>
            <MenuItem component="a" href={`/setting/user?order=NAME&page=${query.page}`}>이름</MenuItem>
            <MenuItem component="a" href={`/setting/user?order=JOINDATE&page=${query.page}`}>가입일</MenuItem>
            <MenuItem component="a" href={`/setting/user?order=RECENTLOGIN&page=${query.page}`}>최근 로그인</MenuItem>
        </Menu>

        <TableContainer component={Paper} >
            <Table size="medium" id="users">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Checkbox name='all' checked={all} onChange={handleCheckbox} />
                        </StyledTableCell>
                        <StyledTableCell>UID</StyledTableCell>
                        <StyledTableCell>권한</StyledTableCell>
                        <StyledTableCell>이메일</StyledTableCell>
                        <StyledTableCell>이름</StyledTableCell>
                        <StyledTableCell>가입일</StyledTableCell>
                        <StyledTableCell>최근 로그인</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length !== undefined ? users.map((user) => (
                         <StyledTableRow key={user.UID}>
                            <TableCell>
                                {user.AUTHORITY !== 2 ? <Checkbox name='check' value={user.UID} onChange={handleCheckbox} /> : null}
                            </TableCell>
                            <TableCell>{user.UID}</TableCell>
                            <TableCell>{ displayAuthority(user.AUTHORITY) }</TableCell>
                            <TableCell>{user.EMAIL}</TableCell>
                            <TableCell>
                              { isRename && checked[0].value === String(user.UID) ? <Rename name={user.NAME} uid={user.UID}/> 
                              : <div>
                                <Button variant='text' onClick={handleUserPost} type='button' sx={{color : 'black'}}>{user.NAME}</Button>
                                    <Menu anchorEl={postAnchor} open={postOpen} onClose={userPostClose}>
                                        <MenuItem component='button' onClick={showUserPost}>작성 글 보기</MenuItem>
                                </Menu>
                              </div>
                              }
                            </TableCell>                         
                            <TableCell>{user.JOINDATE}</TableCell>
                            <TableCell>{user.RECENTLOGIN}</TableCell>
                        </StyledTableRow>
                    )) : null}
                </TableBody>
            </Table>
        </TableContainer>

        <Box sx={{display : 'flex', justifyContent : 'center', mt: 6 }}>
            <Pagination 
                count={users.length !== undefined ? Math.ceil(400 / maxRow) : 0} 
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
                            href={`/setting/user?order=${query.order}&page=${item.page}`}
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

export default UserPage;