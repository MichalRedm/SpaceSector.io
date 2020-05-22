export class Protector {
    constructor() {
        this.name()
    }
    name() {
        const nameInput = document.getElementById("nameInput");
        this.protectAttribute(nameInput, "maxlength");
    }
    protectAttribute(element, attributeName, interval) {
        interval = interval || 100;
        const initialValue = element.getAttribute(attributeName);
        setInterval(() => {
            if (element.getAttribute(attributeName) !== initialValue) {
                nameInput.setAttribute("maxlength", initialValue);
                console.log("lol don't try to hack :)");
            }
        }, 100);
    }
}