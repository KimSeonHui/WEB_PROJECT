import axios from "axios";
import {useState} from "react";
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

function FindPw() {
    const checkEmail = /[\w\-\.]+\@[\w\-\.]+/g;
    const checkCode = /[0-9]/;

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [code, setCode] = useState('');
    const [codeErr, setCodeErr] = useState(false);

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        if(checkEmail.test(email)) {
            setEmailErr(false);
        }
        else {
            setEmailErr(true);
        }
    }

    const onChangeCode = (event) => {
        setCode(event.target.value);
        if(checkCode.test(code)) {
            setCodeErr(false);
        }
        else {
            setCodeErr(true);
        }
    }

    const sendCode = () => {
        console.log('click');
        if(email.length === 0 || emailErr) {
            setEmailErr(true);
            return false;
        }
        
        const timer = document.getElementById('timer');
        timer.style.display = 'block';
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(email.length === 0 || emailErr) {
            setEmailErr(true);
            return false;
        }
        if(code.length === 0 || codeErr) {
            setCodeErr(true);
            return false;
        }    

        const res = await axios.post('/user/findpw', {
            email : email,
            code : code
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
                    비밀번호 찾기
                </Typography>

                <Box
                    component="form"
                    sx={{
                        width : '100%',
                        textAlign : 'center',
                        p : 3
                    }}
                    noValidate
                    autoComplete="off"
                    action="/user/findpw"
                    method="post"
                    className="needs-validation"
                    onSubmit={onSubmit}    
                >
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12}>
                        <TextField  
                            required
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            error={emailErr}
                            helperText={emailErr ? '이메일이 유효하지 않습니다.' : ''}
                            onChange={onChangeEmail}
                            sx={{width : '100%'}}
                        />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField  
                                required
                                id="password"
                                name="password"
                                label="인증번호"
                                variant="outlined"
                                type="text"
                                value={code}
                                error={codeErr}
                                helperText={codeErr ? '인증 번호를 입력해주세요.' : ''}
                                onChange={onChangeCode}
                                sx={{
                                    width : '100%', 
                                    mt : 3, 
                                    mb : 3, 
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button 
                                variant="contained" 
                                type="button"
                                onClick={sendCode}
                                sx={{
                                    width : '100%',
                                    mt : 3.5,
                                    mb : 2,
                                    py : 1.5, 
                                    backgroundColor : '#0186D3'
                                }}>
                                인증번호 전송
                            </Button>
                        </Grid>
                        <Grid item xs={2} >
                            <Typography 
                                id='timer'
                                variant='h5' 
                                component="p" 
                                gutterBottom
                                sx={{
                                    mt : 4.5, 
                                    mb : 2, 
                                    verticalAlign : 'center',
                                    display : 'none'
                                }}
                            >
                                3:00
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button 
                        variant="contained" 
                        type="submit"
                        sx={{
                            width :'100%', 
                            mt : 5,
                            mb : 2, 
                            py : 2, 
                            backgroundColor : '#0186D3'
                        }}>
                        확인
                    </Button>
                    <br />
                </Box>
            </Box>
        </Box>
}

export default FindPw;