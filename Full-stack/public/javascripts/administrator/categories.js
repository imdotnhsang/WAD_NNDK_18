let isEditting = false;

const createCategory = (id, title) => (
    `
        <li class="list-item col-5 p-3 border mx-auto mb-3" id=${id}>
            <div class="input-group mb-3">
                <input type="text" class="form-control" style="font-size: 13pt;" disabled value=${title}>
                <div class="input-group-append">
                    <button class="btn btn-white js-edit-input" type="button">
                        <i class="far fa-edit"></i>
                    </button>
                    <button class="btn btn-white js-cancel-input" type="button" style="display:none;">
                        <i class="far fa-window-close"></i>
                    </button>
                </div>
            </div>
            <div class="input-group mb-3">
                <textarea type="text" class="form-control" style="font-size: 10pt;" disabled>Description category</textarea>
                <div class="input-group-append">
                    <button class="btn btn-white js-edit-input" type="button">
                        <i class="far fa-edit"></i>
                    </button>
                    <button class="btn btn-white js-cancel-input" type="button" style="display:none;">
                        <i class="far fa-window-close"></i>
                    </button>
                </div>
            </div>

            <ul class="list-group">
                <li class="list-group-item">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Add new subcategory" aria-label="Add new category" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-white js-add-subcategory" type="button" parentId=${id}>
                                <i class="material-icons">add</i>
                            </button>
                        </div>
                    </div>
                </li>       
            </ul>
        </li>
    `
);

const createSubCategory = (id, title) => (
    `
        <li class="list-group-item">
            <div class="input-group">
                <input type="text" class="form-control" value=${title} disabled>
                <div class="input-group-append">
                    <button class="btn btn-white js-edit-input" type="button" id=${id}>
                        <i class="far fa-edit"></i>
                    </button>
                    <button class="btn btn-white js-cancel-input" type="button" style="display:none;">
                        <i class="far fa-window-close"></i>
                    </button>
                </div>
            </div>
            <div class="input-group mt-3">
                <textarea class="form-control" style="font-size: 10pt;" disabled> Description subcategory </textarea>
                    <div class="input-group-append">
                        <button class="btn btn-white js-edit-input" type="button" id="<%= eachSubCategory._id %>">
                            <i class="far fa-edit"></i>
                        </button>
                        <button class="btn btn-white js-cancel-input" type="button" style="display:none;">
                            <i class="far fa-window-close"></i>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    `
);

const createCategoryList = (categoryList) => {
    let result = "";

    for (let category of categoryList) {
        result += `
            <li class="list-item col-5 p-3 border mx-auto mb-3" id=${category._id}>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" style="font-size: 13pt;" disabled value=${category.title}>
                    <div class="input-group-append">
                        <button class="btn btn-white js-edit-input" type="button">
                        <i class="far fa-edit"></i>
                        </button>
                        <button class="btn btn-white js-cancel-input" type="button" style="display:none;">
                            <i class="far fa-window-close"></i>
                        </button>
                    </div>
                </div>

                <ul class="list-group">
                    ${createSubCategoryList(category.subCategories)}
                    <li class="list-group-item">
                        <div class="input-group">
                        <input type="text" class="form-control" placeholder="Add new subcategory" aria-label="Add new category"
                            aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <button class="btn btn-white js-add-subcategory" type="button" parentId=${category._id}>
                                <i class="material-icons">add</i>
                            </button>
                        </div>
                        </div>
                    </li>       
                </ul>
            </li>
        `
    }

    return result;
}

const createSubCategoryList = (subCategoryList) => {
    let subCategories = '';
    for (let subCategory of subCategoryList) {
        subCategories += createSubCategory(subCategory._id, subCategory.title);
    }

    return subCategories;
}

const createElement = str => {
    var div = document.createElement('div');
    div.innerHTML = str;

    return div.lastElementChild;
};

