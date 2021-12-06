var data = [];
try {
    var x = JSON.parse(localStorage.getItem('todos'));
    if (!x) {
    }
    else {
        for (let i = 0; i < x.length; i++) {
            const element = x[i];
            data.push(element);
        }
    }
}
catch (e) {
    console.log('op');
}
const todoItemsList = document.querySelector('.todoitems');
function func() {
    const task = document.getElementById("task").value;
    var todo = {
        id: Date.now(),
        name: task,
        completed: false
    };
    data.push(todo);
    addToLocalStorage(data)
    document.getElementById("task").value = ''
}
function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function (item) {
        const checked = item.completed ? 'checked' : null;
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.innerHTML = `
        <div class="row">
        <div class="col-2 ">

         
        <button class="ibtn" type="button" onclick="check_me(${item.id});" ${checked}>
        <span>
        <i class="fa fa-check-square-o"></i>
        </span>
        </button></div>
     <div class="col-7">
      <p class="text-center  font-monospace fs-4 text-white "  id="${item.id + 'P'}"  "><del>${item.name}</del></p></div>
      <div class="col-3">
      <button type="button" id="${item.id + 'del'}" class="ibtn" onclick="delete_me(${item.id})"> <span>
      <i class="fa fa-trash"></i>
      </span></button>
      <button type="button" id="${item.id + 'ed'}" class="ibtn" onclick="edit(${item.id})"><span>
      <i class="fa fa-edit"></i>
      </span></button>
    </div>
</div>

    `;
            todoItemsList.append(li);

        }
        else {

            li.innerHTML = `
            <div class="row">
              <div class="col-2 ">
                
                
                <button class="ibtn" type="button" onclick="check_me(${item.id});" ${checked}>
                <span>
                <i class="fa fa-square-o"></i>
                </span>
                </button></div>
                <div class="col-7">
                  <p class="text-center  font-monospace fs-4 text-white "  id="${item.id + 'P'}">${item.name}</p></div>
                  <div class="col-3">
                    <button type="button" id="${item.id + 'del'}" class="ibtn" onclick="delete_me(${item.id})">
                    <span>
                    <i class="fa fa-trash"></i>
                    </span>
                    </button>
                    <button type="button" id="${item.id + 'ed'}" class="ibtn edit" onclick="edit(${item.id})">
                    <span>
                    <i class="fa fa-edit"></i>
                    </span>
                    </button>
                    </div>
                    </div>
                    
                    `;
            todoItemsList.append(li);
        }
    });

}
function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}
function delete_me(id) {
    var temp = JSON.parse(localStorage.getItem('todos'));
    for (let i = 0; i < temp.length; i++) {
        if (id === temp[i].id) {
            temp.splice(i, 1);
            addToLocalStorage(temp)
            data.splice(i, 1);
        }
    }
}
function check_me(id) {
    const get_text = document.getElementById(id + "P").innerHTML
    document.getElementById(id + "P").innerHTML = ""
    $('#' + id + "P").append(`<del>${get_text}</del>`);
    var temp = JSON.parse(localStorage.getItem('todos'));
    for (let i = 0; i < temp.length; i++) {
        if (id === temp[i].id) {
            var obj = data[i]
            if (obj.completed) {
                obj.completed = false;
            }
            else {
                obj.completed = true;
            }
            data[i] = obj;
            addToLocalStorage(data);
        }
    }
}

getFromLocalStorage();
function edit(id) {
    var my_text = document.getElementById(id + "ed").className
    if (my_text === 'ibtn edit') {

        console.log("ok");
        var t = document.getElementById(id + "P").innerHTML
        var text = $('#' + id + "P").text();
        console.log("--->>> ", text);
        var input = $(`<input type="text" class="edit text " aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" id="${id + 'in'}" value="${text}" />`)
        $('#' + id + "P").replaceWith(input);
        document.getElementById(id + "ed").className = "ibtn Save"
        console.log(text);
    }
    if (my_text === 'ibtn Save') {
        console.log("oks");
        var text = $('#' + id + "in").val();
        console.log(text);
        var temp = JSON.parse(localStorage.getItem('todos'));
        for (let i = 0; i < temp.length; i++) {
            if (id === temp[i].id) {
                var todo = {
                    id: id,
                    name: text,
                    completed: false
                };
                data[i] = todo;
                addToLocalStorage(data)
            }
        }
        var input = $(`<p class="text-center  font-monospace fs-4 text-white" id="${id + 'P'}">${text}</p>`)
        $('#' + id + "in").replaceWith(input);
        document.getElementById(id + "ed").className = "ibtn edit"
    }
}