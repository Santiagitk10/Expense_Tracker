const addButton = document.getElementById('addButton');
const dateInput = document.getElementById('date');
const amountInput = document.getElementById('amount');
const itemInput = document.getElementById('expense');
const tableBody = document.getElementById('body');


addButton.addEventListener('click',addItemToTable,false);



function addItemToTable(e){
    e.preventDefault();
    console.log('here');
    const newTr = document.createElement('tr');
    for(let i = 0;i<4;i++){
        let newTd = document.createElement('td');
        newTr.appendChild(newTd);
    }
    
    newTr.firstChild.appendChild(document.createTextNode(dateInput.textContent));
    newTr.firstChild.nextSibling.appendChild(amountInput.textContent);
    newTr.lastChild.previousSibling.appendChild(itemInput.textContent);
    let newText = document.createTextNode('No Category');
    newTr.lastChild.appendChild(newText);

    tableBody.appendChild(newTr);

}