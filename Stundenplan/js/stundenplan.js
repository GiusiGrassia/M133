//DOM ready - Shorthand
$(document).ready(function() {

    let actualDate = moment();

    //Mittlere Pagination Anzeige
    function weekPagination() {
        currentWeek = actualDate.format('W') + '-' + actualDate.format('Y');
        $('#currW').html('<a class="page-link">' + currentWeek + '</a>');
    };

    //Woche vorwärts
    function weekForward() {
        actualDate = actualDate.add(1, 'W');
        weekPagination();
    };

    //Woche rückwärts
    function weekBackward() {
        actualDate = actualDate.subtract(1, 'W');
        weekPagination();
    };

    //Aufruf Funktion "weekPagination"
    weekPagination();  

    //Funktion zum leeren der Klassenauswahl
    function clearKlassenauswahl() {
        $('#klassenauswahl').empty();
    };

    //Funktion zum leeren des Stundenplans
    function clearStundenplan() {
        $('#stundenplan').empty();
    };

    // Ajax Request Berufsgruppe
    $.ajax({
        type: "GET",
        url: "http://sandbox.gibm.ch/berufe.php",
        data: { format: 'JSON' }, // format mitgeben
        dataType: 'json'
    }).done(function(data) {
        // leere Option einfügen
        $('#berufsgruppe').append('<option>Ihre Auswahl ... </option>');
        // loop über JSON-Array
        $.each(data, function(key, berufe) {
            // Optionen anhängen
            $('#berufsgruppe').append('<option value=' + berufe.beruf_id + '>' + berufe.beruf_name + '</option>');
        })
    }).fail(function() {
        // Fehlermeldung ausgeben - Bootstrap alert Box
        $('#stundenplan').html('<div class="alert alert-danger">Fehler ... </div>');
    });

    // Change Handler Berufsgruppe
    $('#berufsgruppe').change(function(e) {

        // Klassenauswahl leeren
       clearKlassenauswahl();

        // Stundenplan leeren
        clearStundenplan();

        //Klassenauswahl laden    
        load_klassenauswahl(this.value);

    });

    // Ajax Request Klassenauswahl
    function load_klassenauswahl(beruf_id) {
        $.ajax({
            type: "GET",
            url: 'http://sandbox.gibm.ch/klassen.php?beruf_id=' + beruf_id,
            data: { format: 'JSON' }, // format mitgeben
            dataType: 'json'
        }).done(function(data) {
            // leere Option einfügen
            $('#klassenauswahl').append('<option>Ihre Auswahl ... </option>');
            // loop über JSON-Array
            $.each(data, function(key, klasse) {
                // Optionen anhängen
                $('#klassenauswahl').append('<option value=' + klasse.klasse_id + '>' + klasse.klasse_name + '</option>');
            })
        }).fail(function() {
            // Fehlermeldung ausgeben - Bootstrap alert Box
            $('#stundenplan').html('<div class="alert alert-danger">Fehler ... </div>');
        });
    };

    // Change Handler Klassenwahl
    $('#klassenauswahl').change(function(e) {

        // Stundenplan leeren
        clearStundenplan();

        // Stundenplan laden
        loadStundenplan(this.value);
    });

    // Ajax Request Stundenplan
    function loadStundenplan(klasse_id) {
        $.ajax({
            type: "GET",
            url: 'https://sandbox.gibm.ch/tafel.php?klasse_id=' + klasse_id + '&woche=' + actualDate.format('W') + '-' + actualDate.format('Y'),
            data: { format: 'json' }, // format und id mitgeben
            dataType: 'json'
        }).done(function(data) {
            // wenn  Daten vorhanden sind ...
            if (data != '') {
                // Tabelle generieren - Bootstrap Table
                $('#stundenplan').append('<table class="table"><tr><th>Datum</th><th>Wochentag</th><th>Von</th><th>Bis</th><th>Lehrer</th><th>Fach</th><th>Raum</th></tr></table>');
                // Loop über JSON
                $.each(data, function(key, tafel) {

                    // Tabellenzeilen anfügen   
                    $('#stundenplan table').append('<tr><td>' + tafel.tafel_datum +
                        '</td><td>' + tafel.tafel_wochentag +
                        '</td><td>' + tafel.tafel_von +
                        '</td><td>' + tafel.tafel_bis +
                        '</td><td>' + tafel.tafel_lehrer +
                        '</td><td>' + tafel.tafel_fach +
                        '</td><td>' + tafel.tafel_raum +
                        '</td></tr>');
                })
            } else {
                // Fehlermeldung ausgeben - Bootstrap alert Box
                $('#stundenplan').html('<div class="alert alert-warning text-center">Es wurden in dieser Woche keine Daten gefunden.<br>Evtl. findet in dieser Woche kein Unterricht statt, oder es wurden für diesen Zeitraum noch keine Daten eingegeben.</div>');
            }
        }).fail(function() {
            // Fehlermeldung ausgeben - Bootstrap alert Box
            $('#stundenplan').html('<div class="alert alert-danger">Fehler XYZ </div>');
        });
    };

    //Event Handler um eine Woche vorher anzuzeigen
    $('#prevW').click(function(e){
        weekBackward();
        clearStundenplan();
        loadStundenplan($('#klassenauswahl').val());
    });

    //Event Handler um eine Woche nachher anzuzeigen
    $('#nextW').click(function(e){
        weekForward();
        clearStundenplan();
        loadStundenplan($('#klassenauswahl').val());
    });

    //Event Handler um die aktuelle Woche anzuzeigen
    $('#currW').click(function(e){
        actualDate = moment();
        weekPagination();
        clearStundenplan();
        loadStundenplan($('#klassenauswahl').val());
    });


});