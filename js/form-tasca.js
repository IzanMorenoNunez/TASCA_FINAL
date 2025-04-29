document.addEventListener('DOMContentLoaded', () => {
    const formTasca = document.getElementById('form-tasca');
    const selectCategoria = document.getElementById('categoria');

    function carregarCategories() {
        const categories = obtenirCategories();
        selectCategoria.innerHTML = '';
        if (categories.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No hi ha categories disponibles';
            option.disabled = true;
            option.selected = true;
            selectCategoria.appendChild(option);
        } else {
            categories.forEach(categoria => {
                const option = document.createElement('option');
                option.value = JSON.stringify(categoria);
                option.textContent = categoria.nom;
                selectCategoria.appendChild(option);
            });
        }
    }

    formTasca.addEventListener('submit', (e) => {
        e.preventDefault();
        const titol = document.getElementById('titol').value.trim();
        const descripcio = document.getElementById('descripcio').value.trim();
        const data = document.getElementById('data').value;
        const categoria = JSON.parse(selectCategoria.value);
        const prioritat = document.getElementById('prioritat').value;
        const id = `task-${Date.now()}`;
        const novaTasca = new Tasca(id, titol, descripcio, data, categoria, prioritat, false);
        const tasques = obtenirTasques();
        tasques.push(novaTasca);
        guardarTasques(tasques);
        formTasca.reset();
        alert('Tasca creada correctament!');
    });

    carregarCategories();
});