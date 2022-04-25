import React from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-ko-KR'; // you can import any other locale
import axios from 'axios';

// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
//import '../summernoteStyle.scss'


function SummernoteEditor({setDesc}) {
  const onChange = (content) => {
    setDesc(content);
  };

  const onImageUpload = async (files) => {   
    for(let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        ReactSummernote.insertImage(reader.result);
      }
      reader.readAsDataURL(files[i]);
    }
    
    //FormData() 사용해 서버에 저장하는 방법 - 서버에 저장한 url로 이미지 불러올 수가 x
    // const data = new FormData();
    // data.append('file', fileList[0]);

    // const res = await axios.post('/upload/images', data, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });

    // if(res.statusText === 'OK') {
    //   console.log('res.data', res.data.url);

    //   if(res.data === 'error') {
    //     alert('오류가 발생 했습니다.');
    //   }
    //   else {
    //     ReactSummernote.insertImage(`../../server/public/${res.data.url}`);
    //   }
    // }
  }

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
              ['insert', ['link', 'picture', 'video']],
              ['view', ['fullscreen', 'codeview']]
            ]
          }}
          onChange={onChange}
          onImageUpload={onImageUpload}
        />
      </div>  
      );

}

export default SummernoteEditor;
