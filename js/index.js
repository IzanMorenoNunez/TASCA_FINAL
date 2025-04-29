document.addEventListener('DOMContentLoaded', () => {
    const llistatActivitats = document.getElementById('llistat-activitats');
    const botoImportar = document.getElementById('importar-activitats');

    function carregarActivitats() {
        const tasques = obtenirTasques();
        llistatActivitats.innerHTML = '';

        tasques.forEach(tasca => {
            const div = document.createElement('div');
            div.className = 'tasca';
            div.innerHTML = `
                <h3>${tasca.titol}</h3>
                <p>${tasca.descripcio}</p>
                <p>Data: ${tasca.data}</p>
                <p>Categoria: ${tasca.categoria}</p>
                <p>Prioritat: ${tasca.prioritat}</p>
                <p>Estat: ${tasca.realitzada ? 'Realitzada' : 'Pendent'}</p>
            `;

            const botoRealitzada = document.createElement('button');
            botoRealitzada.textContent = tasca.realitzada ? 'Desmarcar' : 'Marcar com a Realitzada';
            botoRealitzada.addEventListener('click', () => {
                tasca.realitzada = !tasca.realitzada;
                guardarTasques(tasques);
                carregarActivitats();
            });

            const botoEliminar = document.createElement('button');
            botoEliminar.textContent = 'Eliminar';
            botoEliminar.addEventListener('click', () => {
                const index = tasques.findIndex(t => t.id === tasca.id);
                tasques.splice(index, 1);
                guardarTasques(tasques);
                carregarActivitats();
            });

            div.appendChild(botoRealitzada);
            div.appendChild(botoEliminar);
            llistatActivitats.appendChild(div);
        });
    }

    botoImportar.addEventListener('click', async () => {
        try {
            const resposta1 = await fetch('../dades/activitats_001.json');
            const resposta2 = await fetch('../dades/activitats_002.json');
            const activitats1 = await resposta1.json();
            const activitats2 = await resposta2.json();
            const activitatsJSON = [...activitats1, ...activitats2];

            const tasquesExistents = obtenirTasques();
            const idsExistents = tasquesExistents.map(tasca => tasca.id);

            activitatsJSON.forEach(tasca => {
                if (!idsExistents.includes(tasca.id)) {
                    tasquesExistents.push(tasca);
                }
            });

            guardarTasques(tasquesExistents);
            carregarActivitats();
            alert('Activitats importades correctament!');
        } catch (error) {
            console.error(error);
            alert('Error en importar les activitats');
        }
    });

    carregarActivitats();
});