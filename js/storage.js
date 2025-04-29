function obtenirTasques() {
    const tasquesJSON = localStorage.getItem('tasques');
    if (!tasquesJSON) {
        return [];
    }
    try {
        const tasques = JSON.parse(tasquesJSON);
        return tasques.filter(tasca => Tasca.validar(tasca)).map(tasca => {
            const novaTasca = new Tasca(tasca.id, tasca.titol, tasca.descripcio, tasca.data, tasca.categoria, tasca.prioritat, tasca.realitzada);
            novaTasca.arxiuOrigen = tasca.arxiuOrigen;
            return novaTasca;
        });
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
    if (!categoriesJSON) {
        return [];
    }
    try {
        const categories = JSON.parse(categoriesJSON);
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
    localStorage.setItem('categories', JSON.stringify(categoriesValides));
}