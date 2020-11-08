const usersList = document.querySelector('#usersList')
const template = document.querySelector('#templateElement');


fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error (`Http error ${response.status}`);
        }
    })
    .then(response => {
        console.log(response); 
        
        response.forEach(element => {
            const clone = template.content.cloneNode(true);

            const userID = clone.querySelector('.user-cnt');
            const userName = clone.querySelector('.user-name');
            const userPhone = clone.querySelector('.user-phone');
            const userEmail = clone.querySelector('.user-email');
            userID.dataset.id = element.id;
            userName.textContent = element.name;
            userPhone.textContent = element.phone;
            userEmail.textContent = element.email;
            userEmail.setAttribute('href', `mailto:${element.email}`)
            usersList.append(clone);   
        });

        
        
    })
    .catch(error => {
        console.log(error)
    });





