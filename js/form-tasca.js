document.addEventListener('DOMContentLoaded', () => {
    const formTasca = document.getElementById('form-tasca');
    const selectCategoria = document.getElementById('categoria');

    function carregarCategories() {
        const categories = obtenirCategories();
        selectCategoria.innerHTML = '<option value="">Selecciona una categoria</option>';
        categories.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            selectCategoria.appendChild(option);
        });
    }

    function generarIdTasca() {
        const tasques = obtenirTasques(); 
        const numTasques = tasques.length;
        return `task-${String(numTasques + 1).padStart(3, '0')}`; //demanar
    }

    formTasca.addEventListener('submit', (e) => {
        e.preventDefault();

        const titol = document.getElementById('titol').value;
        const descripcio = document.getElementById('descripcio').value;
        const data = document.getElementById('data').value;
        const categoria = selectCategoria.value;
        const prioritat = document.getElementById('prioritat').value;

        if (!titol || !descripcio || !data || !categoria || !prioritat) {
            alert('Tots els camps són obligatoris!');
            return;
        }

        const novaTasca = {
            id: generarIdTasca(),
            titol: titol,
            descripcio: descripcio,
            data: data,
            categoria: categoria,
            prioritat: prioritat,
            realitzada: false
        };

        const tasques = obtenirTasques();
        tasques.push(novaTasca);
        guardarTasques(tasques);

        alert('Tasca afegida correctament!');
        formTasca.reset();
    });

    carregarCategories();
});