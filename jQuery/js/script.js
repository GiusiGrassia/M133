$(() => {
    console.log('start');

    // 3. h1 Klasse red hinzufügen
    $('h1').addClass('red');

    // 4.  h2 Klasse blue entfernen, Klasse green hinzufügen
    $('h2.blue').removeClass('blue').addClass('green');

    // 5. ID seconde Klasse red geben
    $('#second').addClass('red');

    // 6. erstes Element p Text ändern
    $('p:first').text('Hallo Welt');

    // 7. letztes Element p umschliessen
    $('p:last').wrapInner('<em></em>');
    //var $secondp = $('p:last').text();
    //$('p:last').html('<em>'+$secondp+'</em>');

    // 8. li Element ab ul anhängen
    $('ul').append('<li id="four">vierter Listenpunkt</li>');

    // 9. Attribut selektionieren und ändern
    $('li[id=four]').attr('id', 'five');

    // 10. Attribut auslesen und Element erweitern
    $('li').each(function() {
        $(this).append('<em> ' + $(this).attr('id') + '</em>');
    });

    // 11. CSS anpassen
    $('li').css('font-size', '30px');

    // 13. Element hinzufügen
    $('#addItem').submit(function(e) {
        // Standardverhalten verhindern
        e.preventDefault();
        // Einfügen der Eingabe als neues ListItem
        $('ul').append('<li>' + $('input[name=listItem]').val() + '</li>');
        // 11. CSS anpassen
        $('ul li').last().css('font-size', '30px');
        // Click-Event registrieren
        $('ul li').last().click(function() {
            $(this).remove();
        })
    });

    // 14. click event für li Elemente Registrieren
    $('li').click(function() {
        $(this).remove();
    });
});