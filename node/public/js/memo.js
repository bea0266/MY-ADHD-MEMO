class Memo {
    constructor({ id, content, bgColor, fontSize }) {
        this.id = id;
        this.content = content;
        this.bgColor = bgColor;
        this.fontSize = fontSize;
        this.$memoEl = null;
    }

    render() {
        const $memo = document.createElement('div');
        $memo.id = `memo_item_${this.id}`;
        $memo.className = 'memo_item';

        const $memoToolbar = document.createElement('div');
        $memoToolbar.className = 'memo_toolbar';

        const $memoInput = document.createElement('div');
        $memoInput.className = 'memo_input';
        $memoInput.contentEditable = true;
        $memoInput.insertAdjacentHTML('beforeend', this.content);

        $memo.appendChild($memoToolbar);
        $memo.appendChild($memoInput);

        this.$memoEl = $memo;
    }
}