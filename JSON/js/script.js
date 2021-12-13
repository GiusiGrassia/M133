//DOM ready - Shorthand
$(document).ready(function() {

    // Ajax Request
    $.ajax({
        type: "GET",
        url: "https://gibm.becknet.ch/warenhaus/getFiliale.php",
        data: { format: 'JSON' }, // format mitgeben
        dataType: 'json'
    }).done(function(data) {
        // leere Option einfügen
        $('#filialen').append('<option>Ihre Auswahl ... </option>');
        // loop über JSON-Array
        $.each(data, function(key, filiale) {
            // Optionen anhängen
            $('#filialen').append('<option value=' + filiale.id + '>' + filiale.strasse + ', ' + filiale.stadt + '</option>');
        })
    }).fail(function() {
        // Fehlermeldung ausgeben - Bootstrap alert Box
        $('#message').html('<div class="alert alert-danger">Fehler ... </div>');
    });

    // Change Handler
    $('#filialen').change(function(e) {
        // leeren der Ausgabe
        $('#message').empty();
        // Ajax Request
        $.ajax({
            type: "GET",
            url: "https://gibm.becknet.ch/warenhaus/getFiliale.php",
            data: { format: 'json', filiale: this.value }, // format und id mitgeben
            dataType: 'json'
        }).done(function(data) {
            // wenn  Daten vorhanden sind ...
            if (data != '') {
                // Tabelle generieren - Bootstrap Table
                $('#message').append('<table class="table"><tr><th>Stadt</th><th>Strasse</th><th>Öffnungszeit</th></tr></table>');
                // Loop über JSON
                $.each(data, function(key, filiale) {
                    // Tabellenzeilen anfügen   
                    $('#message table').append('<tr><td>' + filiale.stadt +
                        '</td><td>' + filiale.strasse +
                        '</td><td>' + filiale.oeffnungszeiten +
                        '</td></tr>');
                })
            } else {
                // Fehlermeldung ausgeben - Bootstrap alert Box
                $('#message').html('<div class="alert alert-warning">Wählen Sie eine Filiale aus ...</div>');
            }
        }).fail(function() {
            // Fehlermeldung ausgeben - Bootstrap alert Box
            $('#message').html('<div class="alert alert-danger">Fehler ... </div>');
        });
    });
});