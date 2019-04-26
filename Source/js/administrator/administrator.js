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

};
// Categories
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
});

// Tags
const TAGS_PER_PAGE = 5;
const tagsMockData = ['C++', 'PHP', 'Java', 'Javascript', 'ReactJS', 'NodeJS', 'Angular', 'HTML', 'CSS', 'Jquery', 'Bootstrap'];
let tagPageNumber = 1;

const updateTagsTable = pageNumber => {
    const tagsTbody = $('.js-tags-table').children('tbody');

    const start = (pageNumber - 1) * TAGS_PER_PAGE;
    const end = Math.min(pageNumber * TAGS_PER_PAGE, tagsMockData.length);

    tagsTbody.html('');
    for (let i = start; i < end; i++) {
        tagsTbody.html(
            tagsTbody.html() +
            `
                <tr class="text-center">
                    <td>${i + 1}</td>
                    <td>${tagsMockData[i]}</td>
                    <td>
                        <button class="btn btn-sm btn-warning mr-1">
                            <i class="material-icons">edit</i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger">
                            <i class="material-icons">delete</i> Delete
                        </button>
                    </td>
                </tr>
            `
        );
    };
}

$(document).ready(function () {
    updateTagsTable(tagPageNumber);
});

$(document).on('click', 'li.page-item', function () {
    const value = $(this).children('a').html().trim();
    
    switch (value) {
        case '\253':
            tagPageNumber = Math.max(1, tagPageNumber - 1);
            break;
        case '\273':
            tagPageNumber = Math.min(Math.floor(tagsMockData.length / TAGS_PER_PAGE) + 1, tagPageNumber + 1);
            break;
        default:
            break;
    }
    
    document.getElementById('js-tags-page-number').innerHTML = tagPageNumber;
    updateTagsTable(tagPageNumber);
});

// Users
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