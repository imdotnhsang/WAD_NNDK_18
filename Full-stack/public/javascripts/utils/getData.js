const getData = (url) => {
    return fetch(url)
        .then(response => response.json())
        .catch(err => err.json());
}

module.exports = getData;