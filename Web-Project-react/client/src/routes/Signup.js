import {useState} from "react";
import { Box, Typography, TextField, Button, Link } from '@mui/material';

function Login() {
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+/g;
    const checkPw = /^[A-Za-z0-9_-]{2,8}$/;
    const checkName = /^[가-힣A-Za-z]{2,4}$/;

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [pwErr, setPwErr] = useState(false);
    const [nameErr, setNameErr] = useState(false);

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

    const onChangeName = (event) => {
        setName(event.target.value);
        if(checkName.test(name) || name.length === 0) {
            setNameErr(false);
        }
        else {
            setNameErr(true);
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
        if(name.length === 0 || nameErr) {
            event.preventDefault();
            setNameErr(true);
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
                    Sign up to company
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
                        id="username"
                        label="User name"
                        variant="outlined"
                        name="username"
                        value={name}
                        error={nameErr}
                        helperText={nameErr ? '이름이 유효하지 않습니다.' : ''}
                        onChange={onChangeName}
                    />
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
                        helperText={pwErr ? '비밀번호를 2글자 이상 8글자 이하로 입력해주세요' : ''}
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

export default Login;