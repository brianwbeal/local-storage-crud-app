// add copyright year
document.querySelector('#currentDate').innerHTML = (new Date).getFullYear();

// todo app

// variables
const form = document.querySelector('form');
const itemList = document.querySelector('ul');
const clearButton = document.querySelector('#clearButton');
const itemInput = document.querySelector('#itemInput');
const submitButton = document.querySelector('#submitButton');

// checks if the 'items' array exists in localStorage and - if so - parses the data into the 'itemsArray' variable. If there is no 'items' key in localStorage, an empty array is stored in teh 'itemsArray' variable
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// syncs current value of itemsArray with 'items' key in localStorage - on first visit, or after clearing, this makes sure the key exists
localStorage.setItem('items', JSON.stringify(itemsArray));

// snapshot of value of 'items' key in localStorage on loading app
const data = JSON.parse(localStorage.getItem('items'));

// declare function to create list item in UI, passing in unique text
const itemMaker = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    itemList.appendChild(li);
};

// add submit event listener to form which...
form.addEventListener('submit', (e) => {
    e.preventDefault();  // prevent default action
    itemsArray.push(itemInput.value);  // add the value of the input to the itemsArray variable
    localStorage.setItem('items', JSON.stringify(itemsArray));  // patch the value of localStorage 'items' key with the updated 'itemsArray' value
    itemMaker(itemInput.value);  // add the new value to itemList in the UI
    itemInput.value = '';  // clear input
});

// populate ul with all items on page load
data.forEach((item) => {
    itemMaker(item)
});

// add click event listener to 'clear all' button
clearButton.addEventListener('click', function() {
    localStorage.clear();  // clear everything from localStorage
    while (itemList.firstChild) {  // so long as the ul has items, it will iterate through to remove them
        itemList.removeChild(itemList.firstChild)
    }
});