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
                            console.log(data);
                            $('#js-addNewTag-input').val('')
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