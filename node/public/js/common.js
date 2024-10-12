function changeCategory() {
    axios.get('/memo').then((data) => {
        console.log('data', data);
    });
}