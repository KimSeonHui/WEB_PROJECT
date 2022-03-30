import axios from "axios";
import {useState} from "react";
import { Box, Typography, TextField, Button, Link } from '@mui/material';

function Login() {
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+/g;
    const checkPw = /^[A-Za-z0-9@_-]{8,20}$/;

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pw, setPw] = useState('');
    const [pwErr, setPwErr] = useState(false);

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        if(checkEmail.test(email)) {
            setEmailErr(false);
        }
        else {
            setEmailErr(true);
        }
    }

    const onChangePw = (event) => {
        setPw(event.target.value);
        if(checkPw.test(pw)) {
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
            return false;
        }
        if(pw.length === 0 || pwErr) {
            setPwErr(true);
            return false;
        }    

        const res = await axios.post('/user/login', {
            email : email,
            password : pw
        });

        if(res.statusText === 'OK') {
            if(res.data === 'DBerror') {
                alert('DB 에러');
            }
            else if(res.data === 'infoError') {
                alert('아이디 또는 비밀번호가 잘못 되었습니다.')
            }
            else {
                window.location.href = '../../';
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
                    Please sign in
                </Typography>

                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 3, width: '80%'},
                    }}
                    noValidate
                    autoComplete="off"
                    action="/user/login"
                    method="post"
                    className="needs-validation"
                    onSubmit={onSubmit}    
                >
                    <TextField  
                        required
                        id="email"
                        name="email"
                        label="Email adress"
                        variant="standard"
                        value={email}
                        error={emailErr}
                        helperText={emailErr ? '이메일이 유효하지 않습니다.' : ''}
                        onChange={onChangeEmail}
                    />
                    <TextField  
                        required
                        id="password"
                        name="password"
                        label="password"
                        variant="standard"
                        type="password"
                        value={pw}
                        error={pwErr}
                        helperText={pwErr ? '비밀번호를 8글자 이상 20글자 이하로 입력해주세요' : ''}
                        onChange={onChangePw}
                    />
                    <Button 
                        variant="contained" 
                        type="submit"
                        sx={{
                            width :'80%', 
                            mt : 6,
                            mb : 2, 
                            py : 1, 
                            backgroundColor : '#0186D3'
                        }}>
                        Sign in
                    </Button>
                    <br />

                    <Link underline="none" href="/user/signup" sx={{color : '#6c757d', mr : 2}}>
                        회원가입
                    </Link>
                    <Link underline="none" href="/user/findpw"  sx={{color : '#6c757d'}}>
                        비밀번호 찾기
                    </Link>
                </Box>

        </Box>
    </Box>
}

export default Login;