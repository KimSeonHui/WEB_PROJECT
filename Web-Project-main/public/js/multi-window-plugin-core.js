(function() {    
    if(window.parent.multiWindowInitialized) {
        MultiWindow();
        reposition();
    }
})();    

function customStyle() {
    const btn = parent.document.getElementById('btnControll');
    const svg = parent.document.getElementById('svg');

    console.log('custom.arg ', parent.buttonCustom.arg);
    for(let i = 0; i < parent.buttonCustom.arg.length; i++) {
        let func = parent.buttonCustom.arg[i][0];
        let val = parent.buttonCustom.arg[i][1];

        
        console.log(`func${i} : ${func}`);
        console.log('val'+ i , val);

        switch(func) {
            case 'setPosition' :
                if(val.horizontal < 0 || val.horizontal > 200) {
                    alert('0 ~ 200까지만 가능합니다. 값을 다시 입력해 주세요');
                    return false;
                }
                if(val.vertical < 0 || val.vertical > 200) {
                    alert('0 ~ 200까지만 가능합니다. 값을 다시 입력해 주세요');
                    return false;
                }

                if(val.position === 'left') {
                    btn.style.left = `${val.horizontal}px`;
                    btn.style.bottom = `${val.vertical}px`;
                    parent.frame.style.left = '30px';
                }
                else {
                    btn.style.right = `${val.horizontal}px`;
                    btn.style.bottom = `${val.vertical}px`;
                    parent.frame.style.right = `30px`;
                }
                break;
    
            case 'setColor' :
                btn.style.color = val.color;
                btn.style.borderColor = val.color;
                svg.style.fill = val.color;
                break;
    
            case 'setBackgroundColor' :
                btn.style.backgroundColor = val.color;
                break;
            
            case 'setBorderColor' :
                btn.style.borderColor = val.color;
                break;
            
            case 'hideBorder' :
                btn.style.border = 'none';
                break;
            
            case 'hideIcon' :
                svg.style.display = 'none';
                break;

            case 'setText' :
                btn.childNodes[0].nodeValue = val.text;
                break;
            
            case 'setIcon' :
                if(val.d) {
                    while(svg.hasChildNodes()) {
                        svg.removeChild(svg.firstElementChild);
                    }
                    for(let i = 0; i < val.d.length; i++) {
                       const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                       path.setAttribute('d', val.d[i]);
                       svg.appendChild(path);
                    }
                }
                svg.setAttribute('viewBox', val.viewBox);
                break;
            
            case 'setIconColor' : 
                svg.style.fill = val.color;
                break;
        }
    }
}

