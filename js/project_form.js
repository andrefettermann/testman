var BASE_URL = "http://localhost:5000/api";

function loadProject() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pid = urlParams.get('pid');
    var url = BASE_URL;

    if (pid) {
        url += "/project/" + pid;''
        fetch(url).then(function (response) {
            response.json().then(function (doc) {
                const name = document.querySelector('#name');
                const description = document.querySelector('#description');

                name.value = doc.name;
                description.value = doc.description;

            });
        }).catch(function (err) {
            console.error('Failed retrieving information', err);
        });
    }
}

const form = document.querySelector("#form");
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pid = urlParams.get('pid');

    var url = BASE_URL;
    var method = "POST";

    if (pid) {
        url += "/project/" + pid;
        method = "PUT";
    } else {
        url += "/project";
    }

    const formData = {
        name: document.querySelector("#name").value,
        description: document.querySelector("#description").value
    }

    let response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    let result = await response.json();
    console.log(result);

    var messages = document.querySelector("#messages");
    messages.textContent = "Projeto " + result.name + " gravado com sucesso às "
        + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

});

var botaoCancelar = document.querySelector("#cancel");
botaoCancelar.addEventListener("click", function () {
    //window.history.back();
    //window.location.href = "index.html";
    window.location.replace("index.html");
});