const addButton = document.getElementById('addButton');
const dateInput = document.getElementById('date');
const amountInput = document.getElementById('amount');
const itemInput = document.getElementById('expense');
const tableBody = document.getElementById('body');


addButton.addEventListener('click',addItemToTable,false);


















function addItemToTable(e){
    e.preventDefault();

    if (dateInput.value != '' && amountInput.value != '' && itemInput.value != '' ) {
        const newTr = document.createElement('tr');
        for(let i = 0;i<4;i++){
            let newTd = document.createElement('td');
            newTr.appendChild(newTd);
        }

        newTr.lastChild.setAttribute('class', 'categoryTd');
        
        newTr.firstChild.appendChild(document.createTextNode(dateInput.value));
        newTr.firstChild.nextSibling.appendChild(document.createTextNode(amountInput.value));
        newTr.lastChild.previousSibling.appendChild(document.createTextNode(itemInput.value));
        let newText = document.createTextNode('No Category');

        let trashSpan = document.createElement('span');
        let trashIcon = document.createElement('i');
        trashIcon.setAttribute('class', 'fas fa-trash-alt');
        trashSpan.appendChild(trashIcon);

        let pencilSpan = document.createElement('span');
        let pencilIcon = document.createElement('i');
        pencilIcon.setAttribute('class', 'fas fa-pencil-alt');
        pencilSpan.appendChild(pencilIcon);

        let tagSpan = document.createElement('span');
        let tagIcon = document.createElement('i');
        tagIcon.setAttribute('class', 'fas fa-tag');
        tagSpan.appendChild(tagIcon);

        newTr.lastChild.appendChild(newText);
        newTr.lastChild.appendChild(tagSpan);
        newTr.lastChild.appendChild(pencilSpan);
        newTr.lastChild.appendChild(trashSpan);

        tableBody.appendChild(newTr);

        dateInput.value = '';
        amountInput.value = '';
        itemInput.value = '';

    } else {
        alert('All fields must be populated');
    }
    

}