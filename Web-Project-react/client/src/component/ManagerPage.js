import axios from 'axios';
import {useState} from 'react';
import { Box, Typography, Divider, Container, Button, Select, MenuItem, TableCell, tableCellClasses } from '@mui/material';
import { Grid, InputBase, Paper, TableContainer , Table, TableHead } from '@mui/material';
import {TableRow, TableBody, styled, Checkbox } from "@mui/material";
import ManagerTable from './ManagerTable';
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


function ManagerPage({manager}) {
    const [rows, setRows] = useState([]);
    const [select, setSelect] = useState('email');
    const [word, setWord] = useState('');
    const [searchCheckbox, setSearchCheckbox] = useState({
        searchAll : false,
        searchCheck : false
    });

    const handleSelect = (event) => {
        setSelect(event.target.value);
    }

    const onChange = (event) => {
        setWord(event.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/setting/adminSelect ', {
            keywordCategory : select,
            key : word
        });

        if(res.statusText === 'OK') {
            console.log('data', res.data);

            if(res.data === 'authorityFail') {
                alert('관리자 권한이 필요합니다.');
                window.location.href = '/';
            }
            else if(res.data === 'error') {
                alert('오류가 발생했습니다. 정보를 찾을 수 없습니다.');
            }
            else if(res.data === false) {
                alert('검색 결과가 없습니다.');
            }
            else {
                setRows(res.data);
                document.getElementById('addManagerDiv').style.display = 'block';
            }
        }
    }

    const addManager = async () => {
        const tr = document.querySelector('#addManagerTable tr');
        const check = document.querySelectorAll('input[name=searchCheck]:checked');

        if(window.confirm('선택한 회원을 관리자에 추가하시겠습니까?')){
            const res = await axios.post('/setting/addAdmin', {
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
                    console.log('관리자 추가!');
                    window.location.href = '/setting?order=UID';
                }
            }
        }
        else {
            return false;
        }


    }

    const handleSearchAllCheck = (e) => {
        if(e.target.name === 'searchAll') {
            setSearchCheckbox({
                searchAll : e.target.checked,
                searchCheck : e.target.checked
            })
        }
        else {
            const searchChecks = document.querySelectorAll('input[name=searchCheck]');
            const searchChecked = document.querySelectorAll('input[name=searchCheck]:checked');
            setSearchCheckbox({
                searchAll : (searchChecks.length === searchChecked.length) ? true : false,
                searchCheck : e.target.checked
            });
        }

    }
    const {searchAll , searchCheck} = searchCheckbox;


    console.log('manager', manager);
    console.log('생성')
    return <Container maxWidth="xl">
    <Box sx={{width : "100%", p : '20px'}}>
    <Box sx={{display : 'flex', justifyContent: 'space-between'}} >
        <Typography 
            variant='h5' 
            component="div" 
            gutterBottom
        >
            관리자 관리
        </Typography>
    </Box>
    <Divider />
    <Box 
        component='form'
        action='/setting/adminSelect'
        method='post'
        autoComplete="off"
        onSubmit={onSubmit}
        sx={{display : 'flex', mt : 4, width : '100%'}}
    >
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <p style={{width : '100%'}}>관리자로 추가할 회원 선택</p>
            </Grid>
            <Grid item xs={2}>
                <Select 
                    name='keywordCategory'
                    value={select}
                    onChange={handleSelect}
                    sx={{width : '100%'}}
                >
                    <MenuItem value='email'>이메일</MenuItem>
                    <MenuItem value='name'>이름</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={6} >
                <InputBase
                    name='key'
                    placeholder='Search'
                    value={word}
                    onChange={onChange}
                    sx={{
                        width : '100%', 
                        border : 1, 
                        borderRadius: '6px', 
                        borderColor : '#d3d3d3',
                        py : 1.5,
                        pl : 1
                    }}
                />
            </Grid>
            <Grid item xs={2} >
                <Button 
                    variant="contained" 
                    type="submit"
                    sx={{
                        width : '80%',
                        mt : 0,
                        mb : 2, 
                        py : 2,
                        px : 0, 
                        backgroundColor : '#0186D3'
                    }}
                >
                    Search
                </Button>
            </Grid>
        </Grid>
    </Box>

    <div id='addManagerDiv' style={{display : 'none'}}>
        <Button
            variant='outlined'
            type='button'
            disabled={searchAll || searchCheck ? false : true}
            onClick={addManager}
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1}}
        >
            추가
        </Button>
        <input type='hidden' name='email' value='' id="addedEmail"/>
        <TableContainer component={Paper} >
            <Table size="medium" id="addManagerTable">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Checkbox id="searchAll" name="searchAll" checked={searchAll} onChange={handleSearchAllCheck}/>
                        </StyledTableCell>
                        <StyledTableCell>UID</StyledTableCell>
                        <StyledTableCell>이메일</StyledTableCell>
                        <StyledTableCell>이름</StyledTableCell>
                        <StyledTableCell>가입일</StyledTableCell>
                        <StyledTableCell>최근 로그인</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                         <StyledTableRow key={row.UID}>
                            <TableCell>
                                <Checkbox name="searchCheck" checked={searchCheck} onChange={handleSearchAllCheck}/>
                            </TableCell>
                            <TableCell>{row.UID}</TableCell>
                            <TableCell>{row.EMAIL}</TableCell>
                            <TableCell>{row.NAME}</TableCell>
                            <TableCell>{row.JOINDATE}</TableCell>
                            <TableCell>{row.RECENTLOGIN}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>

    <ManagerTable manager={manager}/>
</Box>
</Container>

}

export default ManagerPage;