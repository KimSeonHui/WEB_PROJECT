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
    const [checkbox, setCheckbox] = useState({
        all : false,
        check : false
    });
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
        if(e.target.name === 'all') {
            setCheckbox({
                all : e.target.checked,
                check : e.target.checked
            })
        }
        else {
            const checks = document.querySelectorAll('input[name=check]');
            const checked = document.querySelectorAll('input[name=check]:checked');
            setCheckbox({
                all : (checks.length === checked.length) ? true : false,
                check : e.target.checked
            });
        }

    }
    const {all, check } = checkbox;

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
        disabled={all || check ? false : true}
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
                {manager.length !== undefined ? manager.map((row, index) => (
                     <StyledTableRow key={row.UID}>
                        <TableCell>
                            {row.AUTHORITY !== 2 ? <Checkbox name="check" checked={check} onChange={handleAllCheck} />
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