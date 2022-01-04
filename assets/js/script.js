$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault()

        let valueInput = $("#hero").val();
        caracter = /[a-zA-Z]/gim;

        if (valueInput.match(caracter) || valueInput > 731) {
            alert("Debes Ingresar un Número Entero Menor o igual a 731");
        } else {
            $.ajax({
                type: "GET",
                url: "https://superheroapi.com/api.php/1372490626467076/" + valueInput,
                dataType: "json",
                success: function(data) {
                    let nombre = data.name;
                    let conexion = data.connections['group-affiliation'];
                    let imagen = data.image.url;
                    let publicado = data.biography.publisher
                    let ocupacion = data.work['occupation']
                    let aparicion = data.biography['first-appearance']
                    let altura = data.appearance.height
                    let peso = data.appearance.weight
                    let alianza = data.biography.aliases

                    $("#resultado").html(`
                    <h3 class="text-center">SuperHero Encontrado</h3>
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-md-5">
                                <img src="${imagen}" class="imagenHeroe">
                            </div>
                            <div class="col-md-7">
                                <div class="card-body">
                                    <h5 class="card-title"><i>Nombre: <i>${nombre}</h5>
                                    <p class="card-text"><i>Conexiones: <i>${conexion}</p>
                                    <div class="mx-3">
                                        <p class="card-text"><i>Publicado: <i>${publicado}</p>
                                        <hr>
                                        <p class="card-text"><i>Ocupación: <i>${ocupacion}</p>
                                        <hr>
                                        <p class="card-text"><i>Primera aparición: <i>${aparicion}</p>
                                        <hr>
                                        <p class="card-text"><i>Altura: <i>${altura}</p>
                                        <hr>
                                        <p class="card-text"><i>Peso: <i>${peso}</p>
                                        <hr>
                                        <p class="card-text"><i>Alianzas: <i>${alianza}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);

                    canvasJSSuperHero(data);
                },
                error: function () {
                    alert("Ocurrió un error al conectarse a la API");
                },

            });

            function canvasJSSuperHero(APIHero) {
                var options = {
                    title: {
                        text: `Estadisticas de poder para ${APIHero.name}`,
                    },
                    data: [{
                        type: "pie",
                        startAngle: 10,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} ({y})",
                        dataPoints: [
                            { label: "Combate", y: APIHero.powerstats.combat },
                            { label: "Rapidez", y: APIHero.powerstats.speed },
                            { label: "Poder", y: APIHero.powerstats.power },
                            { label: "Inteligencia", y: APIHero.powerstats.intelligence },
                            { label: "Fuerza", y: APIHero.powerstats.strength },
                            { label: "Durabilidad", y: APIHero.powerstats.durability },
                        ],
                    },],
                };
                let chart = new CanvasJS.Chart("chartContainer", options);
                chart.render();
            };
        };
    });
});