import {useEffect, useState} from "react";
import { Box, Typography, TextField, Button, Link, Input} from '@mui/material';

function Login() {
    const checkValidation = (event) => {
        const email = document.getElementById('email');
        const pw = document.getElementById('password');

        console.log('email', email.value, ' pw', pw.value)
        if(email.value === '' || pw.value === '') {
            event.preventDefault();
            console.log('이메일 또는 비밀번호가 유효하지 않습니다.');
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
                    height: '70vh',
                    width : '40vw',
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
                    onSubmit={checkValidation}
                    >
                    <TextField  
                        required
                        id="email"
                        label="Email adress"
                        variant="standard"
                    />
                    <TextField  
                        required
                        id="password"
                        label="password"
                        variant="standard"
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