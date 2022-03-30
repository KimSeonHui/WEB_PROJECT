import axios from "axios";
import {useState} from "react";
import { Box, Typography, TextField, Button, Link } from '@mui/material';

function ChangePw() {
    const checkPw = /^[A-Za-z0-9@_-]{8,20}$/;

    const [pw, setPw] = useState('');
    const [newPW1, setnewPW1] = useState('');
    const [newPW2, setnewPW2] = useState('');
    const [pwErr, setPwErr] = useState(false);
    const [newPW1Err, setNewPW1Err] = useState(false);
    const [newPW2Err, setNewPW2Err] = useState(false);

    const onChangePw = (event) => {
        setPw(event.target.value);
        if(checkPw.test(pw) || pw.length === 0) {
            setPwErr(false);
        }
        else {
            setPwErr(true);
        }
    }

    const onChangeNewPW1 = (event) => {
        setnewPW1(event.target.value);
        if(checkPw.test(newPW1) || newPW1.length === 0) {
            setNewPW1Err(false);
        }
        else {
            setNewPW1Err(true);
        }
    }

    const onChangeNewPW2 = (event) => {
        setnewPW2(event.target.value);
        if(checkPw.test(newPW2) || newPW2.length === 0) {
            setNewPW2Err(false);
        }
        else {
            setNewPW2Err(true);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(pw.length < 8 || pw.length > 20 || pwErr) {
            setPwErr(true); 
            alert('비밀번호는 8자 이상, 20자 이하로 설정하세요.');
            return false;
        }   
        if(newPW1.length < 8 || newPW1.length > 20 || newPW1Err) {
            setNewPW1Err(true); 
            alert('비밀번호는 8자 이상, 20자 이하로 설정하세요.');
            return false;
        } 
        if(newPW2.length < 8 || newPW2.length > 20 || newPW2Err) {
            setNewPW2Err(true); 
            alert('비밀번호는 8자 이상, 20자 이하로 설정하세요.');
            return false;
        } 
            
        const res = await axios.post('/user/changepw', {
            currentPW : pw,
            newPW1 : newPW1,
            newPW2 : newPW2
        });
    
        if(res.statusText === 'OK') {
            if(res.data === 'changePW') {
                alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요.');
                window.location.href = '../user/login'
            }
            else if(res.data === 'correspond') {
                alert('현재 비밀번호는 새 비밀번호로 사용할 수 없습니다.\n다시 입력해주세요.');
                return false;
            }
            else if(res.data === 'currentPWErr') {
                alert("현재 비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
                return false;
            }
            else if(res.data === 'newPWErr') {
                alert("새 비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
                return false;
            }
            else if(res.data === 'fail') {
                alert("비밀번호 변경에 실패하였습니다. 입력값을 확인해주십시오.");
                return false;
            }
            else {
                alert('오류가 발생하였습니다.');
                window.location.href = "../../";
            }
        }
    }

    return <Box 
        sx={{
            display : 'flex', 
            justifyContent : 'center',  
            alignItems : 'center', 
            height : '100vh',
            width : '100vw'
        }}>
            <Box 
                sx={{ 
                    border: '2px solid #D0CDCD', 
                    height: '600px',
                    width : '500px',
                    textAlign : 'center'
                }}
            >
                <Typography 
                    variant='h4' 
                    component="div" 
                    gutterBottom
                    sx={{mt : 8, mb : 4, p :'auto'}}
                >
                    비밀번호 변경
                </Typography>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 3, width: '80%'},
                    }}
                    noValidate
                    autoComplete="off"
                    action="/signin"
                    method="post"
                    className="needs-validation"
                    onSubmit={onSubmit}    
                >
                    <TextField  
                        required
                        id="currentPW"
                        label="현재 비밀번호"
                        variant="outlined"
                        name="currentPW"
                        type="password"
                        value={pw}
                        error={pwErr}
                        helperText={pwErr ? '비밀번호는 8자 이상, 20자 이하로 설정하세요.' : ''}
                        onChange={onChangePw}
                    />
                    <TextField  
                        required
                        id="newPW1"
                        label="새 비밀번호"
                        variant="outlined"
                        name="newPW1"
                        type="password"
                        value={newPW1}
                        error={newPW1Err}
                        helperText={newPW1Err ? '비밀번호는 8자 이상, 20자 이하로 설정하세요.' : ''}
                        onChange={onChangeNewPW1}
                    />
                    <TextField  
                        required
                        id="newPW2"
                        label="새 비밀번호 확인"
                        variant="outlined"
                        name="newPW2"
                        type="password"
                        value={newPW2}
                        error={newPW2Err}
                        helperText={newPW2Err ? '비밀번호는 8자 이상, 20자 이하로 설정하세요.' : ''}
                        onChange={onChangeNewPW2}
                    />
                    <Button 
                        variant="contained" 
                        type="submit"
                        sx={{
                            width :'80%', 
                            mt : 2,
                            mb : 2, 
                            py : 1, 
                            backgroundColor : '#0186D3'
                        }}>
                        확인
                    </Button>
                </Box>
        </Box>
    </Box>
}

export default ChangePw;