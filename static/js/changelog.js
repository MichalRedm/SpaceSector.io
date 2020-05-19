import { Modal } from "./modal.js";

let modal = new Modal();

export class Changelog {
    constructor() {
        this.changelog = document.getElementById("changelog");
        this.changelogContent = document.getElementById("changelogContent");
        var c = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                c.updates = this.responseXML.getElementsByTagName("update");
                c.display(this);
                c.generateModalContent(this);
                changelog.addEventListener("click", function(){
                    modal.open("Changelog", c.modalContent);
                });
            }
        };
        xhttp.open("GET", "/static/changelog/changelog.xml", true);
        xhttp.send();        
    }
    display(xml) {
        var HTML = `${this.updates[0].getAttribute("date")}<ul>`;
        for (var i = 0; i < this.updates[0].getElementsByTagName("change").length; i++) {
            HTML += `<li>${this.updates[0].getElementsByTagName("change")[i].innerHTML}</li>`;
        }
        HTML += "</ul>";
        this.changelogContent.innerHTML = HTML;
    }
    generateModalContent(xml) {
        let modalContent = "";
        for (var i = 0; i < this.updates.length; i++) {
            modalContent += `<section class="changelogUpdate"><header>${this.updates[i].getAttribute("date")}</header><ul>`;
            for (var j = 0; j < this.updates[i].getElementsByTagName("change").length; j++) {
                modalContent += `<li>${this.updates[i].getElementsByTagName("change")[j].innerHTML}</li>`;
            }
            modalContent += '</ul></section>';
        }
        modalContent += '<a id="changelogXMLLink" href="/static/changelog/changelog.xml" target="_blank">Show XML file</a>';
        this.modalContent = modalContent;
    }
}