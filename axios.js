const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const getData = () => {
    axios.get('https://space-exploration-api.herokuapp.com/stars')
        .then(response => {
            console.log(response);
        })
};

const sendData = () => {
    axios.post('https://space-exploration-api.herokuapp.com/user/login', {
        username: "admin@test.com",
        password: "password"
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    })
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);