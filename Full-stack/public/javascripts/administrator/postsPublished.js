$('.js-delete__postPublished--btn').click(function() {
    const id = $(this).attr('articleId');

    console.log(id);
    if (!id) {
        return;
    }

    postData('/api/article/delete', {id})
        .then(res => {
            const statusCode = res.status;

            switch (statusCode) {
                case 200:
                    res.json().then(data => {
                        console.log(data);

                        $(`#js-article__${id}`).hide();
                    })
                    break;
            
                case 500:
                    showErrorsModal($(this), "Server error. Please try again!");
                    break;
                default:
                    res.json().then(err =>{
                        const errMsg = err.account || 'Something fail. Please try again!';
                        showErrorsModal($(this), errMsg);
                    })
                    break;
            }
        })
})