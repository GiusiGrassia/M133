console.log('start');

function loadDropdown() {
    console.log('load Dropdown');

    var filialen = new XMLHttpRequest();

    filialen.onreadystatechange = function() {
        if (filialen.readyState == 4 && filialen.status == 200) {
            document.getElementById("filialen").insertAdjacentHTML('beforeend', filialen.responseText)
        };
    };

    filialen.open("GET", "https://gibm.becknet.ch/warenhaus/getFiliale.php", true);
    filialen.send();
};

function loadFiliale(id) {
    console.log('Filiale' + id);

    var filiale = new XMLHttpRequest();

    filiale.onreadystatechange = function() {
        if (filiale.readyState == 4 && filiale.status == 200) {
            document.getElementById("message").innerHTML = filiale.responseText;
        };
    };

    filiale.open("GET", "https://gibm.becknet.ch/warenhaus/getFiliale.php?filiale=" + id, true);
    filiale.send();
};

window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    loadDropdown();

}, false);

document.getElementById('filialen').addEventListener('change', function() {
    loadFiliale(this.value);
}, false);