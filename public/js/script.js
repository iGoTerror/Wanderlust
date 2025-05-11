(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


document.addEventListener("DOMContentLoaded", () => {
  // ----- Image Preview -----
  const fileInput = document.getElementById("img");
  const previewImg = document.querySelector("img[alt='Listing Image']");

  if (fileInput && previewImg) {
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  } else {
    console.warn("File input or preview image not found.");
  }

  // ----- Coordinates Map -----
  const coordinatesDiv = document.getElementById('listing-coordinates');

  if (coordinatesDiv) {
    const lat = parseFloat(coordinatesDiv.getAttribute('data-lat'));
    const lng = parseFloat(coordinatesDiv.getAttribute('data-lng'));
    const title = coordinatesDiv.getAttribute('data-title');
    const location = coordinatesDiv.getAttribute('data-location');

    if (!isNaN(lat) && !isNaN(lng)) {
      const map = L.map('map').setView([lat, lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`<b>${title}</b><br>${location}`)
        .openPopup();
    } else {
      console.warn('Invalid latitude or longitude values.');
    }
  } else {
    console.warn('Coordinates div not found.');
  }
});

//Tax Calculation

document.addEventListener('DOMContentLoaded', function () {
  const taxSwitch = document.getElementById('taxSwitch');
  const priceElements = document.querySelectorAll('.listing-price');
  const taxNotes = document.querySelectorAll('.tax-note');

  taxSwitch.addEventListener('change', function () {
    priceElements.forEach((priceEl, index) => {
      const basePrice = parseFloat(priceEl.dataset.basePrice);
      if (taxSwitch.checked) {
        const gstPrice = basePrice * 1.18; // Assuming GST is 18%
        priceEl.textContent = gstPrice.toLocaleString("en-IN", {
          maximumFractionDigits: 2
        });
        taxNotes[index].style.display = 'inline';
      } else {
        priceEl.textContent = basePrice.toLocaleString("en-IN");
        taxNotes[index].style.display = 'none';
      }
    });
  });
});




