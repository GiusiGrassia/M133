//DOM ready - Shorthand
$(document).ready(function() {
    moment.locale('de-CH');
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

    //Berufsgruppe laden
    loadBerufsgruppen();

    //Funktion zum leeren der Klassenauswahl
    function clearKlassenauswahl() {
        $('#klassenauswahl').empty();
    };

    function clearLocalStorageKeySavedClass() {
        localStorage.removeItem('savedKlasse');
    }

    //Funktion zum leeren des Stundenplans
    function clearStundenplan() {
        $('#stundenplan').empty();
        $('#emptySchedule').empty();
        $('#error').empty();
    };

    // Ajax Request Berufsgruppe
    function loadBerufsgruppen() {
        $.ajax({
            type: "GET",
            url: "http://sandbox.gibm.ch/berufe.php",
            data: { format: 'JSON' }, // format mitgeben
            dataType: 'json'
        }).done(function(data) {
            // "Ihre Auswahl" Option einfügen
            $('#berufsgruppe').append('<option>Ihre Auswahl ... </option>');
            // loop über JSON-Array
            $.each(data, function(key, berufe) {
                // Optionen anhängen
                $('#berufsgruppe').append('<option value=' + berufe.beruf_id + '>' + berufe.beruf_name + '</option>');
            })
            if (localStorage.getItem('savedBeruf') !== null) {
                $('#berufsgruppe').val(localStorage.getItem('savedBeruf'));
                load_klassenauswahl(localStorage.getItem('savedBeruf'));
            }
        }).fail(function() {
            // Fehlermeldung - #001
            $('#error').html('<div class="alert alert-danger">Error Code #001</div>').fadeIn();
        });
    }


    // Change Handler Berufsgruppe
    $('#berufsgruppe').change(function(e) {

        //Localstorage Key "savedBeruf" mit der Beruf ID speichern.
        localStorage.setItem('savedBeruf', this.value);

        // Klassenauswahl leeren
        clearKlassenauswahl();

        clearLocalStorageKeySavedClass();

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
                $('#klassenauswahl').append('<option value=' + klasse.klasse_id + '>' + klasse.klasse_longname + '</option>');
            })
            if (localStorage.getItem('savedKlasse') !== null) {
                $('#klassenauswahl').val(localStorage.getItem('savedKlasse'));
                loadStundenplan(localStorage.getItem('savedKlasse'));
            }
        }).fail(function() {
            // Fehlermeldung - #002
            $('#error').html('<div class="alert alert-danger">Error Code #002</div>').fadeIn();
        });
    };

    // Change Handler Klassenwahl
    $('#klassenauswahl').change(function(e) {

        //Localstorage Key "savedKlasse" mit der Klassen ID speichern.
        localStorage.setItem('savedKlasse', this.value);

        // Stundenplan leeren
        clearStundenplan();

        // Stundenplan laden
        loadStundenplan(this.value);
    });

    // Ajax Request Stundenplan
    function loadStundenplan(klasse_id) {
        $('#stundenplan').fadeOut(function() {
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
                        $('#stundenplan table').append('<tr><td>' + moment(tafel.tafel_datum, 'YYYY-MM-DD').format('DD.MM.YYYY') +
                            '</td><td>' + moment(tafel.tafel_wochentag, 'd').format('dddd') +
                            '</td><td>' + moment(tafel.tafel_von, 'hh:mm:ss').format('HH:mm') +
                            '</td><td>' + moment(tafel.tafel_bis, 'hh:mm:ss').format('HH:mm') +
                            '</td><td>' + tafel.tafel_lehrer +
                            '</td><td>' + tafel.tafel_longfach +
                            '</td><td>' + tafel.tafel_raum +
                            '</td></tr>');

                        $('#stundenplan').fadeIn();
                    })
                } else {
                    // Fehlermeldung ausgeben - Bootstrap alert Box
                    $('#emptySchedule').html('<div class="alert alert-warning text-center">Es wurden in dieser Woche keine Daten gefunden.<br>Evtl. findet in dieser Woche kein Unterricht statt, oder es wurden für diesen Zeitraum noch keine Daten eingegeben.</div>').fadeIn();
                }
            }).fail(function() {
                // Fehlermeldung - #003
                $('#error').html('<div class="alert alert-danger">Error Code #003</div>').fadeIn();
            });
        });
    };

    //Event Handler um eine Woche vorher anzuzeigen
    $('#prevW').click(function(e) {
        weekBackward();
        clearStundenplan();
        loadStundenplan($('#klassenauswahl').val());
    });

    //Event Handler um eine Woche nachher anzuzeigen
    $('#nextW').click(function(e) {
        weekForward();
        clearStundenplan();
        loadStundenplan($('#klassenauswahl').val());
    });

    //Event Handler um die aktuelle Woche anzuzeigen
    $('#currW').click(function(e) {
        actualDate = moment();
        weekPagination();
        clearStundenplan();
        loadStundenplan($('#klassenauswahl').val());
    });


});