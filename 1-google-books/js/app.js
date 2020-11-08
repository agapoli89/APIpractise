
const btn = document.querySelector('button');

const takeTitle = (e) => {
    e.preventDefault();
    const input = document.getElementById('search');
    const title = input.value;
    

    //jquery ajax
   /* $.getJSON("https://www.googleapis.com/books/v1/volumes?q=" + title, function(data){

        console.log(data);
        
        for(i=0; i<data.items.length; i++) {
            console.log(data.items[i].volumeInfo.title); 
        }   
    }); */

    //XMLHttpRequest
   /*  const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', e => {
        if (xhr.status === 200) {
            const json = JSON.parse(xhr.response);
            json.items.forEach(item => console.log(item.volumeInfo.title));     
            };
    });

    xhr.addEventListener('error', e => {
        alert("Nie udało się nawiązać połączenia");
    });

    xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + title, true);
    xhr.send(); */

    //Fetch
    fetch("https://www.googleapis.com/books/v1/volumes?q=" + title)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error (`Http error: ${response.status}`)
        }
    })
    .then(response => {
        response.items.forEach(item => {console.log(item.volumeInfo.title)   
        });
    })
    .catch(error => {
        console.log(error)
    });
}

btn.addEventListener('click', takeTitle);

