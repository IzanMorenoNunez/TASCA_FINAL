class Tasca {
    constructor(id, titol, descripcio, data, categoria, prioritat, realitzada) {
        this.id = id;
        this.titol = titol;
        this.descripcio = descripcio;
        this.data = data;
        this.categoria = categoria;
        this.prioritat = prioritat;
        this.realitzada = realitzada || false;
    }

    static validar(tasca) {
        if (!tasca.id || !tasca.id.startsWith('task-')) {
            return false;
        }
        if (!tasca.titol || typeof tasca.titol !== 'string') {
            return false;
        }
        if (!tasca.descripcio || typeof tasca.descripcio !== 'string') {
            return false;
        }
        if (!tasca.data || isNaN(new Date(tasca.data).getTime())) {
            return false;
        }
        if (!tasca.categoria || typeof tasca.categoria !== 'string') {
            return false;
        }
        if (!['Baixa', 'Mitjana', 'Alta'].includes(tasca.prioritat)) {
            return false;
        }
        if (typeof tasca.realitzada !== 'boolean') {
            return false;
        }
        return true;
    }
}

class Categoria {
    constructor(nom) {
        this.nom = nom;
    }

    static validar(categoria) {
        const nom = typeof categoria === 'string' ? categoria : categoria.nom;
        return typeof nom === 'string' && nom.length > 0;
    }
}