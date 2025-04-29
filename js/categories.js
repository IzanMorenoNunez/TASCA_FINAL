document.addEventListener('DOMContentLoaded', () => {
    const formCategoria = document.getElementById('form-categoria');
    const llistatCategories = document.getElementById('llistat-categories');
    
    function carregarCategories() {
        const categories = obtenirCategories();
        llistatCategories.innerHTML = '';

        categories.forEach(categoria => {
            const li = document.createElement('li');
            li.textContent = categoria;
            
            const colorCat = document.getElementById('color-categoria');
            const color = document.createElement('area');
            color.textContent = colorCat

            const botoEliminar = document.createElement('button');
            botoEliminar.textContent = 'Eliminar';
            botoEliminar.addEventListener('click', () => {
                eliminarCategoria(categoria);
                carregarCategories();
            });
            
            li.appendChild(color);
            li.appendChild(botoEliminar);
            llistatCategories.appendChild(li);
        });
    }
    
    formCategoria.addEventListener('submit', (e) => {
        e.preventDefault();
        const nomCategoria = document.getElementById('nom-categoria').value;
        
        if (nomCategoria) {
            const categories = obtenirCategories();
            if (!categories.includes(nomCategoria)) {
                categories.push(nomCategoria);
                guardarCategories(categories);
                carregarCategories();
                formCategoria.reset();
            } else {
                alert('Aquesta categoria ja existeix!');
            }
        }
    });

    function eliminarCategoria(categoriaAEliminar) {
        const categories = obtenirCategories();
        const categoriesActualitzades = categories.filter(cat => cat !== categoriaAEliminar);
        guardarCategories(categoriesActualitzades);
    }
    
    carregarCategories();
});