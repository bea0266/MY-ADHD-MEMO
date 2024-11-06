class Button {
    constructor(id, label, action) {
       this.id = id;
       this.className = 'memo_btn';
       this.label = label;
       this.action = action;
       this.el = null;
    }

    render() {
        const $button = document.createElement('button');
        $button.id = this._id;
        $button.className = this._className;
        $button.textContent = this._label;
        $button.addEventListener('click', () => {
            this._action();
        })

        this._el = $button;
    }
}

class CancelButton extends Button {
    constructor(id, action) {
        super(id, '취소', action);
        super.render()
        this.el.classList.add('cancel_btn');
    }
}