function obtenirTasques() {
    var tasquesString = localStorage.getItem('tasques');
    if (!tasquesString) {
        return [];
    }
    var tasques = JSON.parse(tasquesString);
    var tasquesValides = [];
    for (var i = 0; i < tasques.length; i++) {
        var tasca = tasques[i];
        if (validarTasca(tasca)) {
            tasquesValides.push(tasca);
        }
    }
    return tasquesValides;
}

function guardarTasques(tasques) {
    var tasquesValides = [];
    for (var i = 0; i < tasques.length; i++) {
        var tasca = tasques[i];
        if (validarTasca(tasca)) {
            tasquesValides.push(tasca);
        }
    }
    localStorage.setItem('tasques', JSON.stringify(tasquesValides));
}

function obtenirCategories() {
    var categoriesString = localStorage.getItem('categories');
    if (!categoriesString) {
        return [];
    }
    var categories = JSON.parse(categoriesString);
    var categoriesValides = [];
    for (var i = 0; i < categories.length; i++) {
        var categoria = categories[i];
        if (validarCategoria(categoria)) {
            categoriesValides.push(categoria);
        }
    }
    return categoriesValides;
}

function guardarCategories(categories) {
    var categoriesValides = [];
    for (var i = 0; i < categories.length; i++) {
        var categoria = categories[i];
        if (validarCategoria(categoria)) {
            categoriesValides.push(categoria);
        }
    }
    localStorage.setItem('categories', JSON.stringify(categoriesValides));
}