const TAGS_PER_PAGE = 5;
let tagPageNumber = 1;
let tagList = [];

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
                        <button class="js-deleteTag-btn btn btn-sm btn-danger">
                            <i class="material-icons">delete</i> Delete
                        </button>
                    </td>
                </tr>
            `
        );
    };

    $(`#page-item-${tagPageNumber}`).addClass('active');
}

const createPagination = (curElm, numberItems) => {
    const maxPage = 5;
    const itemsPerPage = 5;
    const pageNeed = Math.ceil(numberItems / itemsPerPage);

    let pageItems = '';
    let end = Math.min(maxPage, pageNeed);

    for (let i = 1; i <= end; i++) {
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
                            tagList = data;

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
    const tagStr = $('#js-addNewTag-input').val();

    if (tagStr && tagStr.length === 0) return;

    postData('/api/tag/create', { title: tagStr })
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json()
                        .then(data => {
                            tagList.unshift(data);

                            updateTagsTable(tagList, tagPageNumber);
                            $('#js-addNewTag-input').val('');
                        })
                    break;
                case 500:
                    showErrorsModal($(this), 'Server Error. Please try again!')
                    break;
                default:
                    res.json()
                        .then(err => {
                            showErrorsModal($(this), err.tag)
                            console.log(err);
                        })
                    break;
            }
        })
})

$(document).on('click', '.js-deleteTag-btn', function (event) {
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