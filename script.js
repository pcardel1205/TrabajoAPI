window.onload = function () {

    var boton = document.getElementById("btnBuscar");
    var salida = document.getElementById("info");

    boton.onclick = function () {
        var pais = document.getElementById("campoPais").value.trim();

        if (pais === "") {
            salida.innerHTML = "<p style='color:red'>Escribe un país primero.</p>";
            return;
        }

        salida.innerHTML = "Buscando información...";

        consultarPais(pais);
    };

    function consultarPais(nombrePais) {

        var url = "https://restcountries.com/v3.1/name/" + nombrePais;

        fetch(url)
            .then(function (respuesta) {
                if (!respuesta.ok) {
                    throw new Error("No encontrado");
                }
                return respuesta.json();
            })
            .then(function (datos) {

                var pais = datos[0];

                salida.innerHTML = `
                    <div class="tarjeta">
                        <h2>${pais.translations.spa.common}</h2>
                        <img src="${pais.flags.png}">
                        <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "Desconocida"}</p>
                        <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
                        <p><strong>Región:</strong> ${pais.region}</p>
                    </div>
                `;
            })
            .catch(function () {
                salida.innerHTML = "<p style='color:red'>No se encontró ese país.</p>";
            });
    }
};
