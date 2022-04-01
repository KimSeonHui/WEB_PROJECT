import axios from 'axios';
import {useState} from 'react';
import { Box, Typography, Divider, Container, Button, Select, MenuItem, TableCell, tableCellClasses } from '@mui/material';
import { Grid, InputBase, Paper, TableContainer , Table, TableHead } from '@mui/material';
import {TableRow, TableBody, styled, } from "@mui/material";

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



const appendRow = (data) => {

    console.log('appendRow ', data.UID);
    const tbody = document.getElementById('addManagerTbody');

    const tr = document.createElement('tr');
    tbody.appendChild(tr);

    const check = document.createElement('td');
    const uid = document.createElement('td');
    uid.innerText = data.UID;

    const email = document.createElement('td');
    email.innerText = data.EMAIL;

    const name = document.createElement('td');
    name.innerText = data.NAME;

    const join = document.createElement('td');
    join.innerText = data.JOINDATE;

    const recentLogin = document.createElement('td');
    recentLogin.innerText = data.RECENTLOGIN;

    tr.appendChild(check);
    tr.appendChild(uid);
    tr.appendChild(email);
    tr.appendChild(name);
    tr.appendChild(join);
    tr.appendChild(recentLogin);

    // tbody.appendChild(
    // <StyledTableRow key={data.UID}>
    //     <TableCell>체크박스</TableCell>
    //     <TableCell>{data.UID}</TableCell>
    //     <TableCell>{data.EMAIL}</TableCell>
    //     <TableCell>{data.NAME}</TableCell>
    //     <TableCell>{data.JOINDATE}</TableCell>
    //     <TableCell>{data.RECENTLOGIN}</TableCell>
    // </StyledTableRow>
    // );
}


function ManagerPage() {
    const [rows, setRows] = useState([]);
    const [select, setSelect] = useState('email');
    const [word, setWord] = useState('');

    const handleSelect = (event) => {
        setSelect(event.target.value);
    }

    const onChange = (event) => {
        setWord(event.target.value);
    }

    const createData = (UID, EMAIL, NAME, JOINDATE, RECENTLOGIN) => {
        return {UID, EMAIL, NAME, JOINDATE, RECENTLOGIN};
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
                // setRows(res.data.map((val) => (
                //     rows.push(createData(val.UID, val.EMAIL, val.NAME, val.JOINDATE, val.RECENTLOGIN))
                // )));
                // setRows(res.data);
                // console.log('rows', rows)                 

                const tbody = document.getElementById('addManagerTbody');
                while(tbody.hasChildNodes()) {
                    tbody.removeChild(tbody.firstElementChild);
                }

                //const value = Object.values(res.data);
          
                // for(let i = 0; i < value.length; i++) {
                //     console.log('res.data[i]' + value);
                //     appendRow(value[i]);
                // }

                for(let val of res.data) {
                    console.log('v', val)
                    appendRow(val);
                }

                document.getElementById('addManagerDiv').style.display = 'block';
            }
        }
    }

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
            sx={{boarderColor : '#0186D3', mt : 2, mb : 1}}
        >
            추가
        </Button>
        <input type='hidden' name='email' value='' id="addedEmail"/>
        <TableContainer component={Paper} >
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>체크박스</StyledTableCell>
                        <StyledTableCell>UID</StyledTableCell>
                        <StyledTableCell>이메일</StyledTableCell>
                        <StyledTableCell>이름</StyledTableCell>
                        <StyledTableCell>가입일</StyledTableCell>
                        <StyledTableCell>최근 로그인</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody id='addManagerTbody'>
                    {/* {rows.map((row) => (
                        <StyledTableRow key={row.UID}>
                            <TableCell>체크박스</TableCell>
                            <TableCell>{row.UID}</TableCell>
                            <TableCell>{row.EMAIL}</TableCell>
                            <TableCell>{row.NAME}</TableCell>
                            <TableCell>{row.JOINDATE}</TableCell>
                            <TableCell>{row.RECENTLOGIN}</TableCell>
                        </StyledTableRow>
                    ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
</Box>
</Container>

}

export default ManagerPage;