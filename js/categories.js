document.addEventListener('DOMContentLoaded', () => {
    const formCategoria = document.getElementById('form-categoria');
    const llistatCategories = document.getElementById('llistat-categories');
    
    function carregarCategories() {
        const categories = obtenirCategories();
        llistatCategories.innerHTML = '';
        categories.forEach(categoria => {
            const li = document.createElement('li');
            li.style.backgroundColor = categoria.color;
            li.textContent = categoria.nom;
            const botoEliminar = document.createElement('button');
            botoEliminar.textContent = 'Eliminar';
            botoEliminar.addEventListener('click', () => {
                eliminarCategoria(categoria.nom);
                carregarCategories();
            });
            li.appendChild(botoEliminar);
            llistatCategories.appendChild(li);
        });
    }
    
    formCategoria.addEventListener('submit', (e) => {
        e.preventDefault();
        const nomCategoria = document.getElementById('nom-categoria').value.trim();
        const colorCategoria = document.getElementById('color-categoria').value;
        if (nomCategoria) {
            const categories = obtenirCategories();
            if (!categories.some(cat => cat.nom === nomCategoria)) {
                categories.push({ nom: nomCategoria, color: colorCategoria });
                guardarCategories(categories);
                carregarCategories();
                formCategoria.reset();
            } else {
                alert('Aquesta categoria ja existeix!');
            }
        }
    });

    function eliminarCategoria(nomCategoria) {
        const categories = obtenirCategories();
        const categoriesActualitzades = categories.filter(cat => cat.nom !== nomCategoria);
        guardarCategories(categoriesActualitzades);
    }
    
    carregarCategories();
});