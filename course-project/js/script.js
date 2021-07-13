// ДЕЙСТВИЕ ПРИ ОБНОВЛЕНИИ СТРАНИЦЫ

let taskBase = JSON.parse(localStorage.getItem('userBase'))

if (taskBase) {
    showCards()
} else {
    taskBase = [];
}


// ПОКАЗАТЬ ОКНО ДОБАВЛЕНИЯ КАРТОЧКИ

let addCardsBlock = document.querySelector('.add-cards-block');
let addCardsButton = document.querySelector('.add-cards-button');
let addCardBlock = document.querySelector('.add-card-block');

addCardsButton.addEventListener('click', () => {
    addCardsBlock.style.display = 'none';
    addCardBlock.style.display = 'block';
})

// ДОБАВИТЬ КОММЕНТАРИЙ

let addCommentsBlock = document.querySelector('.add-comments-block');
let addCommentsButton = document.querySelector('.add-comments-button');
let addCommentForm = document.querySelector('.add-comment-form');

addCommentsButton.addEventListener('click', () => {
    addCommentsBlock.style.display = 'none';
    addCommentForm.style.display = 'block';
})

// ОТКРЫТЬ КАРТОЧКУ НА РЕДАКТИРОВАНИЕ

let card = document.querySelector('.card')
let cardEditWindow = document.querySelector('.card-edit-window')
let darkeningBackground = document.querySelector('.darkening-background')

// card.addEventListener('click', () => {
//   darkeningBackground.style.display = 'block';
//   cardEditWindow.style.display = 'block';
// })


// ДОБАВЛЕНИЕ КАРТОЧКИ

let addCardForm = document.querySelector('#add-card-form');

addCardForm.addEventListener('submit', addNewCard);
function addNewCard (ev) {
    ev.preventDefault()

    let task = {};
    let cardTitle = document.querySelector('#card-title');
    let user = document.querySelector('#choice-user');
    let cardDescription = document.querySelector('#card-description');

    task.id = taskBase.length +1;
    task.status = 1;
    task.title = cardTitle.value;
    task.user = user.value;
    task.date = new Date().toLocaleDateString();
    task.description = cardDescription.value;

    taskBase.push(task);
    localStorage.setItem('userBase', JSON.stringify(taskBase));
    showCard(task);

    addCardForm.reset();
    addCardsBlock.style.display = 'block';
    addCardBlock.style.display = 'none';
    showElements ()
}

// ВЫВОД КАРТОЧКИ

function showCard(item) {
    let toDoBoard = document.querySelector('#toDoCards')
    toDoBoard.append(createCart(item));
}

function showCards() {
    let toDoBoard = document.querySelector('#toDoCards')
    let inProgressBoard = document.querySelector('#inProgressCards')
    let doneBoard = document.querySelector('#doneCards')
    for (let item of taskBase) {
        switch(item.status) {
            case 1:
                toDoBoard.append(createCart(item));
                break
            case 2:
                inProgressBoard.append(createCart(item));
                break
            case 3:
                doneBoard.append(createCart(item));
                break
        }
    }
}

function createCart(cardItem) {
    let divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.id = cardItem.id;

    let cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    let cardTitleValue = document.createTextNode(cardItem.title);
    cardTitle.append(cardTitleValue);

    let cardDescription = document.createElement('p');
    cardDescription.classList.add('card-body');
    let cardDescriptionValue = document.createTextNode(cardItem.description);
    cardDescription.append(cardDescriptionValue);

    let divCardButton = document.createElement('div');
    divCardButton.classList.add('card-button');

    let divCardCreateInfo = document.createElement('div');
    divCardCreateInfo.classList.add('card-create-info');

    let cardImageUser = document.createElement('img');
    cardImageUser.classList.add('card-image-user');
    let cardImageUserValue = document.createTextNode(cardItem.user);
    cardImageUser.append(cardImageUserValue);

    let cardDate = document.createElement('div');
    cardDate.classList.add('card-date');
    let cardDateValue = document.createTextNode(cardItem.date);
    cardDate.append(cardDateValue);

    let moveCardButton = document.createElement('div');
    moveCardButton.classList.add('move-card');

    let iconMoveToProgress = document.createElement('i')
    iconMoveToProgress.className = 'fas fa-sign-out-alt';
    let iconMoveFromDone = document.createElement('i')
    iconMoveFromDone.className = 'fas fa-reply';

    moveCardButton.append((cardItem.status == 1 || cardItem.status == 2) ? iconMoveToProgress : iconMoveFromDone);

    let deleteCard = document.createElement('div');
    deleteCard.classList.add('delete-card');
    let iconDelete = document.createElement('i')
    iconDelete.className = 'far fa-trash-alt';
    deleteCard.append(iconDelete);

    divCardCreateInfo.append(cardImageUser);
    divCardCreateInfo.append(cardDate);

    divCardButton.append(divCardCreateInfo);
    divCardButton.append(moveCardButton);
    divCardButton.append(deleteCard);

    divCard.append(cardTitle);
    divCard.append(cardDescription);
    divCard.append(divCardButton);

    //КНОПКА СМЕНЫ КОЛОНКИ

    moveCardButton.addEventListener('click',getChangeColumn);
    
    function getChangeColumn () {
      let userBase = JSON.parse(localStorage.getItem('userBase'));
      let toDoCards = document.querySelector('#toDoCards');
      let inProgressCards = document.querySelector('#inProgressCards');
      let doneCards = document.querySelector('#doneCards');
      let inProgressValue = inProgressCards.getElementsByClassName('card').length;

      userBase.forEach(element => { 
        if (element.id == divCard.id && element.status == 1) {
          if(inProgressValue < 5) {  
            inProgressCards.append(divCard);
            element.status = 2;
            localStorage.setItem('userBase', JSON.stringify(userBase));
            showElements ()
          }else {
            showModalWindow ()
          }
        } else if (element.id == divCard.id && element.status == 2) {
          doneCards.append(divCard);
          element.status = 3;
          localStorage.setItem('userBase', JSON.stringify(userBase));
          showElements ()
        } else if (element.id == divCard.id && element.status == 3) {
          toDoCards.append(divCard);
          element.status = 1;
          localStorage.setItem('userBase', JSON.stringify(userBase));
          showElements ()
        }
      });
    }
    return divCard
}

