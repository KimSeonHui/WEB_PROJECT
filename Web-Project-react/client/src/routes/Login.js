import {useEffect, useState} from "react";
import { Box, Typography, TextField, Button, Link, Input} from '@mui/material';

function Login() {
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+/g;
    const checkPw = /^[A-Za-z0-9_-]{2,8}$/;

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

    const onSubmit = (event) => {
        if(email.length === 0 || emailErr) {
            event.preventDefault();
            setEmailErr(true);
        }
        if(pw.length === 0 || pwErr) {
            event.preventDefault();
            setPwErr(true);
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
                        label="password"
                        variant="standard"
                        value={pw}
                        error={pwErr}
                        helperText={pwErr ? '비밀번호를 2글자 이상 8글자 이하로 입력해주세요' : ''}
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

                    <Link underline="none" href="/user/singin" sx={{color : '#6c757d', mr : 2}}>
                        회원가입
                    </Link>
                    <Link underline="none" href="/user/findPw"  sx={{color : '#6c757d'}}>
                        비밀번호 찾기
                    </Link>
                </Box>

        </Box>
    </Box>
}

export default Login;