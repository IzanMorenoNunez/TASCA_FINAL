document.addEventListener('DOMContentLoaded', function() {
    var formTasca = document.getElementById('form-tasca');
    var selectCategoria = document.getElementById('categoria');

    function carregarCategories() {
        var categories = obtenirCategories();
        selectCategoria.innerHTML = '';
        if (categories.length === 0) {
            var option = document.createElement('option');
            option.value = '';
            option.textContent = 'No hi ha categories disponibles';
            option.disabled = true;
            option.selected = true;
            selectCategoria.appendChild(option);
        } else {
            for (var i = 0; i < categories.length; i++) {
                var categoria = categories[i];
                var option = document.createElement('option');
                option.value = JSON.stringify(categoria);
                option.textContent = categoria.nom;
                selectCategoria.appendChild(option);
            }
        }
    }

    formTasca.addEventListener('submit', function(e) {
        e.preventDefault();
        var titol = document.getElementById('titol').value.trim();
        var descripcio = document.getElementById('descripcio').value.trim();
        var data = document.getElementById('data').value;
        var categoria = JSON.parse(selectCategoria.value);
        var prioritat = document.getElementById('prioritat').value;
        var id = 'task-' + Date.now();
        var novaTasca = {
            id: id,
            titol: titol,
            descripcio: descripcio,
            data: data,
            categoria: categoria,
            prioritat: prioritat,
            realitzada: false
        };
        var tasques = obtenirTasques();
        tasques.push(novaTasca);
        guardarTasques(tasques);
        formTasca.reset();
        alert('Tasca creada correctament!');
    });

    carregarCategories();
});