//СЧЕТЧИК КАРТОЧЕК

function showElements () {
  let toDoNumber = document.querySelector('#toDo-number');
  let inProgressNumber = document.querySelector('#inProgress-number');
  let doneNumber = document.querySelector('#done-number');
  let toDoValue = toDoCards.getElementsByClassName('card').length;
  let inProgressValue = inProgressCards.getElementsByClassName('card').length;
  let doneValue = doneCards.getElementsByClassName('card').length;
  toDoNumber.value = toDoValue;
  inProgressNumber.value = inProgressValue;
  doneNumber.value = doneValue;
  
}


function showModalWindow () {
  let modalWindow = document.querySelector('.modal-window');
  let background = document.querySelector('.darkening-background');
  let modalButton = document.querySelector('.confirm-button');
  background.style.display = 'block';
  modalWindow.style.display = 'block';
  modalButton.addEventListener('click', () => {
    modalWindow.style.display='none';
    background.style.display = 'none';
  })
}




////// УДАЛЕНИЕ КАРТОЧЕК


let modalWindowDel = document.querySelector('.modalWindow-delete')
let modalWindowDelAll = document.querySelector('.modalWindow-delete_all')

function deleteCard (event){
    if (event.target.className === 'far fa-trash-alt'){
        
        let card = event.target.closest('.card')
        modalWindowDel.style.display ='flex';
        let confirmBotton = document.querySelector('.confirm-buttonn');
        let canselBotton = document.querySelector('.cansel-buttonn');
        confirmBotton.addEventListener('click',function(){
            modalWindowDel.style.display ='none';
            let userBase = JSON.parse(localStorage.getItem('userBase'));
            const result = userBase.filter(userBase => userBase.id != card.id);
            userBase=result;
            localStorage.setItem('userBase', JSON.stringify(userBase));
            card.remove()
        })
        canselBotton.addEventListener('click',function(){
            modalWindowDel.style.display ='none';
        })
    }
}

toDoCards.addEventListener('click',deleteCard);

let inProgressCards = document.querySelector('#inProgressCards');

inProgressCards.addEventListener('click',deleteCard);
let doneCards = document.querySelector('#doneCards');
doneCards.addEventListener('click',deleteCard);

/// УДАЛЕНИЕ ВСЕХ КАРТОЧЕК

let deleteAllCardsToDo = document.getElementById('delete-all-cards_toDo');
let deleteAllCardsInProg = document.getElementById('delete-all-cards_InProg');
let deleteAllCardsDone = document.getElementById('delete-all-cards_done');


function DeleteAllCards (nameOfBoard){
    let modalWindowAll =document.querySelector('.modalWindow-delete_all');
    let confirmBottonAll = document.querySelector('.confirm-buttonn_all')
    let canselBottonAll = document.querySelector('.cansel-buttonn_all')
    modalWindowAll.style.display='flex';
    confirmBottonAll.addEventListener('click',function(){
        modalWindowAll.style.display='none';
        while (nameOfBoard.firstChild) {
            let userBase = JSON.parse(localStorage.getItem('userBase'));
            let ind = nameOfBoard.firstChild.id;
            const result = userBase.filter(userBase => userBase.id != ind);
            userBase=result;
            localStorage.setItem('userBase', JSON.stringify(userBase));
            nameOfBoard.removeChild(nameOfBoard.firstChild);
          }
    })
    canselBottonAll.addEventListener('click',function(){
        modalWindowAll.style.display='none';
    })
}
deleteAllCardsToDo.addEventListener('click',function(){
    DeleteAllCards (toDoCards)
})
deleteAllCardsInProg.addEventListener('click',function(){
    DeleteAllCards (inProgressCards)
})
deleteAllCardsDone.addEventListener('click',function(){
    DeleteAllCards (doneCards)
})