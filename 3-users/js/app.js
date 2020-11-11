const usersList = document.querySelector('#usersList')
const template = document.querySelector('#templateElement');
const templatePost = document.querySelector('#templatePost');


//get users and generate their elements:
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error (`Http error ${response.status}`);
        }
    })
    .then(response => {
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
            const postsButtons = document.querySelectorAll('.user-show-posts');
    
                postsButtons.forEach(postsButton => {  
                    postsButton.addEventListener('click', showPosts)
                });

    })
    .catch(error => {
        console.log(error)
    });

    
    const showPosts = (e) => {
        const btn = e.path[0];
        console.log(btn);
        const userID = e.path[1].dataset.id;
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error (`Http error ${response.status}`);
            }
        })
        .then(response => {
            console.log(response);
            btn.removeEventListener('click', showPosts);
            const ulPosts = btn.nextElementSibling;

            response.forEach(element => {
                const clone = templatePost.content.cloneNode(true);
                const postTitle = clone.querySelector('.post-title');
                const postBody = clone.querySelector('.post-body');
                postTitle.textContent = element.title;
                postBody.textContent = element.body;
                ulPosts.append(clone);       
                })
            togglePosts(btn, ulPosts);
            btn.addEventListener('click', function(){
                togglePosts(btn, ulPosts);
            })
        })
        .catch(error => {
            console.log(error);
        })
    };

    const togglePosts = (el, ulPosts) => {
        if (el.innerText === "Show posts") {
            el.textContent = 'Hide posts';
            ulPosts.style.display = "block"; 
        } else {
            el.textContent = 'Show posts';
            ulPosts.style.display = "none"; 
        }
    }