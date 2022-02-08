import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-ko-KR'; // you can import any other locale

// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
//import 'bootstrap/dist/css/bootstrap.css';
import '../summernoteStyle.scss'


function SummernoteEditor() {
  const onChange = content => {
    console.log("onChange ", content);
  };

    return (
      <div className='use-bootstrap'>
        <ReactSummernote
          value="Default value"
          options={{
            lang: 'ko-KR',
            height: 350,
            dialogsInBody: false,
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
        />
      </div>  
      );

}

export default SummernoteEditor;

// import React, { Component } from "react";
// import ReactSummernote from "react-summernote";
// import "react-summernote/dist/react-summernote.css"; // import styles

// // Import bootstrap(v3 or v4) dependencies
// import "bootstrap/js/modal";
// import "bootstrap/js/dropdown";
// import "bootstrap/js/tooltip";
// import "bootstrap/dist/css/bootstrap.css";

// export default class SummernoteEditor extends Component {
//   onChange = (content) => {
//     console.log("onChange", content);
//   };
//   render() {
//     return (
//       <ReactSummernote
//         options={{
//           disableDragAndDrop: true,
//           height: 200,
//           toolbar: [
//             ["style", ["style"]],
//             ["font", ["bold", "underline", "clear"]],
//             ["fontname", ["fontname"]],
//             ["para", ["ul", "ol", "paragraph"]],
//             ["table", ["table"]],
//             ["insert", ["link", "picture", "video"]],
//             ["view", ["fullscreen", "codeview"]]
//           ]
//         }}
//         onChange={this.onChange}
//       />
//     );
//   }
// }