$(document).on('click', ".js-edit-input", function () {
    let inputTag = $(this).parent().parent().children('input');
    let cancelBtn = $(this).parent().children('.js-cancel-input');
    let descriptionTag = $(this).parent().parent().children('textarea');
    if (inputTag.attr('disabled') || descriptionTag.attr('disabled')) {
        if (isEditting) {
            return;
        }

        isEditting = true;

        inputTag.removeAttr('disabled');
        descriptionTag.removeAttr('disabled');
        cancelBtn.css("display", "block");

        $(this).children().removeClass('far fa-edit');
        $(this).children().addClass('fas fa-check');
    } else {
        const title = inputTag.val();
        const description = descriptionTag.val();
        const id = $(this).attr('id');
        postData('/api/category/update', { title, id })
            .then(res => {
                const statusCode = res.status;

                switch (statusCode) {
                    case 200:
                        res.json().then(categoryUpdated => {
                            isEditting = false;
                            inputTag.prop('disabled', 'true');
                            descriptionTag.prop('disabled', 'true');
                            cancelBtn.css("display", "none");
                            $(this).children().removeClass('fas fa-check');
                            $(this).children().addClass('far fa-edit');
                        })
                        break;
                    case 500:
                        showErrorsModal($(this), 'Server Error. Please try again!');

                    default:
                        res.json().then(err => {
                            const errMsg = err.title || err.category || 'Cannot edit category.';
                            showErrorsModal($(this), errMsg);
                        })
                        break;
                }
            })
    }
});

$(document).on('click', ".js-cancel-input", function () {
    let inputTag = $(this).parent().parent().children('input');
    let editBtn = $(this).parent().children('.js-edit-input').children();
    let descriptionTag = $(this).parent().parent().children('textarea');

    isEditting = false;
    inputTag.prop('disabled', 'true');
    descriptionTag.prop('disabled', 'true');
    $(this).css("display", "none");
    editBtn.removeClass('fas fa-check');
    editBtn.addClass('far fa-edit');
});

$(document).on('click', '.js-add-category', function () {
    $(this).attr("disabled", true);

    const ulCate = $('#js-categories-ul');
    const valInput = $('#js-add-category__input').val();

    if (valInput.length === 0) {
        $(this).attr("disabled", false);
        return;
    }

    postData('/api/category/create', {
        title: valInput
    })
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json().then(category => {
                        console.log(category);

                        ulCate.html(ulCate.html() + createCategory(category._id, category.title));
                        $('#js-add-category__input').val('');
                        $(this).attr("disabled", false);
                    });
                    break;

                case 500:
                    showErrorsModal($(this), 'Server Error. Please try again!');
                    $(this).attr("disabled", false);
                    break;
                default:
                    res.json().then(err => {
                        const errMsg = err.title || err.category || 'Cannot add subcategory.'
                        showErrorsModal($(this), errMsg);
                        $(this).attr("disabled", false);
                    })
                    break;
            }
        })
});

$(document).on('click', '.js-add-subcategory', function () {
    $(this).attr("disabled", true);

    let inputElmAddSubcategory = $(this).parent().parent().children('input');
    const valInput = inputElmAddSubcategory.val().trim();

    if (valInput.length === 0) {
        $(this).attr("disabled", false);
        return;
    }

    const title = valInput;
    const parentId = $(this).attr('parentId');

    postData('/api/category/create', {
        title,
        parentId
    })
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json()
                        .then(subCategory => {
                            let subcategories = $(this).parent().parent().parent();
                            subcategories.before(createSubCategory(subCategory._id, subCategory.title));

                            inputElmAddSubcategory.val('');
                            $(this).attr("disabled", false);
                        });
                    break;

                case 500:
                    showErrorsModal($(this), 'Server Error. Please try again!');
                    $(this).attr("disabled", false);
                    break;
                default:
                    res.json().then(err => {
                        const errMsg = err.title || err.category || 'Cannot add category.'
                        showErrorsModal($(this), errMsg);
                        $(this).attr("disabled", false);
                    })
                    break;
            }
        })
});