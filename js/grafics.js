document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('grafic-tasques').getContext('2d');

    function obtenirDadesGrafic() {
        const tasques = obtenirTasques();
        const mesos = Array(12).fill(0); // Array per als 12 mesos

        tasques.forEach(tasca => {
            if (tasca.realitzada) {
                const data = new Date(tasca.data);
                const mes = data.getMonth();
                mesos[mes]++;
            }
        });

        return mesos;
    }

    const dadesGrafic = obtenirDadesGrafic();
    new Chart(ctx, {
        type: 'bar',
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
});