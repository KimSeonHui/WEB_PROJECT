import axios from "axios";
import {useState} from "react";
import { Box, Typography, TextField, Button, Link } from '@mui/material';

function Signup() {
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+/g;
    const checkPw = /^[A-Za-z0-9_-]{8,20}$/;
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
        if(name.length < 2 || name.length > 6 || nameErr) {
            setNameErr(true);
            alert('이름은 2자 이상, 6자 이하로 설정하세요.');
            return false;
        }  
        const res = await axios.post('/user/signup', {
                username : name,
                emails : email,
                password : pw
        })
        
        if(res.statusText === 'OK') {
            if(res.data === 'exUser') {
                alert('이미 가입되어 있는 이메일 또는 이름입니다.\n다시 입력해 주세요.');
                window.location.href = `../user/signup`;
            }
            else if(res.data === 'signup') {
                alert("회원가입이 완료되었습니다:) 다시 로그인 해주세요.");
                window.location.href = `../user/login`;
            }
            else if(res.data === 'error') {
                alert("잘못된 양식 입니다. 다시 입력해 주세요.");
                window.location.href = "../user/signup";
            }
            else if(res.data === 'DBerror') {
                alert('DB 접속 오류');
                window.location.href = "../user/signup";
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

export default Signup;