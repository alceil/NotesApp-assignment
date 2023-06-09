const addTitle = document.getElementById('addTitle');
const addText = document.getElementById('addText');
const addNoteButton = document.getElementById('addNote');
const notesDiv = document.getElementById('notes');
const noteHeadingsDiv =  document.getElementById('note-headings');
const noteHeading =  document.getElementById('heading');
const notesHeadings = [
    {'heading':'My Notes', 'functionName':'showNotes()' },
    {'heading':'Deleted Notes', 'functionName':'showDeletedNotes()' },
    {'heading':'Archived Notes', 'functionName':'showArchivedNotes()' },
];


localStorage.clear();
showNotes();
renderHeadings();



function renderHeadings(){
    noteHeading.innerText = 'My Notes'
    noteHeadingsDiv.innerHTML=`${notesHeadings.map(item=>`
    <div  onclick=${item.functionName}>${item.heading}</div>`
    ).join('')}`
}

function addNotes(){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }

    if(addText.value == ''){
        alert('Add your note');
        return;
    }
    
    const noteObj = {
        title: addTitle.value,
        text: addText.value,
    }
    addTitle.value = '';
    addText.value = '';
    notes.push(noteObj);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function showNotes(){
    noteHeading.innerText = 'My Notes'
    let notesHTML = '';
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notesDiv.innerHTML = ``;
        return;
    }else{
        notes = JSON.parse(notes);
    }
    for(let i=0; i<notes.length; i++){
        notesHTML += `<div class="note">
        <div class="btn-group">
        <button class="deleteNote" id=${i} onclick="deleteNote(${i})">Delete</button>
        <button class="editNote" id=${i} onclick="editNote(${i})">Edit</button>
        <button class="archiveNote" id=${i} onclick="archiveNotes(${i})">Archive</button>
        </div>
                    <span class="title">${notes[i].title === "" ? 'Note' : notes[i].title}</span>
                    <div class="text">${notes[i].text}</div>
                </div>
        `
    }
    notesDiv.innerHTML = notesHTML;
}

function showDeletedNotes(){
    noteHeading.innerText = 'Deleted Notes'
    let notesHTML = '';
    let deletedNotes = localStorage.getItem('deletedNotes');
    if(deletedNotes === null){
        notesDiv.innerHTML = '<h1 style="color:white;margin:auto;"> No Deleted Notes</h1>'
        return;
    }else{
        deletedNotes = JSON.parse(deletedNotes);
    }
    console.log(deletedNotes)
    for(let i=0; i<deletedNotes.length; i++){
        notesHTML += `<div class="note">
                    <span class="title">${deletedNotes[i].title === "" ? 'Note' : deletedNotes[i].title}</span>
                    <div class="text">${deletedNotes[i].text}</div>
                </div>
        `
    }

    notesDiv.innerHTML = notesHTML;
}

function showArchivedNotes(){
    noteHeading.innerText = 'Archived Notes'
    let notesHTML = '';
    let archivedNotes = localStorage.getItem('archivedNotes');
    if(archivedNotes === null){
        notesDiv.innerHTML = '<h1  style="color:white;margin:auto;"> No Archived Notes</h1>'
        return;
    }else{
        archivedNotes = JSON.parse(archivedNotes);
    }
    for(let i=0; i<archivedNotes.length; i++){
        notesHTML += `<div class="note">
                    <span class="title">${archivedNotes[i].title === "" ? 'Note' : archivedNotes[i].title}</span>
                    <div class="text">${archivedNotes[i].text}</div>
                </div>
        `
    }
    notesDiv.innerHTML = notesHTML;
}

function deleteNote(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    addDeleteNotes(notes,ind);
    notes.splice(ind, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function addDeleteNotes(notes,ind){
    let deletedNotes = localStorage.getItem('deletedNotes');
    if(deletedNotes === null){
        deletedNotes = [];
    }else{
        deletedNotes = JSON.parse(deletedNotes);
    }
    const deletedNote = {
        title: notes[ind].title,
        text:  notes[ind].text,
    }
    deletedNotes.push(deletedNote);
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes));
}

function editNote(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    const note = notes[ind];
    addTitle.value = note.title;
    addText.value = note.text;
   const controlDiv = document.getElementsByClassName('control-btn-group');
   console.log(controlDiv)
   let notesHTML = '';
   notesHTML = `<button class="editNote" onclick="edit(${ind})">Edit</button>
   <button onclick="done()">Done</button>
   `
   controlDiv[0].innerHTML = notesHTML
    showNotes();
}

function archiveNotes(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        notes = [];
    }else{
        notes = JSON.parse(notes);
    }
    let archivedNotes = localStorage.getItem('archivedNotes');
    if(archivedNotes === null){
        archivedNotes = [];
    }else{
        archivedNotes = JSON.parse(archivedNotes);
    }
    const noteObj = {
        title: notes[ind].title,
        text: notes[ind].text,
    }
    archivedNotes.push(noteObj);
    localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));
    alert('Notes Archived');

}

function edit(ind){
    let notes = localStorage.getItem('notes');
    if(notes === null){
        return;
    }else{
        notes = JSON.parse(notes);
    }
    notes[ind].title = addTitle.value;
    notes[ind].text =  addText.value;
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}


function done(){
    const controlDiv = document.getElementsByClassName('control-btn-group');
    let notesHTML = '';
    addTitle.value = '';
    addText.value = '';
    notesHTML = `<button id="addNote" onclick="addNotes()">Add</button>`
    controlDiv[0].innerHTML = notesHTML
}

addNoteButton.addEventListener('click', addNotes);

