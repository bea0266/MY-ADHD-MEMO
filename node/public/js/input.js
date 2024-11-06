class InputBox {
    constructor(item) {
        this.label = item.label;
        this.type = item.type;
        this.placeholder = item.placeholder;
        this.name = item.name;
        this.elClass = item.elClass;
        this.elId = item.elId;
        this.value = item.value;
        this.rule = item.rule;
    }

    render() {
        const input = document.createElement('input');
        input.type = this.type ?? undefined;
        input.placeholder = this.placeholder ?? undefined;
        input.name = this.name ?? undefined;
        input.className = this.elClass ?? undefined;
        input.id = this.elId ?? undefined;
        input.value = this.value ?? undefined;
        return input;
    }
}