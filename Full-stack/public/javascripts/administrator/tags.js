const TAGS_PER_PAGE = 5;
let tagPageNumber = 1;
let tagList = [];

let datalist = [];
let showActive = -1;

const updateTagsTable = (tagList, pageNumber) => {    
    createPagination($('#js-tag__pagination'), tagList.length);

    const tagsTbody = $('.js-tags-table').children('tbody');

    const start = (pageNumber - 1) * TAGS_PER_PAGE;
    const end = Math.min(pageNumber * TAGS_PER_PAGE, tagList.length);

    tagsTbody.html('');
    for (let i = start; i < end; i++) {
        const tag = tagList[i];

        tagsTbody.html(
            tagsTbody.html() +
            `
                    <tr class="text-center" id='${tag._id}'>
                        <td>${i + 1}</td>
                        <td>${tag.title}</td>
                        <td>
                            ${
            tag.isActive
                ?
                `<button class="js-deleteTag-btn btn btn-danger">
                                        <i class="fas fa-trash"> Delete</i>
                                    </button>`
                :
                `<button class="js-activeTag-btn btn btn-primary">
                                        <i class="fas fa-check-circle"> Active</i>
                                    </button>`
            }
    
                        </td>
                    </tr>
                `
        );
    };

    $(`#page-item-${tagPageNumber}`).addClass('active');
}

const updateTagList = (tagList, datalist) => {
    if (showActive === -1) {
        tagList = [...datalist];
        return tagList;
    }

    tagList = datalist.filter(tag => tag.isActive == showActive);
    return tagList;
}

const createPagination = (curElm, numberItems) => {
    const maxPage = 5;
    const itemsPerPage = 5;
    const pageNeed = Math.ceil(numberItems / itemsPerPage);

    let pageItems = '';
    let start = Math.max(1, tagPageNumber - 4);
    let end = Math.max(Math.min(maxPage, pageNeed), tagPageNumber);

    for (let i = start; i <= end; i++) {
        pageItems +=
            `
                <li class="page-item mr-1" id="page-item-${i}">
                    <a class="page-link">${i}</a>
                </li>
            `
    }

    curElm.html(
        `
            <li class="page-item mr-1">
                <a class="page-link" aria-label="Previous">&laquo;</a>
            </li>
            ${pageItems}
            <li class="page-item">
                <a class="page-link" aria-label="Next">&raquo;</a>
            </li> 
        `
    )
}

$(document).ready(function () {
    getData('/api/tag/get-all')
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json()
                        .then(data => {
                            datalist = data;

                            tagList = updateTagList(tagList, datalist);
                            updateTagsTable(tagList, tagPageNumber);
                        })
                    break;
                case 500:
                    showErrorsModal($(this), 'Server Error. Please try again!')
                    break;
                default:
                    res.json()
                        .then(err => {
                            showErrorsModal($(this), 'Cannot get all tags. Please try again!');
                            console.log(err);
                        })
                    break;
            }
        })
});

$(document).on('click', 'li.page-item', function () {
    const value = $(this).children('a').html().trim();
    $(`#page-item-${tagPageNumber}`).removeClass('active');

    switch (value) {
        case '\253':
            tagPageNumber = Math.max(1, tagPageNumber - 1);
            break;
        case '\273':
            tagPageNumber = Math.min(Math.floor(tagList.length / TAGS_PER_PAGE) + 1, tagPageNumber + 1);
            break;
        default:
            try {
                const pageClick = JSON.parse(value);
                tagPageNumber = pageClick;
            } catch (error) {
                console.log(error);
            }
            break;
    }

    updateTagsTable(tagList, tagPageNumber);
});

$('#js-addNewTag-btn').click(function () {
    $(this).attr('disabled', true);
    const tagStr = $('#js-addNewTag-input').val();

    if (tagStr && tagStr.length === 0) {
        $(this).attr('disabled', false);
        return;
    };

    postData('/api/tag/create', { title: tagStr })
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json()
                        .then(data => {
                            datalist.unshift(data);

                            tagList = updateTagList(tagList, datalist);
                            updateTagsTable(tagList, tagPageNumber);
                            $('#js-addNewTag-input').val('');
                            $(this).attr('disabled', false);
                        })
                    break;
                case 500:
                    showErrorsModal($(this), 'Server Error. Please try again!');
                    $(this).attr('disabled', false);
                    break;
                default:
                    res.json()
                        .then(err => {
                            console.log(err);
                            showErrorsModal($(this), err.tag || 'Something error.');
                            $(this).attr('disabled', false);
                        })
                    break;
            }
        })
})

$(document).on('click', '.js-deleteTag-btn', function (event) {
    $(this).attr('disabled', true);
    const trTag = $(this).parent().parent()
    const id = trTag.attr('id');
    const curPos = JSON.parse(trTag.children()[0].innerHTML) - 1;

    postData('/api/tag/delete', { id })
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json()
                        .then(data => {
                            for (let tag of datalist) {
                                if (tag._id === data._id) {
                                    tag.isActive = false;
                                    break;
                                }
                            }

                            tagList.splice(curPos, 1);
                            updateTagsTable(tagList, tagPageNumber);
                        })
                    break;
                case 500:
                    showErrorsModal($(this), 'Server Error. Please try again!')
                    break;
                default:
                    res.json()
                        .then(err => {
                            showErrorsModal($(this), 'Fail to delete tag.')
                            console.log(err);
                        });
                    break;
            }
        })
});

$(document).on('click', '.js-activeTag-btn', function (event) {
    $(this).attr('disabled', true);

    const trTag = $(this).parent().parent()
    const id = trTag.attr('id');
    const curPos = JSON.parse(trTag.children()[0].innerHTML) - 1;

    postData('/api/tag/active', { id })
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json()
                        .then(data => {
                            console.log(data);
                            for (let tag of datalist) {
                                if (tag._id === data._id) {
                                    tag.isActive = true;
                                    break;
                                }
                            }

                            tagList.splice(curPos, 1);
                            updateTagsTable(tagList, tagPageNumber);
                        })
                    break;
                case 500:
                    showErrorsModal($(this), 'Server Error. Please try again!')
                    break;
                default:
                    res.json()
                        .then(err => {
                            showErrorsModal($(this), 'Fail to delete tag.')
                            console.log(err);
                        });
                    break;
            }
        })
});

$('#js-tags-type-select').on('change', function(){
    // console.log($(this).val());
    showActive = parseInt($(this).val(), 10);
    tagPageNumber = 1;
    tagList = updateTagList(tagList, datalist);
    updateTagsTable(tagList, tagPageNumber);
})