function validarTasca(tasca) {
    if (!tasca.id || typeof tasca.id !== 'string') {
        return false;
    }
    if (!tasca.titol || typeof tasca.titol !== 'string') {
        return false;
    }
    if (!tasca.descripcio || typeof tasca.descripcio !== 'string') {
        return false;
    }
    if (!tasca.data || typeof tasca.data !== 'string') {
        return false;
    }
    var nomCategoria = typeof tasca.categoria === 'string' ? tasca.categoria : (tasca.categoria && tasca.categoria.nom) || '';
    if (!nomCategoria || typeof nomCategoria !== 'string') {
        return false;
    }
    if (!tasca.prioritat || !['Baixa', 'Mitjana', 'Alta'].includes(tasca.prioritat)) {
        return false;
    }
    if (typeof tasca.realitzada !== 'boolean') {
        tasca.realitzada = false;
    }
    return true;
}

function validarCategoria(categoria) {
    var nom = typeof categoria === 'string' ? categoria : categoria.nom;
    return typeof nom === 'string' && nom.trim().length > 0;
}