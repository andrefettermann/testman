const form = document.querySelector("#form");
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pid = urlParams.get('pid');
    var url = "http://127.0.1:5000/api";
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
    messages.textContent = "Projeto " + result.name + " incluído com sucesso às " 
                    + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

});

function submitForm() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pid = urlParams.get('pid');
    var url = "http://127.0.1:5000/api";
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
    /*
        var xhr = new XMLHttpRequest();
        
        xhr.addEventListener("load", function () {
            if (xhr.status == 200) {
                var resposta = xhr.responseText;
                console.log(resposta);
            }
        });
    
        xhr.open(method, url);
        xhr.send(formData);
    */

};

function setFormAction() {

}

var botaoCancelar = document.querySelector("#cancel");
botaoCancelar.addEventListener("click", function () {
    window.history.back();
});


