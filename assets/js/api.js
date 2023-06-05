$.ajax({
  url: "http://localhost:3000/api/filme",
  type: "GET",
  success: function (response) {
    // Backend ist erreichbar
  },
  error: function (xhr, status, error) {
    $("#db-api").empty();
    $("#db-api").append(
      '<div class="container-fluid">\n' +
        '  <h2 class="text-danger position-absolute top-50 start-50 translate-middle"><i class="bi bi-bug me-2"></i>Error! API nicht erreichbar :(</h2>\n' +
        "</div>"
    );
  },
});

$(document).ready(function () {
  $("#db-add-form").submit(function (event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // AJAX-Anfrage zum Senden der Formulardaten
    $.ajax({
      url: "http://localhost:3000/api/filme", // Die URL der Server-Seite, die die Daten empfängt
      type: "POST", // Die HTTP-Methode zum Senden der Daten
      data: $("#db-add-form").serialize(), // Die serialisierten Formulardaten
      success: function (response) {
        // Erfolgreiche Antwort verarbeiten
        console.log(response);
        location.reload();
      },
      error: function (xhr, status, error) {
        // Fehlerbehandlung
        console.error(error);
      },
    });
  });
});

$(document).ready(function () {
  $.get("http://localhost:3000/api/filme?orderby=titel", function (data) {
    // Daten verarbeiten und Tabelle generieren
    var tableData = data.data;

    // Tabellenkopf erstellen
    var tableHead =
      "<thead>" +
      "<tr>" +
      '<th scope="col">#</th>' +
      '<th scope="col">Titel</th>' +
      '<th scope="col">Produktionsfirma</th>' +
      '<th scope="col">Regisseur</th>' +
      '<th scope="col">Genre</th>' +
      '<th scope="col">Ausstrahldatum</th>' +
      '<th scope="col">Erstellt</th>' +
      '<th scope="col">Aktualisiert</th>' +
      '<th scope="col">Aktionen</th>' + // Neue Spalte für Aktionen
      "</tr>" +
      "</thead>";

    // Tabelleninhalt erstellen
    var tableBody = "<tbody>";
    for (var i = 0; i < tableData.length; i++) {
      var rowData = tableData[i];
      var deleteButton =
        '<button class="btn btn-danger btn-sm delete-btn" data-id="' +
        rowData.id +
        '"><i class="bi bi-trash me-1"></i>Löschen</button>'; // Löschbutton mit Daten-ID
      tableBody +=
        "<tr>" +
        '<th scope="row">' +
        rowData.id +
        "</th>" +
        "<td>" +
        rowData.titel +
        "</td>" +
        "<td>" +
        rowData.produktionsfirma +
        "</td>" +
        "<td>" +
        rowData.regisseur +
        "</td>" +
        "<td>" +
        rowData.genre +
        "</td>" +
        "<td>" +
        rowData.ausstrahldatum +
        "</td>" +
        "<td>" +
        new Date(rowData.created).toLocaleString() +
        "</td>" +
        "<td>" +
        new Date(rowData.updated).toLocaleString() +
        "</td>" +
        "<td>" +
        deleteButton +
        "</td>" + // Spalte für den Löschbutton
        "</tr>";
    }
    tableBody += "</tbody>";

    // Tabelle erstellen
    var table =
      '<table class="table table-striped">' +
      tableHead +
      tableBody +
      "</table>";

    // Tabelle in die HTML-Div einfügen
    $(".data").html(table);

    // DELETE-Request senden
    $(".delete-btn").click(function () {
      var id = $(this).data("id");
      $.ajax({
        url: "http://localhost:3000/api/filme/",
        type: "DELETE",
        data: { id: id },
        success: function (response) {
          location.reload();
        },
        error: function (error) {
          console.log("Fehler beim Löschen:", error);
        },
      });
    });
  });
});
