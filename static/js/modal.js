export class Modal {
    constructor() {
        this.fadeTime = 500;
        this.modalContainer = document.getElementById("modalContainer");
        this.modalHeader = document.getElementById("modalHeader");
        this.modalContent = document.getElementById("modalContent");
        document.getElementById("modalClose").addEventListener("click", this.hide.bind(this));
        document.getElementById("modalOverlay").addEventListener("click", this.hide.bind(this));
    }
    open(headerHTML, contentHTML) {
        this.modalHeader.innerHTML = headerHTML;
        this.modalContent.innerHTML = contentHTML;
        this.show();
    }
    show() {
        this.modalContainer.style.cssText = "opacity: 1 !important; pointer-events: auto";
    }
    hide() {
        this.modalContainer.style.cssText = "opacity: 0 !important; pointer-events: none";
    }
}