import { useState } from 'react';
import { Box, Modal, Typography, IconButton, Divider, InputBase, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

  const attachFile = () => {
    console.log('파일 첨부')
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
                <InputBase 
                  id='fileAttach'
                  type='file'
                  name='file'
                  onChange={handleDisable}
                  sx={{width : '100%'}} 
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