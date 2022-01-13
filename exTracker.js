const addButton = document.getElementById('addButton');
const manCatBtn = document.getElementById('manCategories');
const dateInput = document.getElementById('date');
const amountInput = document.getElementById('amount');
const itemInput = document.getElementById('expense');
const tableBody = document.getElementById('body');
const trashIcons = document.getElementsByClassName('fas fa-trash-alt');
const editIcons = document.getElementsByClassName('fas fa-pencil-alt');
const tagIcons = document.getElementsByClassName('fas fa-tag');
const form = document.getElementById('form');
let editTarget;
let categories = ['Comida', 'Transporte'];




addButton.addEventListener('click', addItemToTable,false);
tableBody.addEventListener('mouseover', showOptions,false);
tableBody.addEventListener('mouseout', hideOptions,false)
manCatBtn.addEventListener('click', function(){
    let msg = '<div class="header"><a id="close" href="#">close X</a></div>';
    msg += '<button id="CategoryCreation">Create Category</button><button id="CategoryDisplay">Show Categories</button>';
    let note = document.createElement('div');
    note.setAttribute('id','note');
    note.innerHTML = msg;
    document.body.appendChild(note);

    let elClose = document.getElementById('close');
    elClose.addEventListener('click', dismissNote,false);

    let showCategoriesBtn = document.getElementById('CategoryDisplay');
    showCategoriesBtn.addEventListener('click', listCategories,false);

}, false);


tableBody.addEventListener('DOMNodeInserted', function (){
        addListeners(trashIcons,deleteItem);
        addListeners(editIcons, startEditItem);
        addListeners(tagIcons, addTag);
    },false);



function addTag(){

};    


function listCategories(){
    let categoryList = document.createElement('ul');
    for(let i = 0; i<categories.length;i++){
        let newLi = document.createElement('li');
        newLi.textContent = categories[i];
        categoryList.appendChild(newLi);
    }

    note.appendChild(categoryList);
}


function dismissNote() {
    document.body.removeChild(note);
}


function cancelEdit(){
    dateInput.value = '';
    amountInput.value = '';
    itemInput.value = '';

    //Creating and removing a tr node to activate the listener DOMNodeInserted in the table to add again the listeners for the icons
    if(dateInput.value === '' && amountInput.value  === '' && itemInput.value === ''){
        let newTr = document.createElement('tr');
        tableBody.appendChild(newTr);
        tableBody.removeChild(newTr);
    }

    addButton.disabled = false;
    manCatBtn.disabled = false;
    form.removeChild(document.getElementById('editSpan'));
}


function editItem(e){
    e.preventDefault();
    if(dateInput.value != '') editTarget.parentNode.parentNode.parentNode.previousSibling.previousSibling.previousSibling.textContent = dateInput.value;
    if (amountInput.value != '') editTarget.parentNode.parentNode.parentNode.previousSibling.previousSibling.textContent = amountInput.value;
    if(itemInput.value != '') editTarget.parentNode.parentNode.parentNode.previousSibling.textContent = itemInput.value;

    //Creating and removing a tr node to activate the listener DOMNodeInserted in the table to add again the listeners for the icons
    if(dateInput.value === '' && amountInput.value  === '' && itemInput.value === ''){
        let newTr = document.createElement('tr');
        tableBody.appendChild(newTr);
        tableBody.removeChild(newTr);
    }


    dateInput.value = '';
    amountInput.value = '';
    itemInput.value = '';

    addButton.disabled = false;
    manCatBtn.disabled = false;
    form.removeChild(document.getElementById('editSpan'));
}


