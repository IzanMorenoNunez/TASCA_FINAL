document.addEventListener('DOMContentLoaded', function() {
    var formCategoria = document.getElementById('form-categoria');
    var llistatCategories = document.getElementById('llistat-categories');

    function mostrarCategories() {
        var categories = obtenirCategories();
        llistatCategories.innerHTML = '';
        for (var i = 0; i < categories.length; i++) {
            var categoria = categories[i];
            var li = document.createElement('li');
            li.style.backgroundColor = categoria.color;
            li.textContent = categoria.nom;
            var botoEliminar = document.createElement('button');
            botoEliminar.textContent = 'Eliminar';
            botoEliminar.addEventListener('click', function() {
                var categoriesActualitzades = [];
                for (var j = 0; j < categories.length; j++) {
                    if (categories[j].nom !== categoria.nom) {
                        categoriesActualitzades.push(categories[j]);
                    }
                }
                guardarCategories(categoriesActualitzades);
                mostrarCategories();
            });
            li.appendChild(botoEliminar);
            llistatCategories.appendChild(li);
        }
    }

    formCategoria.addEventListener('submit', function(e) {
        e.preventDefault();
        var nomCategoria = document.getElementById('nom-categoria').value.trim();
        var colorCategoria = document.getElementById('color-categoria').value;
        if (nomCategoria) {
            var categories = obtenirCategories();
            var categoriaJaExisteix = false;
            for (var i = 0; i < categories.length; i++) {
                if (categories[i].nom === nomCategoria) {
                    categoriaJaExisteix = true;
                    break;
                }
            }
            if (!categoriaJaExisteix) {
                categories.push({ nom: nomCategoria, color: colorCategoria });
                guardarCategories(categories);
                formCategoria.reset();
                mostrarCategories();
            } else {
                alert('Aquesta categoria ja existeix!');
            }
        }
    });

    mostrarCategories();
});