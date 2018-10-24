// ADD BUTTONS

$(document).on('click', '#addInput', function () {
    $('#page').append('<div class="container">'
        + '<div>Question </div>'
        + '<div><input></div>'
        + '<div>Type</div>'
        + '<div><select class="check"><option>Yes/No</option><option>Text</option><option>Number</option></select></div>'
        + '<div><button class="addSubInput">Add Sub-Input</button>'
        + '<button class="delete">Delete</button></div>'
        + '</div>').last()
});

$(document).on('click', '.addSubInput', function () {
    let check = $(this).parent().parent().find('.check').val();
    if (check == "Yes/No") {
        $(this).parent().append('<div class="subcontainer">'
            + '<div>Condition </div>'
            + '<div><input value="Yes/No" readonly>'
            + '<select><option>Yes</option><option>No</option></select></div>'
            + '<div>Question </div>'
            + '<div><input></div>'
            + '<div>Type</div>'
            + '<div><select class="check"><option>Yes/No</option><option>Text</option><option>Number</option></select></div>'
            + '<div><button class="addSubInput">Add Sub-Input</button>'
            + '<button class="delete">Delete</button></div>'
            + '</div>').last()
    }
    else if (check == "Text") {
        $(this).parent().append('<div class="subcontainer">'
            + '<div>Condition </div>'
            + '<div><input value="Text" readonly>'
            + '<input type="text"></div>'
            + '<div>Question </div>'
            + '<div><input></div>'
            + '<div>Type</div>'
            + '<div><select class="check"><option>Yes/No</option><option>Text</option><option>Number</option></select></div>'
            + '<div><button class="addSubInput">Add Sub-Input</button>'
            + '<button class="delete">Delete</button></div>'
            + '</div>').last()
    }
    else {
        $(this).parent().append('<div class="subcontainer">'
            + '<div>Condition </div>'
            + '<div><select><option>Less than</option><option>Equals</option><option>Greater than</option></select>'
            + '<input type="number"></div>'
            + '<div>Question </div>'
            + '<div><input></div>'
            + '<div>Type</div>'
            + '<div><select class="check"><option>Yes/No</option><option>Text</option><option>Number</option></select></div>'
            + '<div><button class="addSubInput">Add Sub-Input</button>'
            + '<button class="delete">Delete</button></div>'
            + '</div>').last()
    }
});

$(document).on('click', '.delete', function () {
    $(this).parent().parent().remove();
});

// UPDATE INPUTS

$(document).on('change', 'input', function () {
    let mod = this.value;
    $(this).attr("value", mod);
})

$(document).on('change', 'select', function () {
    $(this).find(":selected").attr("selected", "selected");
})

// DB OPERATIONS

$(document).ready(function () {
    localforage.getItem('db').then(function (value) {
        $(value).insertAfter('#nav');
        console.log("Loading... " + value);
    }).catch(function (err) {
        console.log(err);
    });
});

$(document).on('click', '#saveAll', function () {
    localforage.clear();
    let dom = $('#page').get(0);
    let page = dom.outerHTML;
    $(dom).remove();
    localforage.setItem('db', page).then(function (value) {
        localforage.getItem('db').then(function (value) {
            $(value).insertAfter('#nav');
            console.log("Loading... " + value);
        }).catch(function (err) {
            console.log(err);
        });
        console.log(value[0]);
    }).catch(function (err) {
        console.log(err);
    });;
});