function startEditItem(e){

    editTarget = e.target;

    addButton.disabled = true;
    manCatBtn.disabled = true;

    let newEditButtonSpan = document.createElement('div');
    newEditButtonSpan.setAttribute('id','editSpan')

    let newEditButton = document.createElement('button');
    newEditButton.setAttribute('id','editBtn')
    newEditButton.textContent = 'Edit';

    let newCancelButton = document.createElement('button');
    newCancelButton.setAttribute('id','cancelBtn')
    newCancelButton.textContent = 'Cancel';

    newEditButtonSpan.appendChild(newEditButton);
    newEditButtonSpan.appendChild(newCancelButton);

    form.appendChild(newEditButtonSpan);

    let editButton = document.getElementById('editBtn');
    editButton.addEventListener('click',editItem,false);

    let cancelButton = document.getElementById('cancelBtn');
    cancelButton.addEventListener('click',cancelEdit,false);

    //RECORDAR TAMBIÉN QUITAR LOS LISTENERS DEL TAG CUANDO YA LO HAYA CREADO
    removeListeners(editIcons,'click',startEditItem);
    removeListeners(trashIcons,'click',deleteItem);

}




function addListeners(icons, funcToExecute){
    for(let i=0;i<icons.length;i++){
        icons[i].addEventListener('click', funcToExecute,false);
    }
}


function removeListeners(icons,event,funcToRemove){
    for(let i=0;i<icons.length;i++){
        icons[i].removeEventListener(event, funcToRemove,false);
    }
}


function deleteItem(e){
    let target = e.target;
    let trToDelete = target.parentNode.parentNode.parentNode.parentNode;
    let containerNode = trToDelete.parentNode;
    containerNode.removeChild(trToDelete);

}






function hideOptions(e){
    let target = e.target;
    if(target.className === 'categoryTd'){
        let trashSpan = target.firstChild.nextSibling.firstChild; 
        trashSpan.className = 'hiddenOption';
        let pencilSpan = target.firstChild.nextSibling.firstChild.nextSibling; 
        pencilSpan.className = 'hiddenOption';
        let tagSpan = target.firstChild.nextSibling.lastChild; 
        tagSpan.className = 'hiddenOption';
    }
}



function showOptions(e){
    let target = e.target;
    if(target.className === 'spanWrapper'){
        let trashSpan = target.firstChild; 
        trashSpan.className = 'shownOption';
        let pencilSpan = target.firstChild.nextSibling; 
        pencilSpan.className = 'shownOption';
        let tagSpan = target.lastChild; 
        tagSpan.className = 'shownOption';
    }
}





function addItemToTable(e){
    e.preventDefault();
    //VOLVER A ACTIVAR LA VALIDACIÓN CUANDO YA TODO ESTÉ LISTO
    // if (dateInput.value != '' && amountInput.value != '' && itemInput.value != '' ) {
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

        let optionSpanWrapper = document.createElement('span');
        optionSpanWrapper.className = 'spanWrapper';

        let trashSpan = document.createElement('span');
        trashSpan.setAttribute('class', 'hiddenOption');
        let trashIcon = document.createElement('i');
        //VER SI ELIMINO EL ATRIBUTO DATA-ATR CREO QUE NO LO NECESITO
        trashIcon.setAttribute('data-atr', 'hiddable');
        trashIcon.setAttribute('class', 'fas fa-trash-alt');
        trashSpan.appendChild(trashIcon);

        optionSpanWrapper.appendChild(trashSpan);

        let pencilSpan = document.createElement('span');
        pencilSpan.setAttribute('class', 'hiddenOption');
        let pencilIcon = document.createElement('i');
        pencilIcon.setAttribute('data-atr', 'hiddable');
        pencilIcon.setAttribute('class', 'fas fa-pencil-alt');
        pencilSpan.appendChild(pencilIcon);

        optionSpanWrapper.appendChild(pencilSpan);

        let tagSpan = document.createElement('span');
        tagSpan.setAttribute('class', 'hiddenOption');
        let tagIcon = document.createElement('i');
        tagIcon.setAttribute('data-atr', 'hiddable');
        tagIcon.setAttribute('class', 'fas fa-tag');
        tagSpan.appendChild(tagIcon);

        optionSpanWrapper.appendChild(tagSpan);

        newTr.lastChild.appendChild(newText);
        newTr.lastChild.appendChild(optionSpanWrapper);
        
        tableBody.prepend(newTr);

        dateInput.value = '';
        amountInput.value = '';
        itemInput.value = '';

    // } else {
    //     alert('All fields must be populated');
    // }
    

}