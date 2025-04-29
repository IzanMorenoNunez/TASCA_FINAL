function obtenirTasques() {
    const tasquesJSON = localStorage.getItem('tasques');
    try {
        const tasques = JSON.parse(tasquesJSON);
        return tasques.filter(tasca => Tasca.validar(tasca));
    } catch (error) {
        console.error('Error al carregar tasques:', error);
        return [];
    }
}

function guardarTasques(tasques) {
    const tasquesValides = tasques.filter(tasca => Tasca.validar(tasca));
    if (tasquesValides.length !== tasques.length) {
        console.warn('Algunes tasques no són vàlides i no es guardaran.');
    }
    localStorage.setItem('tasques', JSON.stringify(tasquesValides));
}

function obtenirCategories() {
    const categoriesJSON = localStorage.getItem('categories');
    try {
        const categories = JSON.parse(categoriesJSON); // parse : converts a JavaScript Object Notation (JSON) string into an object.
        return categories.filter(cat => Categoria.validar(cat));
    } catch (error) {
        console.error('Error al carregar categories:', error);
        return [];
    }
}

function guardarCategories(categories) {
    const categoriesValides = categories.filter(cat => Categoria.validar(cat));
    if (categoriesValides.length !== categories.length) {
        console.warn('Algunes categories no són vàlides i no es guardaran.');
    }
    localStorage.setItem('categories', JSON.stringify(categoriesValides)); // stringify (lo mateix que parse pero al reves) : converts a JavaScript value to a JavaScript Object Notation (JSON) string.
}