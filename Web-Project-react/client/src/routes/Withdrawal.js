import axios from "axios";
import {useState} from "react";
import { Box, Typography, TextField, Button, Link } from '@mui/material';

function Withdrawal() {
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+/g;
    const checkPw = /^[A-Za-z0-9_-]{8,20}$/;

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pwErr, setPwErr] = useState(false);

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        if(checkEmail.test(email) || email.length === 0) {
            setEmailErr(false);
        }
        else {
            setEmailErr(true);
        }
    }

    const onChangePw = (event) => {
        setPw(event.target.value);
        if(checkPw.test(pw) || pw.length === 0) {
            setPwErr(false);
        }
        else {
            setPwErr(true);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(email.length === 0 || emailErr) {
            setEmailErr(true);
            alert('이메일이 유효하지 않습니다.');
            return false;
        }
        if(pw.length < 8 || pw.length > 20 || pwErr) {
            setPwErr(true); 
            alert('비밀번호는 8자 이상, 20자 이하로 설정하세요.');
            return false;
        }   

        if(window.confirm('삭제 시 복구가 불가능 합니다. 정말 삭제하시겠습니까?')) {
            const res = await axios.post('/user/withdrawal', {
                email : email,
                password : pw
            });
        
            if(res.statusText === 'OK') {
                console.log('res.data', res.data);
                if(res.data === 'withdrawal') {
                    alert('탈퇴가 완료되었습니다.');

                    const result = await axios.get('/user/logout');
                    if(result.statusText === 'OK') {
                        if(result.data === 'logout') {
                            window.location.href = '/user/login'
                        }
                        else {
                            alert('로그인한 상태가 아닙니다')
                        }
                    }
                }
                else if(res.data === 'notLogined') {
                    alert('로그인해 주십시오');
                    window.location.href = `../user/login`;
                }
                else if(res.data === 'admin') {
                    alert("관리자는 탈퇴할 수 없습니다.");
                    window.location.href = `../../`;
                }
                else if(res.data === 'pwError') {
                    alert("비밀번호가 잘못 되었습니다. \n 다시 입력해주세요.");
                    window.location.href = "../user/withdrawal";
                }
                else if(res.data === 'emailError') {
                    alert("이메일이 잘못 되었습니다. \n 다시 입력해주세요.");
                    window.location.href = "../user/withdrawal";
                }
                else if(res.data === 'DBerror') {
                    alert('DB 접속 오류, 탈퇴하지 못했습니다.');
                    window.location.href = "../user/withdrawal";
                }
            }
        }
        else {
            return false;
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
                    회원 탈퇴
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
                        id="email"
                        label="Email adress"
                        variant="outlined"
                        name="email"
                        value={email}
                        error={emailErr}
                        helperText={emailErr ? '이메일이 유효하지 않습니다.' : ''}
                        onChange={onChangeEmail}
                    />
                    <TextField  
                        required
                        id="password"
                        label="password"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={pw}
                        error={pwErr}
                        helperText={pwErr ? '비밀번호는 8자 이상, 20자 이하로 설정하세요.' : ''}
                        onChange={onChangePw}
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

export default Withdrawal;