async function changeCategory() {
    await axios.get('/memo').then((res) => {
        const result = res.data;
        const memoListElement = document.getElementById('memo_list');
        memoListElement.innerHTML = ''; // 기존 내용을 지웁니다.
        
        result.data.forEach((memo) => {
            const p = document.createElement('p');
            p.textContent = `id: ${memo.id}, writeDate: ${memo.writeDate}, content: ${memo.content}`;
            memoListElement.appendChild(p);
        });
    });
}

function debounce(func, wait) {
    let timeout;

    return function(...args) {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}