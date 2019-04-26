// global variables
const emptyCategoryHTML = `
    <li class="list-item col-5 p-3 border mx-auto mb-3">
        <div class="input-group mb-3">
            <input type="text" class="form-control" style="font-size: 13pt;" disabled>
            <div class="input-group-append">
                <button class="btn btn-white js-edit-input" type="button">
                <i class="far fa-edit"></i>
                </button>
                <button class="btn btn-white js-delete-input" type="button">
                <i class="far fa-trash-alt"></i> </button>
            </div>
        </div>

        <ul class="list-group">
            <li class="list-group-item">
                <div class="input-group">
                <input type="text" class="form-control" placeholder="Add new subcategory" aria-label="Add new category"
                    aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-white js-add-subcategory" type="button">
                    <i class="material-icons">add</i>
                    </button>
                </div>
                </div>
            </li>       
        </ul>
    </li>
`;

const emptySubcategoryHTML = `
    <li class="list-group-item">
        <div class="input-group">
            <input type="text" class="form-control" value="Photography" disabled>
            <div class="input-group-append">
                <button class="btn btn-white js-edit-input" type="button">
                <i class="far fa-edit"></i>
                </button>
                <button class="btn btn-white js-delete-input" type="button">
                <i class="far fa-trash-alt"></i> </button>
            </div>
        </div>
    </li>
`;

const createElement = str => {
    var div = document.createElement('div');
    div.innerHTML = str;

    return div.lastElementChild;
}

// categories

$(document).on('click', ".js-edit-input", function () {
    let inputTag = $(this).parent().parent().children('input');

    if (inputTag.attr('disabled')) {
        inputTag.removeAttr('disabled')
        $(this).children().removeClass('far fa-edit');
        $(this).children().addClass('fas fa-check');
    } else {
        inputTag.prop('disabled', 'true')
        $(this).children().removeClass('fas fa-check');
        $(this).children().addClass('far fa-edit');
    }
});

$(document).on('click', ".js-delete-input", function () {
    let liTag = $(this).parent().parent().parent();
    liTag.remove();
});

$(document).on('click', '.js-add-category', function () {
    let inputElmAddCategory = $(this).parent().parent().children('input');
    const valInput = inputElmAddCategory.val().trim();
    inputElmAddCategory.val('');

    if (valInput.length) {
        let categories = document.getElementById('js-categories-ul');

        let newCategory = createElement(emptyCategoryHTML);
        newCategory.getElementsByClassName('form-control')[0].value = valInput;

        categories.appendChild(newCategory);
    } else {
        // Notice: must be enter valid category name
    }
})

$(document).on('click', '.js-add-subcategory', function () {
    let inputElmAddSubcategory = $(this).parent().parent().children('input');
    const valInput = inputElmAddSubcategory.val().trim();
    inputElmAddSubcategory.val('');

    if (valInput.length) {
        let subcategories = $(this).parent().parent().parent();

        let newSubcategory = createElement(emptySubcategoryHTML);
        newSubcategory.getElementsByClassName('form-control')[0].value = valInput;

        subcategories.before(newSubcategory);
    } else {
        // Notice: must be enter valid subcategory name

    }
})

// users
$('#js-user-type-select').change(function () {
    let valSelected = $(this).val();

    switch (valSelected) {
        case "subscriber":
            $('#js-writer-table').removeAttr("style").hide();
            $('#js-editor-table').removeAttr("style").hide();
            $('#js-subscriber-table').show();
            break;
        case "writer":
            $('#js-subscriber-table').removeAttr("style").hide();
            $('#js-editor-table').removeAttr("style").hide();
            $('#js-writer-table').show();
            break;
        case "editor":
            $('#js-subscriber-table').removeAttr("style").hide();
            $('#js-writer-table').removeAttr("style").hide();
            $('#js-editor-table').show();
            break;
    }
});



