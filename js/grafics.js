var grafic = null;

function obtenirDadesGrafic() {
    var tasques = obtenirTasques();
    var mesos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Array per als 12 mesos

    for (var i = 0; i < tasques.length; i++) {
        var tasca = tasques[i];
        if (tasca.realitzada) {
            var data = new Date(tasca.data);
            var mes = data.getMonth(); // 0 = Gener, 11 = Desembre
            mesos[mes] = mesos[mes] + 1;
        }
    }

    return mesos;
}

function actualitzarGrafic() {
    var ctx = document.getElementById('grafic-tasques').getContext('2d');
    var dadesGrafic = obtenirDadesGrafic();

    if (grafic) {
        grafic.destroy(); // Destruïm el gràfic anterior
    }

    grafic = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
            datasets: [{
                label: 'Tasques Realitzades',
                data: dadesGrafic,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    actualitzarGrafic();
});