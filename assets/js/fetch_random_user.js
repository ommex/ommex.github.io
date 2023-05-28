function zufaelligerBenutzerAbrufen() {
  fetch("https://randomuser.me/api/")
    .then((response) => response.json())
    .then((data) => {
      const benutzer = data.results[0];
      const vorname = benutzer.name.first;
      const nachname = benutzer.name.last;
      const email = benutzer.email;
      const stadt = benutzer.location.city;
      const bildUrl = benutzer.picture.large;
      const geburtsdatum = new Date(benutzer.dob.date).toLocaleDateString(
        "de-DE"
      );
      const telefon = benutzer.phone;
      const nationalitaet = benutzer.nat;

      const benutzerInfoElement = document.getElementById("benutzer-info");
      benutzerInfoElement.innerHTML = `
        <img src="${bildUrl}" alt="Profilbild" class="profilbild">
        <h2>${vorname} ${nachname}</h2>
        <p><i class="bi bi-envelope"></i> ${email}</p>
        <p><i class="bi bi-geo-alt"></i> ${stadt}</p>
        <p><i class="bi bi-calendar"></i> ${geburtsdatum}</p>
        <p><i class="bi bi-telephone"></i> ${telefon}</p>
        <p><i class="bi bi-flag"></i> ${nationalitaet}</p>
      `;
    })
    .catch((error) => {
      console.error("Fehler beim Abrufen des Benutzerprofils:", error);
    });
}

zufaelligerBenutzerAbrufen();
