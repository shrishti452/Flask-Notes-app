async function fetchNotes() {
    let response = await fetch('/notes');
    let data = await response.json();

    let list = document.getElementById("notesList");
    list.innerHTML = "";

    data.forEach((note, index) => {
        let li = document.createElement("li");
        li.innerHTML = note +
            ` <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>`;
        list.appendChild(li);
    });
}

async function addNote() {
    let noteText = document.getElementById("noteInput").value;

    await fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ note: noteText })
    });

    fetchNotes();
}

async function deleteNote(index) {
    await fetch(`/notes/${index}`, {
        method: 'DELETE'
    });

    fetchNotes();
}

fetchNotes();