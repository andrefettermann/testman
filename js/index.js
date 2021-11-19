function deleteProject(project) {
    const url = 'http://localhost:5000/api/project/' + project._id; 
    var messages = document.querySelector("#messages");
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(response => {
        loadProjects();
        ReactDOM.render(
            "Projeto " + project.name + " excluído com sucesso às "
            + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            document.querySelector('#messages-container')
        );

       // messages.textContent = "Projeto " + project.name + " excluído com sucesso às "
       //     + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }).catch(function (err) {
        console.error('Failed retrieving information', err);
        messages.textContent = err;
    });
}

function createLi(project) {
    const li = document.createElement('li');
    
    const a = document.createElement('a');
    a.href = 'scenarios.html?pid=' + project._id;
    a.className = 'project_name';
    a.textContent = project.name + " - " + project.description;
    li.appendChild(a);

    const actions = document.createElement('p');
    actions.className = 'actions';
    actions.textContent = 'Ações: ';

    const editLink = document.createElement('a');
    editLink.href = 'project_form.html?pid=' + project._id;
    editLink.textContent = 'Editar';
    editLink.className = 'actions_options';
    actions.appendChild(editLink);

    const deleteLink = document.createElement('a');
    deleteLink.href = "#";
    deleteLink.onclick = function () {
        if (confirm('Tem certeza que deseja excluir?')) {
            deleteProject(project);
        } else {
        }
    };
    deleteLink.textContent = 'Excluir';
    deleteLink.className = 'actions_options';
    actions.appendChild(deleteLink);
    li.appendChild(actions)

    return li;
}

function loadProjects() {
    var xhr = new XMLHttpRequest();

    //    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
    xhr.open("GET", "http://localhost:5000/api/projects");
    xhr.addEventListener("load", function () {
        var erroAjax = document.querySelector("#messages");
        //getElementById('messages');

        if (xhr.status == 200) {
            var response = xhr.responseText;
            var projects = JSON.parse(response);

            const messages = document.querySelector('#messages-container');
            messages.textContent = projects.docs.length + " carregados às "
            + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

            var ul = document.querySelector("#list");
            ul.innerHTML = "";

            projects.docs.forEach(function (project) {
                ul.appendChild(createLi(project));
            });
        } else {
            //erroAjax.classList.remove("invisivel");
            messages.textContent = 'Não foi possível carregar as informações!';
        }
    });

    xhr.send();
}

var botaoAtualizar = document.querySelector("#refresh");
botaoAtualizar.addEventListener("click", function () {
    loadProjects();
});

var botaoIncluir = document.querySelector("#insert");
botaoIncluir.addEventListener("click", function () {
    window.location.replace("project_form.html");
    //window.location.href = "project_form.html";
});

