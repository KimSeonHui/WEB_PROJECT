import axios from 'axios';
import { useState } from 'react';
import {Button, InputBase, Grid } from "@mui/material";

function Rename({name, uid}) {
    const [word, setWord] = useState('');

    const onChange = (e) => {
        setWord(e.target.value)
    }

    const sendNewName = async () => {
        if(word.length < 2 || word.length > 6) {
            alert('이름은 2자 이상, 6자 이하로 설정하세요.');
            return false;
        }
        
        const res = await axios.post('/setting/user/admin', {
            rename : word,
            uid : uid
        });

        if(res.statusText === 'OK') {
            console.log('rename data', res.data);

            if(res.data === 'rename'){
                alert('이름이 변경되었습니다.');
                window.location.href = `/setting/user?order=UID&page=1`
            }
        }
    }

    return <Grid container spacing={2}>
        <Grid item xs={8}>
            <InputBase
                name='renameForm'
                placeholder={`${name}`}
                value={word}
                onChange={onChange}
                sx={{
                    width : '100%',
                    border : 1, 
                    borderRadius: '6px', 
                    borderColor : '#d3d3d3',
                    py : 1,
                    pl : 1
                }}
            />;
        </Grid>
        <Grid item xs={4}>
            <Button
                variant="outlined"
                type='button' 
                onClick={sendNewName}
                sx={{
                    width : '100%',
                    mt : 0.5,
                    py : 1
                }}
            >
                확인
            </Button>
        </Grid>
    </Grid>
}

export default Rename;