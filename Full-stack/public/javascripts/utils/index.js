const getData = (url) => {
    return fetch(url)
        .then(response => response);
}

const postData = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response)
}