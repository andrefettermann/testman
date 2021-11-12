function carregaProjetos() {
    var xhr = new XMLHttpRequest();

    //    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
    xhr.open("GET", "http://127.0.1:5000/api/projects");
    xhr.addEventListener("load", function () {
        var erroAjax = document.querySelector("#messages");
        //getElementById('messages');

        if (xhr.status == 200) {
            var resposta = xhr.responseText;
            var documentos = JSON.parse(resposta);

            var messages = document.querySelector("#messages");
            messages.textContent = documentos.docs.length + " carregados às " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

            var ul = document.querySelector("#list");
            ul.innerHTML = "";

            documentos.docs.forEach(function (documento) {
                var li = document.createElement('li');
                var link = document.createElement('a');
                link.href = 'scenarios.html?tc='+documento._id;
                //link.classList.add('');
                link.textContent = documento.name + " - " + documento.description;
                li.appendChild(link);

                ul.appendChild(li);
            });
        } else {
            //erroAjax.classList.remove("invisivel");
        }
    });

    xhr.send();
}

var botaoAtualizar = document.querySelector("#refresh");
botaoAtualizar.addEventListener("click", function () {
    carregaProjetos();
});

var botaoIncluir = document.querySelector("#insert");
botaoIncluir.addEventListener("click", function() {
    //window.location.replace("project_form.html");
    window.location.href = "project_form.html";
});

