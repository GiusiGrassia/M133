const images = ['img/slot1.png','img/slot2.png', 'img/slot3.png', 'img/slot4.png', 'img/slot5.png', 'img/slot6.png'];

var randomOne;
var randomTwo;
var randomThree;

var guthaben = 10;

var verlauf = [];

function slotMachine() {

    var randomOne = Math.round(Math.random() * 5);
    var randomTwo = Math.round(Math.random() * 5);
    var randomThree = Math.round(Math.random() * 5);

    var imageOne = document.getElementById('slot1');
    var imageTwo = document.getElementById('slot2');
    var imageThree = document.getElementById('slot3');
    
    imageOne.src = images[randomOne];
    imageTwo.src = images[randomTwo];
    imageThree.src = images[randomThree];

    
    if(randomOne == randomTwo && randomOne == randomThree) {
        
        var ausgabe = document.getElementById('ausgabe');
        var ausgabeGuthaben = document.getElementById('guthaben');
        var ausgabeVerlauf = document.getElementById('verlauf');

        ausgabe.innerHTML = 'Sie haben Gewonnen!';
        ausgabeGuthaben.innerHTML = 'Ihr Guthaben beträgt: CHF ' + guthaben.toFixed(2);

        verlauf.push("Lets go! + 5.00<br />");

        guthaben = guthaben + 5;

        ausgabeVerlauf.innerHTML = verlauf.slice(-10).join(' ');

    } else {

        var ausgabe = document.getElementById('ausgabe');
        var ausgabeGuthaben = document.getElementById('guthaben');
        var ausgabeVerlauf = document.getElementById('verlauf');

        ausgabe.innerHTML = 'Leider nicht gewonnen!';
        ausgabeGuthaben.innerHTML = 'Ihr Guthaben beträgt: CHF ' + guthaben.toFixed(2);

        verlauf.push('Misst! - 0.20</style><br />');

        guthaben = guthaben - 0.20;

        ausgabeVerlauf.innerHTML = verlauf.slice(-10).join(' ');
    }
    
}

var startButton = document.getElementById('start');
if(startButton.addEventListener){
    startButton.addEventListener('click', slotMachine, false);
};