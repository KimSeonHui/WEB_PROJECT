import ReactDOM from 'react-dom'


function MultiWindowSearch({children, frameDoc}) {
    let ele = null;
    console.log('frameDoc', frameDoc)

    if(frameDoc !== null) {
        console.log('frameDoc not null', frameDoc)
        ele = frameDoc.querySelector('#container');

        console.log('ele', ele)
        return ReactDOM.createPortal(children, ele) ;
    }

    return null;

}

export default MultiWindowSearch;

 