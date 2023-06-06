$.ajax({
  url: "http://localhost:3000/api/filme",
  type: "GET",
  success: function (response) {},
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
    event.preventDefault();

    $.ajax({
      url: "http://localhost:3000/api/filme",
      type: "POST",
      data: $("#db-add-form").serialize(),
      success: function (response) {
        console.log(response);
        location.reload();
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  });
});

$(document).ready(function () {
  $.get("http://localhost:3000/api/filme?orderby=titel", function (data) {
    var tableData = data.data;

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
      '<th scope="col">Aktionen</th>' +
      "</tr>" +
      "</thead>";

    var tableBody = "<tbody>";
    for (var i = 0; i < tableData.length; i++) {
      var rowData = tableData[i];
      var deleteButton =
        '<button class="btn btn-danger btn-sm delete-btn" data-id="' +
        rowData.id +
        '"><i class="bi bi-trash me-1"></i>Löschen</button>';
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
        "</td>" +
        "</tr>";
    }
    tableBody += "</tbody>";

    var table =
      '<table class="table table-striped">' +
      tableHead +
      tableBody +
      "</table>";

    $(".data").html(table);

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
