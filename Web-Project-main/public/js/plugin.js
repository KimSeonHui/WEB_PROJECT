var info = {};

(function() {
     // iframe 사용 - 독립적 css 적용, 검색(??)
    console.log('생성 ui');
    if(!document.getElementById('frame')) {
        const frame = document.createElement('iframe');
        frame.id = "frame";
        frame.style.boxShadow = '0 1rem 3rem rgba(0, 0, 0, 0.175)';
        frame.style.position = 'fixed';
        frame.style.right = '30px';
        frame.style.bottom = '30px';
        frame.style.width = '350px';
        frame.style.height = '650px';
        frame.style.display = 'none';
        frame.style.borderRadius = '5%';
        frame.style.backgroundColor = '#fff';
        frame.style.zIndex = '10000';

        document.body.append(frame);
    }

    const iframe = document.getElementById('frame');
    const frameDocument = iframe.contentDocument;
    frameDocument.open();
    frameDocument.write(`<script async src="/js/multi-window-plugin-core.js"></script>`);
    frameDocument.write(`<!DOCTYPE html>
        <html><head><meta charset="utf-8">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" 
        integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
        <link href="/css/styles.css" rel="stylesheet"></head>
        <body class="show-scroll"><div id="multiWindow" name="multiWindow">
            <div class="container container p-2  d-flex flex-column" id="container" name="container"></div>
        </div></body></html>`);
        
    frameDocument.close();   
})();