function MultiWindow() {
    console.log('inner ui 생성');

    if(!parent.document.getElementById('btnControll')) {
        const btn = document.createElement('button');
        btn.id = 'btnControll';
        btn.innerText = '빠른 검색';
        btn.type = 'button';
        btn.style.display = 'inline-block';
        btn.style.fontWeight = '400';
        btn.style.lineHeight = '1.5';
        btn.style.textAlign = 'center';
        btn.style.textDecoration = 'none';
        btn.style.verticalAlign = 'middle';
        btn.style.cursor = 'pointer';
        btn.style.backgroundColor = '#fff';
        btn.style.border = '0.125rem solid transparent';
        btn.style.borderColor = '#2c3e50';
        btn.style.color =   '#2c3e50';
        btn.style.padding = '0.375rem 0.75rem';
        btn.style.fontSize = '1rem';
        btn.style.borderRadius = '0.5rem';
        btn.style.transition = 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out';
        btn.style.position = 'fixed';
        btn.style.zIndex = '10000';
        btn.style.right = '30px';
        btn.style.bottom = '30px';

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('viewBox', '0 0 512 512');
        svg.style.fill = btn.style.color;
        svg.style.width = '23px';
        svg.style.paddingLeft = '6px';
        svg.style.paddingBottom = '4px';
        svg.id = 'svg';
        btn.appendChild(svg);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0
        208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7
        17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
        0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128
         128z`);
        svg.appendChild(path);

        parent.document.body.append(btn);

        if(parent.buttonCustom.arg.length > 0) {
            customStyle();
        }
    }        
    
    const container = document.getElementById('container');
    container.appendChild(createTop(parent.info.name));
    container.appendChild(createSearch());        
}     

function createTop(name) {
    const clearFixDiv = document.createElement('div');
    clearFixDiv.classList.add('clearfix', 'p-2');

    const h5 = document.createElement('h5');
    h5.classList.add('float-start', 'p-1');
    h5.innerText = name;
    clearFixDiv.appendChild(h5);


    const button = document.createElement('button');             
    button.classList.add('btn', 'float-end', 'p-0');
    button.id = 'btnClose';
    clearFixDiv.appendChild(button);

    const i = document.createElement('i');
    i.classList.add('text-primary', 'fas', 'fa-times', 'fa-lg');
    button.appendChild(i);
    
    return clearFixDiv;
}



function createSearch() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('shadow', 'container', 'my-2');
    containerDiv.id = 'search';
    containerDiv.style.borderRadius = '5%';
    containerDiv.style.width = '100%';

    const h6 = document.createElement('h6');
    h6.classList.add('py-3');
    h6.innerText = '검색';
    containerDiv.appendChild(h6);

    const form = document.createElement('form');
    form.classList.add('pb-3');
    form.action = '/search/multi';
    form.method = 'GET';
    form.onsubmit = search;
    form.id = 'multiSearchForm';
    containerDiv.appendChild(form);

    const formDiv = document.createElement('div');
    formDiv.classList.add('mb-2');
    formDiv.style.width = '100%';
    form.appendChild(formDiv);

    const inputSearch = document.createElement('input');
    inputSearch.classList.add('form-control', 'multiSearchArea');
    inputSearch.type = 'text';
    inputSearch.placeholder = 'Search';
    inputSearch.ariaLabel = 'Search';
    inputSearch.name = 'key';
    inputSearch.id = 'multiSearchInput';
    inputSearch.autocomplete = 'off';
    inputSearch.onkeyup = createAutoComplete;
    formDiv.appendChild(inputSearch);

    const searchResult = document.createElement('ul');
    searchResult.classList.add('dropdown-menu', 'multiSearchArea');
    searchResult.id = 'searchResult';
    searchResult.style.display = 'none';
    formDiv.appendChild(searchResult);

    const btnSearch = document.createElement('button');
    btnSearch.classList.add('btn', 'px-3', 'text-light', 'mb-3');
    btnSearch.id = 'btnSearch';
    btnSearch.setAttribute('type', 'submit');
    btnSearch.style.width = '100%';
    btnSearch.innerText = 'Search';
    btnSearch.style.backgroundColor = "#003964";
    form.appendChild(btnSearch);

    return containerDiv;
}

function createMovePageButton(text) {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'bg-primary', 'text-white', 'm-3', 'float-end');
    btn.id = 'btnMovePage';
    btn.innerText = text;
    btn.onclick = movePage;

    return btn;
}

function createTable(data) {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('ms-2');
    containerDiv.id = 'result';

    const clearFixDiv = document.createElement('div');
    clearFixDiv.classList.add('clearfix');
    containerDiv.appendChild(clearFixDiv);

    const h6 = document.createElement('h6');
    h6.classList.add('py-3' , 'text-muted', 'float-start');
    h6.innerText = '검색 결과';
    clearFixDiv.appendChild(h6);

    clearFixDiv.appendChild(createMovePageButton('검색창 보기'));

    const table = document.createElement('table');
    table.classList.add('table', 'table-hover');
    containerDiv.appendChild(table);

    const thead = document.createElement('thead');
    thead.classList.add('table-secondary', 'text-white');
    table.appendChild(thead);

    const theadTr = document.createElement('tr');
    thead.appendChild(theadTr);

    const tdPid = document.createElement('td'); 
    const tdTitle = document.createElement('td'); 
    const tdCreater = document.createElement('td'); 
    const tdDate = document.createElement('td'); 
    tdTitle.innerText = '제목';
    tdCreater.innerText = '작성자';
    tdDate.innerText = '작성일';

    theadTr.appendChild(tdPid);
    theadTr.appendChild(tdTitle);
    theadTr.appendChild(tdCreater);
    theadTr.appendChild(tdDate);

    const tbody = document.createElement('tbody');
    tbody.id = 'tbody';
    table.appendChild(tbody);
    
    if(typeof data !== 'string') {
        for(let i = 0; i < data.length; i++) {
        tbody.appendChild(appendRow(data[i]));
        }
    }
    else {
        tbody.appendChild(appendRow(data));
    }
    return containerDiv;
}

function appendRow(data) {
    const tr = document.createElement('tr');

    if(typeof data !== 'string'){
        const pid = document.createElement('td');
        const title = document.createElement('td'); 
        const creater = document.createElement('td'); 
        const date = document.createElement('td'); 
        pid.innerText = data.POSTID;
        creater.innerText = data.CREATER;
        date.innerText = data.ADDTIME;

        const a = document.createElement('a');
        title.appendChild(a);
        a.href = `/read/${data.POSTID}`;
        a.innerText = data.TITLE;
        a.target = '_blank';
        a.onclick = openWindow;

        tr.appendChild(pid);
        tr.appendChild(title);
        tr.appendChild(creater);
        tr.appendChild(date);
    }
    else {
        const td = document.createElement('td');
        td.classList.add('text-center', 'text-muted');
        td.colSpan = '4';
        td.innerText = data;

        tr.appendChild(td);
    }
    return tr;
}

function createMoveTopButton() {
    const a = document.createElement('a');
    a.classList.add('btn', 'bg-primary', 'text-white', 'm-3', 'ms-auto');
    a.id = 'btnMoveTop';
    a.href = '#btnClose';
    a.innerText = 'TOP';
    a.style.width = '30%';

    const i = document.createElement('i');
    i.classList.add('fas', 'fa-sort-up', 'pe-2', 'fa-lg');
    i.style.position = 'relative';
    i.style.top = '5px';
    a.prepend(i);


    return a;
}

function openWindow() {
    window.open(this.href, '_blank', 'width=1200, height=800');
}

function search() {      
    sendAjax();
    return false;
}

function serializeFormData() {
    const allInput = document.querySelectorAll('#multiSearchForm input');
    let data = '';

    for(let i = 0; i <allInput.length; i++) {
        data += `${allInput[i].name}=${allInput[i].value}`
    }
    console.log(data);    
    return data;
}

function sendAjax() {
    const data = serializeFormData();

    return fetch(`/search/multi?${data}`)
    .then(res => res.json())
    .then(result => {
        console.log('fetch test', result);
        document.getElementById('search').remove();
        container.appendChild(createTable(result));
        container.appendChild(createMoveTopButton());
    })
    .catch(err => {
        alert('검색에 실패했습니다');
        console.log('error ', err);
    })
}

function movePage() {
    const result = document.getElementById('result');
    const btnMoveTop = document.getElementById('btnMoveTop');
    result.remove();
    btnMoveTop.remove();
    container.appendChild(createSearch());
}

function hasScroll() {
    return parent.document.documentElement.scrollHeight > parent.document.documentElement.clientHeight;
}

function reposition() {
    if(hasScroll()) {
        console.log('reposition');
        const btnControll = parent.document.getElementById('btnControll');
        btnControll.style.right = '150px';
        parent.frame.style.right = '150px';
    }
}

//조작 이벤트
const btncontroll = parent.document.getElementById('btnControll');
const svg = parent.document.getElementById('svg');
let svgColor = null;
btncontroll.addEventListener('click', function() {
    this.style.display = 'none';
    parent.frame.style.display = 'block';
});

btncontroll.addEventListener('mouseover', function() {
    const temp = this.style.backgroundColor;
    this.style.backgroundColor = this.style.color;
    this.style.color = temp;
    svgColor = svg.style.fill;
    svg.style.fill = this.style.color;
});

btncontroll.addEventListener('mouseout', function() {
    const temp = this.style.backgroundColor;
    this.style.backgroundColor = this.style.color;
    this.style.color = temp;
    svg.style.fill = svgColor;
});

const btnClose = document.getElementById('btnClose');
btnClose.addEventListener('click', function() {
    parent.frame.style.display = 'none';
    btncontroll.style.display = 'block';
});

//search auto complete
let targetNum = 0;
function createAutoComplete(e) {
    const searchInput = document.getElementById('multiSearchInput');
    const searchResult = document.getElementById('searchResult');
    const searchForm = document.getElementById('multiSearchForm');
    const page = document.getElementsByTagName('html')[0];

    if(e.key === 'ArrowDown') {
        if(targetNum >= 10) {
            targetNum = 0;
        }
        for(let i = 0; i < searchResult.children.length; i++) {
            if(i === targetNum) {
                searchResult.children[targetNum].classList.add('selected');
                searchInput.value = searchResult.children[targetNum].innerText;
            }
            else {
                searchResult.children[i].classList.remove('selected');
            }
        }    
        targetNum++;  
    }
    else if(e.key === 'ArrowUp') {    
        if(targetNum > 1){
            targetNum--; 
        } 
        else {
            targetNum = 10;
        }
        for(let i = 0; i < searchResult.children.length; i++) {
            if(i === targetNum-1) {
                searchResult.children[targetNum-1].classList.add('selected');
                searchInput.value = searchResult.children[targetNum-1].innerText;
            }
            else {
                searchResult.children[i].classList.remove('selected');
            }
        }  
    }
    else {
        autoCompleteAjax();
    }

    function autoCompleteAjax() {
        let data = `keyword=${searchInput.value}`;
        
        return fetch(`/search/auto?${data}`)
        .then(res => res.json())
        .then(result => {
            console.log(result);

            createResult(result);
            toggleUI();
        })
        .catch(err => {
            alert('검색에 실패했습니다');
            console.log('error', err);
        })
    }
    
    function createResult(data) {
        if(searchResult.children.length < 10) {
            appendResult(data);
        }
        else {
            while(searchResult.hasChildNodes()) {
                searchResult.removeChild(searchResult.firstElementChild);
            }
            targetNum = 0;
            appendResult(data)
        }
    }
    
    function appendResult(data) {
        for(let i = 0; i < data.title.length; i++) {
            const li = document.createElement('li');
            li.classList.add('dropdown-item', 'multiSearchArea');
            li.innerText = data.title[i];
            li.onclick = addClickEvent;
            searchResult.appendChild(li);           
        }
    }

    function addClickEvent() {
        searchInput.value = this.innerText;
        searchForm.onsubmit();
    }
    
    function toggleUI() {
        if(searchInput.value.length === 0) {
            searchResult.style.display = 'none';
            while(searchResult.hasChildNodes()) {
                searchResult.removeChild(searchResult.firstElementChild);
            }
        }
        else {
            searchResult.style.width = `${searchResult.parentElement.offsetWidth}px`;
            searchResult.style.display = 'block';
        }
    }

    page.addEventListener('click', function(e) {
        if(!e.target.classList.contains('multiSearchArea') ) {
            searchResult.style.display = 'none';
            while(searchResult.hasChildNodes()) {
                searchResult.removeChild(searchResult.firstElementChild);
            }
        }
    });
}