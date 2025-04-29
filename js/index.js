document.addEventListener('DOMContentLoaded', () => {
    const llistatNoRealitzades = document.getElementById('llistat-no-realitzades');
    const llistatRealitzades = document.getElementById('llistat-realitzades');
    const botoImportar = document.getElementById('importar-activitats');
    const inputNomArxiu = document.getElementById('nom-arxiu-json');

    let descarregats = new Set(JSON.parse(localStorage.getItem('descarregats') || '[]'));

    function carregarActivitats() {
        const tasques = obtenirTasques();
        const noRealitzades = tasques.filter(tasca => !tasca.realitzada);
        const realitzades = tasques.filter(tasca => tasca.realitzada);

        llistatNoRealitzades.innerHTML = '';
        llistatRealitzades.innerHTML = '';

        noRealitzades.forEach(tasca => {
            const div = document.createElement('div');
            div.className = `tasca prioritat-${tasca.prioritat}`;
            const nomCategoria = typeof tasca.categoria === 'string' ? tasca.categoria : tasca.categoria.nom;
            const colorCategoria = typeof tasca.categoria === 'string' ? '#ffffff' : tasca.categoria.color;
            div.innerHTML = `
                <h3>${tasca.titol}</h3>
                <p>${tasca.descripcio}</p>
                <p>Data: ${tasca.data}</p>
                <p><span class="categoria" style="background-color: ${colorCategoria};">Categoria: ${nomCategoria}</span></p>
                <p>Prioritat: ${tasca.prioritat}</p>
                <p>Estat: Pendent</p>
            `;
            const botoRealitzada = document.createElement('button');
            botoRealitzada.textContent = 'Marcar com a Realitzada';
            botoRealitzada.addEventListener('click', () => {
                tasca.realitzada = true;
                guardarTasques(tasques);
                carregarActivitats();
            });
            const botoEliminar = document.createElement('button');
            botoEliminar.textContent = 'Eliminar';
            botoEliminar.addEventListener('click', () => {
                const index = tasques.findIndex(t => t.id === tasca.id);
                const tascaEsborrada = tasques[index];
                tasques.splice(index, 1);
                guardarTasques(tasques);
                const arxiuOrigen = tascaEsborrada.arxiuOrigen;
                if (arxiuOrigen && !tasques.some(t => t.arxiuOrigen === arxiuOrigen)) {
                    descarregats.delete(arxiuOrigen);
                    localStorage.setItem('descarregats', JSON.stringify([...descarregats]));
                }
                carregarActivitats();
            });
            div.appendChild(botoRealitzada);
            div.appendChild(botoEliminar);
            llistatNoRealitzades.appendChild(div);
        });

        realitzades.forEach(tasca => {
            const div = document.createElement('div');
            div.className = `tasca prioritat-${tasca.prioritat}`;
            const nomCategoria = typeof tasca.categoria === 'string' ? tasca.categoria : tasca.categoria.nom;
            const colorCategoria = typeof tasca.categoria === 'string' ? '#ffffff' : tasca.categoria.color;
            div.innerHTML = `
                <h3>${tasca.titol}</h3>
                <p>${tasca.descripcio}</p>
                <p>Data: ${tasca.data}</p>
                <p><span class="categoria" style="background-color: ${colorCategoria};">Categoria: ${nomCategoria}</span></p>
                <p>Prioritat: ${tasca.prioritat}</p>
                <p>Estat: Realitzada</p>
            `;
            const botoRealitzada = document.createElement('button');
            botoRealitzada.textContent = 'Desmarcar';
            botoRealitzada.addEventListener('click', () => {
                tasca.realitzada = false;
                guardarTasques(tasques);
                carregarActivitats();
            });
            const botoEliminar = document.createElement('button');
            botoEliminar.textContent = 'Eliminar';
            botoEliminar.addEventListener('click', () => {
                const index = tasques.findIndex(t => t.id === tasca.id);
                const tascaEsborrada = tasques[index];
                tasques.splice(index, 1);
                guardarTasques(tasques);
                const arxiuOrigen = tascaEsborrada.arxiuOrigen;
                if (arxiuOrigen && !tasques.some(t => t.arxiuOrigen === arxiuOrigen)) {
                    descarregats.delete(arxiuOrigen);
                    localStorage.setItem('descarregats', JSON.stringify([...descarregats]));
                }
                carregarActivitats();
            });
            div.appendChild(botoRealitzada);
            div.appendChild(botoEliminar);
            llistatRealitzades.appendChild(div);
        });
    }

    async function obtenirTasquesJSON() {
        const nomArxiu = inputNomArxiu.value.trim();
        if (!nomArxiu) {
            alert('Si us plau, introdueix el nom de l\'arxiu JSON (ex: activitats_003.json).');
            return;
        }
        const nomArxiuAmbExtensio = nomArxiu.endsWith('.json') ? nomArxiu : `${nomArxiu}.json`;
        const tasquesExistents = obtenirTasques();
        if (!tasquesExistents.some(tasca => tasca.arxiuOrigen === nomArxiuAmbExtensio)) {
            descarregats.delete(nomArxiuAmbExtensio);
            localStorage.setItem('descarregats', JSON.stringify([...descarregats]));
        }
        if (descarregats.has(nomArxiuAmbExtensio)) {
            alert(`${nomArxiuAmbExtensio} ja descarregat`);
            return;
        }
        try {
            const resposta = await fetch(`./dades/${nomArxiuAmbExtensio}`);
            const tasquesJSON = await resposta.json();
            for (let i = 0; i < tasquesJSON.length; i++) {
                const tasca = tasquesJSON[i];
                if (!tasquesExistents.some(t => t.id === tasca.id)) {
                    const novaTasca = new Tasca(tasca.id, tasca.titol, tasca.descripcio, tasca.data, tasca.categoria, tasca.prioritat, tasca.realitzada || false);
                    novaTasca.arxiuOrigen = nomArxiuAmbExtensio;
                    tasquesExistents.push(novaTasca);
                }
            }
            guardarTasques(tasquesExistents);
            descarregats.add(nomArxiuAmbExtensio);
            localStorage.setItem('descarregats', JSON.stringify([...descarregats]));
            carregarActivitats();
        } catch {
            alert("Error al carregar base de dades");
        }
    }

    botoImportar.addEventListener('click', obtenirTasquesJSON);

    carregarActivitats();
});