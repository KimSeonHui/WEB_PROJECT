export function getColumnIndex(tableRow, col) {
    let index = 0;
    
    for(let i = 0; i < tableRow.children.length; i++) {
        if(tableRow.children[i].innerText === col) {
            index = i;
        }
    }
    return index;
}

export function getEmails(tableRow, checkbox) {
    const emails = [];
    const index = getColumnIndex(tableRow, '이메일');

    const checked = checkbox;
    for(let node of checked) {
        const selectedTr = node.parentNode.parentNode.parentNode;
        emails.push(selectedTr.children[index].innerText);
    }
    return emails;
}
