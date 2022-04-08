import axios from 'axios';
import { useState} from 'react';
import { Typography, Button, MenuItem, TableCell, tableCellClasses } from '@mui/material';
import { Paper, TableContainer , Table, TableHead, Menu } from '@mui/material';
import {TableRow, TableBody, styled, Checkbox } from "@mui/material";
import * as setting from '../js/SettingScript'

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

function ManagerTable({manager}) {
    const [all, setAll] = useState(false);
    const [checked, setChecked] = useState(document.querySelectorAll('input[name=check]:checked'));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.target);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    
    const deleteManager = async () => {
        const tr = document.querySelector('#allManagerTable tr')
        const check = document.querySelectorAll('input[name=check]:checked');

        if(window.confirm('선택한 회원을 관리자에서 삭제하겠습니까?')) {
            const res = await axios.post('/setting/deleteManager', {
                emails : setting.getEmails(tr, check)
            });
    
            if(res.statusText === 'OK') {
                if(res.data === 'authorityFail'){
                    alert('관리자 권한이 필요합니다.');
                    window.location.href = '/';
                }
                else if(res.data === 'error') {
                    alert('DB 접속 에러. 작업에 실패하였습니다.');
                }
                else {
                    console.log('관리자 삭제!');
                    window.location.href = '/setting?order=UID';
                }
            }
        }
    }

    const handleAllCheck = (e) => {
        const checks = document.querySelectorAll('input[name=check]');
        const checked = document.querySelectorAll('input[name=check]:checked');

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
            setChecked(checked);
            setAll(checks.length === checked.length ? true : false);
        }

    }

    return <div style={{marginTop : '4em'}}>
    <Typography 
        variant='h5' 
        component="h5" 
        gutterBottom
    >
        전체 관리자 조회
    </Typography>
    <Button
        variant='outlined'
        type='button'
        disabled={all || checked.length > 0 ? false : true}
        onClick={deleteManager}
        sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
    >
        삭제
    </Button>
    <Button
        id="order"
        variant='outlined'
        type='button'
        onClick={handleClick}
        sx={{boarderColor : '#0186D3', mt : 2, mb : 1, mr : 2}}
    >
        정렬
    </Button>
    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
    >
        <MenuItem  component="a" href="/setting?order=UID">적용 안함</MenuItem>
        <MenuItem  component="a" href="/setting?order=EMAIL">이메일 </MenuItem>
        <MenuItem  component="a" href="/setting?order=NAME">이름 </MenuItem>
        <MenuItem  component="a" href="/setting?order=JOINDATE">가입일</MenuItem>
        <MenuItem  component="a" href="/setting?order=RECENTLOGIN">최근 로그인</MenuItem>
    </Menu>

    <TableContainer component={Paper} >
        <Table size="medium" id="allManagerTable">
            <TableHead>
                <TableRow>
                    <StyledTableCell>
                        <Checkbox  name="all" checked={all} onChange={handleAllCheck} />
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
                {manager.length !== undefined ? manager.map((row) => (
                     <StyledTableRow key={row.UID}>
                        <TableCell>
                            {row.AUTHORITY !== 2 ? <Checkbox name="check" onChange={handleAllCheck} />
                             : null }
                        </TableCell>
                        <TableCell>{row.UID}</TableCell>
                        <TableCell>{row.AUTHORITY === 2 ? '관리자' : '매니저'}</TableCell>
                        <TableCell>{row.EMAIL}</TableCell>
                        <TableCell>{row.NAME}</TableCell>
                        <TableCell>{row.JOINDATE}</TableCell>
                        <TableCell>{row.RECENTLOGIN}</TableCell>
                    </StyledTableRow>
                )) : null }
            </TableBody>
        </Table>
    </TableContainer>
</div>
}

export default ManagerTable;