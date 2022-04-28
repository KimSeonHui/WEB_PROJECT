import React, { useState } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-ko-KR'; // you can import any other locale
import axios from 'axios';
import $ from 'jquery';
import FileModal from './FileModal';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
//import '../summernoteStyle.scss'


function SummernoteEditor({setDesc}) {
  const [open, setOpen] = useState(false);

  const onChange = (content) => {
    setDesc(content);
  };

  const onImageUpload = async (files) => {   
    const data = new FormData();

    for(let i = 0; i < files.length; i++) {
      data.append('file', files[i]);
    }

 
    const res = await axios.post('/upload/images', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if(res.statusText === 'OK') {
      console.log('res.data', res.data.url);

      if(res.data === 'error') {
        alert('오류가 발생 했습니다.');
      }
      else {
        for(let url of res.data.url) {
          ReactSummernote.insertImage(`${url}`);
        }
      }
    }
  }

  const fileUploadButton = function () {
    const ui = $.summernote.ui;

    const button = ui.button({
        contents: '파일',
        tooltip: '파일 업로드',
        container: 'body',
        click: function() {
          setOpen(true);                                                                      
        }
    }); 
    return button.render();
  };     

    return (
      <div className='use-bootstrap'>
        <ReactSummernote
          value="내용을 입력해 주세요"
          options={{
            lang: 'ko-KR',
            height: 350,
            dialogsInBody: true,
            toolbar: [
              ['style', ['style']],
              ['font', ['bold', 'underline', 'clear']],
              ['fontname', ['fontname']],
              ['para', ['ul', 'ol', 'paragraph']],
              ['table', ['table']],
              ['insert', ['link', 'picture', 'video', 'file']],
              ['view', ['fullscreen', 'codeview']]
            ],
            buttons: {
              file: fileUploadButton
            }
          }}
          onChange={onChange}
          onImageUpload={onImageUpload}
        />

          <FileModal open={open}  setOpen={setOpen} />
      </div>  
      );

}

export default SummernoteEditor;
