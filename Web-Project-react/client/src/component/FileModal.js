import { useState } from 'react';
import { Box, Modal, Typography, IconButton, Divider, InputBase, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactSummernote from 'react-summernote';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: 'background.paper',
    borderRadius : '5px',
    boxShadow: '0 3px 9px rgb(0 0 0 / 50%)',
    p: 2,
  };


function FileModal({open, setOpen}) {
  const [disable, setDisable] = useState(true);
  
  const handleClose = () => {
    setOpen(false);
  }

  
  const download = function(url, name) {
    console.log('download', this);
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
          console.log('blob', blob);
          const blobURL = URL.createObjectURL(blob);

          console.log('blobURL', blobURL)

          const down = document.createElement('a');
          down.download = name;
          down.href = blobURL;
          down.style.display = 'none';
          down.click();
          down.remove();
          URL.revokeObjectURL(blobURL);
    });                

  }

  const createNode = (url, name) => {
    const node = document.createElement('div');
    node.style.color = '#6c757d';
    node.style.display = 'inline-block';
    node.style.marginBottom = '8px';
    node.style.border = '1px solid #d3d3d3';
    node.style.borderRadius = '2px';
    node.innerHTML = `<input 
      class='file'
      type="text" 
      style="padding : 6px; border:0px;" 
      value="${name}" 
      readonly />
      `;
    node.onclick = function() {download(url, name)}

    return node;
  }


  const attachFile = async () => {
    console.log('파일 첨부');
    const input = document.getElementById('fileAttach');
    const data = new FormData();

    for(let file of input.files) {
      console.log('file', file);
      data.append('file', file);
    }

    const res = await axios.post('/upload/files', data, {
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
    });

    if(res.statusText === 'OK') {
      console.log('res.data', res.data);
    }
    if(res.data === 'error') {
      alert('오류가 발생 했습니다.');
    }
    else {
      setOpen(false);

      for(let i = 0; i < res.data.url.length; i++) {
        const node = createNode(res.data.url[i], res.data.name[i]);
        console.log('node', node);
        ReactSummernote.insertNode(node);
      }
    }
  }

  const handleDisable = (e) => {
    if(e.target.value === '') {
      setDisable(true);
    }
    else {
      setDisable(false);
    }
  }  

    return (
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
              <Box 
                component='div' 
                id='modalHead' 
                sx={{
                  display : 'flex', 
                  justifyContent : 'space-between', 
                  mb : 1.5,
                  width : '100%'
                }}
              >
                <Typography  variant='h4' component="div">
                  파일 업로드
                </Typography>

                <IconButton id="btnClose" onClick={handleClose} >
                  <CloseIcon />
                </IconButton >
              </Box>

              <Divider />

              <Box component='div' id='modalBody' sx={{my : 1.5, width : '100%'}}>
                <label htmlFor='fileAttach' style={{marginBottom : '4px', fontWeigth : 500}}>파일 선택</label>
                <input 
                  id='fileAttach'
                  type='file'
                  name='file'
                  onChange={handleDisable}
                  style={{width : '100%'}} 
                  multiple
                />
              </Box>

              <Divider />

              <Box component='div' id='modalFooter' sx={{mt : 1.5, width : '100%'}}>
                <Button 
                  id='attach'
                  variant='contained'
                  type='submit'
                  disabled={disable}
                  onClick={attachFile}
                  sx={{
                    ml : '391px'
                  }}
                >
                  파일 첨부
                </Button>
              </Box>
          </Box>
        </Modal>
    )

}

export default FileModal;