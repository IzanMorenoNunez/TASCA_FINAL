document.addEventListener('DOMContentLoaded', function() {
    var llistatNoRealitzades = document.getElementById('llistat-no-realitzades');
    var llistatRealitzades = document.getElementById('llistat-realitzades');
    var botoImportar = document.getElementById('importar-activitats');
    var inputNomArxiu = document.getElementById('nom-arxiu-json');

    var fitxersDescarregats = JSON.parse(localStorage.getItem('descarregats') || '[]');

    function mostrarTasques() {
        var tasques = obtenirTasques();
        llistatNoRealitzades.innerHTML = '';
        llistatRealitzades.innerHTML = '';

        for (var i = 0; i < tasques.length; i++) {
            var tasca = tasques[i];
            var nomCategoria = typeof tasca.categoria === 'string' ? tasca.categoria : tasca.categoria.nom;
            var colorCategoria = typeof tasca.categoria === 'string' ? '#ffffff' : tasca.categoria.color;

            var prioritat = tasca.prioritat;
            if (prioritat === 'Alta' || prioritat === 'alta') {
                prioritat = 'alta';
            } else if (prioritat === 'Mitjana' || prioritat === 'mitjana') {
                prioritat = 'mitjana';
            } else if (prioritat === 'Baixa' || prioritat === 'baixa') {
                prioritat = 'baixa';
            } else {
                prioritat = 'baixa';
            }
            console.log('Prioritat de la tasca ' + tasca.titol + ': ' + prioritat);

            var divTasca = document.createElement('div');
            divTasca.className = 'tasca prioritat-' + prioritat;
            divTasca.innerHTML = `
                <h3>${tasca.titol}</h3>
                <p>${tasca.descripcio}</p>
                <p>Data: ${tasca.data}</p>
                <p><span class="categoria" style="background-color: ${colorCategoria};">Categoria: ${nomCategoria}</span></p>
                <p>Prioritat: ${tasca.prioritat}</p>
                <p>Estat: ${tasca.realitzada ? 'Realitzada' : 'Pendent'}</p>
            `;

            var botoRealitzada = document.createElement('button');
            botoRealitzada.textContent = tasca.realitzada ? 'Desmarcar' : 'Marcar com a Realitzada';
            botoRealitzada.setAttribute('data-index', i);
            botoRealitzada.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'));
                var tasquesActuals = obtenirTasques();
                tasquesActuals[index].realitzada = !tasquesActuals[index].realitzada;
                guardarTasques(tasquesActuals);
                mostrarTasques();
                actualitzarGrafic(); // Actualitzem el gràfic
            });

            var botoEliminar = document.createElement('button');
            botoEliminar.textContent = 'Eliminar';
            botoEliminar.setAttribute('data-index', i);
            botoEliminar.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'));
                var tasquesActuals = obtenirTasques();
                var arxiuOrigen = tasquesActuals[index].arxiuOrigen;
                tasquesActuals.splice(index, 1);
                guardarTasques(tasquesActuals);

                var hiHaTasquesDArxiu = false;
                for (var j = 0; j < tasquesActuals.length; j++) {
                    if (tasquesActuals[j].arxiuOrigen === arxiuOrigen) {
                        hiHaTasquesDArxiu = true;
                        break;
                    }
                }
                if (!hiHaTasquesDArxiu) {
                    var indexFitxer = fitxersDescarregats.indexOf(arxiuOrigen);
                    if (indexFitxer !== -1) {
                        fitxersDescarregats.splice(indexFitxer, 1);
                        localStorage.setItem('descarregats', JSON.stringify(fitxersDescarregats));
                    }
                }
                mostrarTasques();
                actualitzarGrafic(); // Actualitzem el gràfic
            });

            divTasca.appendChild(botoRealitzada);
            divTasca.appendChild(botoEliminar);

            if (tasca.realitzada) {
                llistatRealitzades.appendChild(divTasca);
            } else {
                llistatNoRealitzades.appendChild(divTasca);
            }
        }
    }

    botoImportar.addEventListener('click', function() {
        var nomArxiu = inputNomArxiu.value.trim();
        if (!nomArxiu) {
            alert('Introdueix el nom de l arxiu JSON (ex: activitats_001.json).');
            return;
        }
        var nomArxiuComplet = nomArxiu.endsWith('.json') ? nomArxiu : nomArxiu + '.json';

        var tasquesExistents = obtenirTasques();
        var hiHaTasquesDArxiu = false;
        for (var i = 0; i < tasquesExistents.length; i++) {
            if (tasquesExistents[i].arxiuOrigen === nomArxiuComplet) {
                hiHaTasquesDArxiu = true;
                break;
            }
        }
        if (!hiHaTasquesDArxiu) {
            var indexFitxer = fitxersDescarregats.indexOf(nomArxiuComplet);
            if (indexFitxer !== -1) {
                fitxersDescarregats.splice(indexFitxer, 1);
                localStorage.setItem('descarregats', JSON.stringify(fitxersDescarregats));
            }
        }

        if (fitxersDescarregats.includes(nomArxiuComplet)) {
            alert(nomArxiuComplet + ' ja descarregat');
            return;
        }

        fetch('./dades/' + nomArxiuComplet)
            .then(function(resposta) {
                return resposta.json();
            })
            .then(function(novesTasques) {
                for (var i = 0; i < novesTasques.length; i++) {
                    var novaTasca = novesTasques[i];
                    var jaExisteix = false;
                    for (var j = 0; j < tasquesExistents.length; j++) {
                        if (tasquesExistents[j].id === novaTasca.id) {
                            jaExisteix = true;
                            break;
                        }
                    }
                    if (!jaExisteix) {
                        novaTasca.arxiuOrigen = nomArxiuComplet;
                        tasquesExistents.push(novaTasca);
                    }
                }
                guardarTasques(tasquesExistents);
                fitxersDescarregats.push(nomArxiuComplet);
                localStorage.setItem('descarregats', JSON.stringify(fitxersDescarregats));
                mostrarTasques();
                actualitzarGrafic();
            })
            .catch(function() {
                alert('Error al carregar base de dades');
            });
    });

    mostrarTasques();
});