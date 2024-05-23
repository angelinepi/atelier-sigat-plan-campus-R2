
// Supression des filtres
var clearBtn = document.getElementById("clearSubMenuBtn");
clearBtn.addEventListener("click", function() {
  executeClearSubMenu(); // Première exécution
  executeClearSubMenu(); // Deuxième exécution

  /// supprimer les filtres dans l'url 
  // Récupérer le campus actuel à partir de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const campus = urlParams.get('campus');
  // Créer une nouvelle URL avec uniquement le paramètre 'campus'
  const newUrl = `?campus=${encodeURI(campus)}`;
  // Mettre à jour l'URL et l'historique
  history.pushState({ campus: campus }, campus, newUrl);

});

function executeClearSubMenu() { // Définit une fonction nommée 'executeClearSubMenu'
	
  // Sélectionne tous les éléments 'li' et 'a' dans 'ul.nav' qui n'ont pas les classes 'sidebar-search' ou 'sidebar-remove-filters'
  $('ul.nav li:not(.sidebar-search,.sidebar-remove-filters), ul.nav li:not(.sidebar-search,.sidebar-remove-filters) a ').each(function (i) {
	  
      // Vérifie si l'élément courant a un attribut 'id'
      if ($(this).attr('id')) {
          var removelayer = $(this).attr('id'); // Récupère l'attribut 'id' de l'élément courant
	      
          // Vérifie si une couche avec l'id 'removelayer' existe dans la carte
          if (map.getLayer(removelayer)) {
              var visibility = map.getLayoutProperty(removelayer, 'visibility'); // Récupère la propriété 'visibility' de la couche
		  
              // Si la couche n'est pas masquée
              if (visibility != "none") {
                  if (Layers.includes(removelayer)) { // Vérifie si 'removelayer' est dans le tableau 'Layers'
                      var element = $("[id='" + removelayer + "']"); // Récupère l'élément avec l'id 'removelayer'
			  
                      // Vérifie si l'élément suivant de 'element' n'a pas la classe 'in' et l'ajoute si c'est le cas
                      if (!element.next('ul').hasClass("in"))
                          element.next('ul').addClass("in");
			  
                      // Vérifie si 'element' est dans le tableau 'listLayers'
                      if (listLayers.includes(element.get(0))) {
                          var index = $.inArray(element.get(0), listLayers); // Récupère l'index de 'element' dans 'listLayers'
			      
                          // Supprime 'element' de 'listLayers'
                          if (index > -1) {
                              listLayers.splice(index, 1);
                          }
                      }

                      // Déclenche un événement 'click' sur 'element'
                      element.trigger("click");

                      // Supprime la classe 'in' de l'élément suivant de 'element' s'il l'a
                      if (element.next('ul').hasClass("in"))
                          element.next('ul').removeClass("in");

                      // Supprime la classe 'active' du parent de 'element' s'il l'a
                      if (element.parent().hasClass("active"))
                          element.parent().removeClass("active");
                  }
              }
          }
      }
  });

  // Sélectionne tous les éléments 'a' actifs dans 'ul.nav li.active'
  $('ul.nav li.active a.active').each(function (i) {
      // Supprime la classe 'active' de l'élément courant s'il l'a
      if ($(this).hasClass("active"))
          $(this).removeClass("active");
  });

  // Sélectionne tous les éléments 'li' et 'ul' actifs dans 'ul.nav li.active' qui n'ont pas les classes 'sidebar-search' ou 'sidebar-remove-filters'
  $('ul.nav li.active:not(.sidebar-search,.sidebar-remove-filters), ul.nav li.active:not(.sidebar-search,.sidebar-remove-filters) ul.in ').each(function (i) {
      // Supprime les classes 'active' et 'in' de l'élément courant s'il les a
      if ($(this).hasClass("active"))
          $(this).removeClass("active");
      if ($(this).hasClass("in"))
          $(this).removeClass("in");
  });
}

 //définition d'une fonction permettant l'extraction d'une valeur d'un paramètre d'URL (avec expression régulière)

  function getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    //window.location.search : indique la barre où se trouve l'URL, puis concatenation de :
      //la RegExp recherche n'importe quel caractère suivi de ? ou & (replace(/[\.\+\*]/g, "\\$&"))
      //encodage de la valeur du paramètre d'URL (encodeURIComponent(key))
      //replace remplace les caractères spéciaux en caractères échappés "(?:\\=([^&]*))?)?.*$"
      //"i" = insensible à la casse  
  }
  

  var overlay = getQueryStringValue("layer").toString(); //extraction de la valeur du paramètre d'URL "layer"
  var overlayPoint = getQueryStringValue("point").toString(); //extraction de la valeur du paramètre d'URL "point"
  var version = document.getElementById("plan").getAttribute("data-version");

  // fonction utilisé lors du chargement 

///////////////////// LIENS PROFONDS //////////////////////

 /**
   * Créer un lien vers le site Plan des Campus Université de Rennes 
   * @param selectedCampus Nom du campus
   * @param selectedCategory Nom de la catégorie
   * @param selectedObjet Nom de l'objet/élément 
   * @returns {string} URL de recherche
   */
 function createLinkAndUpdateURL(selectedCampus, selectedCategory, selectedObjet) {
  let url = window.location.pathname; 

  // Ajouter le campus à l'URL
  url += `?campus=${encodeURI(selectedCampus)}`;
  
  // Vérifier si selectedCategory n'est pas null ou undefined avant de l'ajouter à l'URL
  if (selectedCategory !== null && selectedCategory !== undefined) {
    url += `&category=${encodeURI(selectedCategory)}`;
  }
  
  // Vérifier si objet n'est pas null ou undefined avant de l'ajouter à l'URL
  if (selectedObjet !== null && selectedObjet !== undefined) {
    url += `&objet=${encodeURI(selectedObjet)}`;
  }
    
  history.pushState({ campus: selectedCampus, category: selectedCategory, objet: selectedObjet }, campus, url); 
  return url;
}

/////////////////////////////////// code pour changer de CAMPUS /////////////////////////////

//////////////////// Page vers URL //////////////////////

/**  Sélectionner tous les boutons de campus */
const campusButtons = document.querySelectorAll('.btn.btn-primary');

// Ajouter un gestionnaire d'événements à chaque bouton de campus + création de lien et mise à jour de l'URL 
campusButtons.forEach(function(button) {
  button.addEventListener('click', function(event) {
    /** Récupérer le nom du campus à partir du bouton cliqué */
    const selectedCampus = event.target.textContent.trim(); 
    /** Récupérer la catégorie sélectionnée à partir de l'URL */
    const selectedCategory = getCategoryFromURL(); // 
    const selectedObjet = getObjetFromURL();
    createLinkAndUpdateURL(selectedCampus, selectedCategory,selectedObjet); 
  });
});

// si pas de parametre campus dans l'url alors on met le campus par défaut à Villejean 
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = getCategoryFromURL();
  const selectedObjet = getObjetFromURL();

  if (!urlParams.has('campus')) {
    const selectedCampus = 'Villejean';

    // Mettre à jour l'URL avec le paramètre 'campus'
    urlParams.set('campus', selectedCampus);
    history.pushState({ campus: selectedCampus, category: selectedCategory, objet : selectedObjet}, '', window.location.pathname + '?' + urlParams.toString());

    createLinkAndUpdateURL(selectedCampus, selectedCategory, selectedObjet);
  }
});

//////////////////// URL vers page //////////////////////

/**
 * Fonction pour obtenir le nom du campus à partir de l'URL
 * @returns {string} Nom du campus
 */
function getCampusFromURL() {
  const urlParams = new URLSearchParams(window.location.search); // Récupérer les paramètres de l'URL
  return urlParams.get('campus'); // Récupérer la valeur du paramètre de campus
}

/**
 * Fonction pour activer (style + action) le bouton correspondant au nom du campus
 * @param {*} selectedCampus 
 */
function activateCampusButton(selectedCampus) {
  const campusButtons = document.querySelectorAll('.btn.btn-primary');
  campusButtons.forEach(function(button) {
    if (button.textContent.trim() === selectedCampus) {
      button.classList.add('active'); // Ajouter la classe active au bouton 

      // Ajouter la logique pour définir le zoom en fonction du campus
      if (selectedCampus === 'Mazier') {
        map.setMaxBounds(mazierBounds);
        map.jumpTo({
          zoom: zoomBase,
          center: [-2.7410000, 48.513033]
        });
      } else if (selectedCampus === 'Villejean') {
        map.setMaxBounds(rennesBounds);
        map.jumpTo({
          zoom: zoomBase,
          center: [-1.7013, 48.119365]
        });
      } else if (selectedCampus === 'La Harpe') {
        map.setMaxBounds(rennesBounds);
        map.jumpTo({
          zoom: zoomBase,
          center: [-1.7091, 48.1254]
        });
      }

    } else {
      button.classList.remove('active');
    }
  });
}

// Lorsque la page se charge, récupérez le nom du campus dans l'URL et activez le bouton correspondant
document.addEventListener('DOMContentLoaded', function() {
   // quand l'url est rechargé alors on récupère le campus si il y en a un alors on active le bouton correspondant
  const selectedCampus = getCampusFromURL();
  if (selectedCampus) {
    activateCampusButton(selectedCampus);
  }
});
/////////////////////////// fin du code pour changer de campus /////////////////////////////



/////////////////////////// code pour changer de CATEGORIES ////////////////////////////////////// 

///////////////// Page vers URL //////////////////////

/**
 * Sélectionner tous les liens de catégorie dans la barre de navigation
 */
const categoryLinks = document.querySelectorAll('.sidebar #side-menu a.case');

// pour activer la catégorie sélectionnée lors du click sur le menu de gauche
// Ajouter un gestionnaire d'événements à chaque lien de catégorie
categoryLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien

    /** Récupérer le nom de la catégorie du lien cliqué */
    const categoryName = link.id
    /** Récupérer le nom du campus du lien */
    const selectedCampus = getCampusFromURL();
    
    const selectedObjet = getObjetFromURL();

    // Mettre à jour la catégorie sélectionnée
    selectedCategory = categoryName;

    // Retirer la classe "active" de tous les liens
    categoryLinks.forEach(function(link) {
      link.classList.remove('active');
    });

    // Ajouter la classe "active" au lien cliqué
    link.classList.add('active');

    // Activer la catégorie sélectionnée
    activateCategory(categoryName);

    // Mettre à jour l'URL et afficher la nouvelle URL dans la console
    const updatedURL = createLinkAndUpdateURL(selectedCampus, selectedCategory,selectedObjet);
    console.log(updatedURL);
  });
});

///////////////// URL vers page //////////////////////

/**
 * Fonction pour obtenir le nom de la catégorie à partir de l'URL
 * @returns {string} Nom de la catégorie issu de l'URL 
 */
function getCategoryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('category'); // Récupérer la valeur du paramètre de catégorie
}

/**
 * Active la catégorie située dans l'URL
 * 
 * Ajoute les marqueurs et les couches de la catégorie sélectionnée
 * @param {*} categoryName 
 */
function activateCategory(categoryName) {
  const categoryLinks = document.querySelectorAll('.sidebar #side-menu a.case');
  categoryLinks.forEach(function(link) {
    // if (link.id === categoryName) { // Vérifier si le nom de la catégorie correspond au nom de la catégorie du lien
      // link.classList.add('active');
      console.log('Catégorie activée :', categoryName);

//////////////////////////////////  Groupe Amphis et salles spécifiques //////////////////////////////////////

      if (overlayPoint) {
        getSearchedItem(overlayPoint);
      }

      if (categoryName == 'Amphithéâtre') {
        addCategoryOverlay(amphitheatresLink, 'Amphithéâtre', 'layer', 'marker', amphiURL, tailleMarker, amphiCount);
        amphiCount += 1;
      }
      amphitheatresLink.onclick = function (e) {
        addCategoryOverlay(amphitheatresLink, 'Amphithéâtre', 'layer', 'marker', amphiURL, tailleMarker, amphiCount);
        amphiCount += 1;
      }
  
      if (categoryName == 'Salle informatique') {
        addCategoryOverlay(sallesInfoLink, 'Salle informatique', 'layer', 'marker', sallesInfoURL, tailleMarker, sallesInfoCount);
        sallesInfoCount += 1;
      }
      sallesInfoLink.onclick = function (e) {
        addCategoryOverlay(sallesInfoLink, 'Salle informatique', 'layer', 'marker', sallesInfoURL, tailleMarker, sallesInfoCount);
        sallesInfoCount += 1;
        if (sallesInfoCount > 1000) {
          alert("Refonte du plan interactif 2024 par Pauline Besnard, Alexandre Blin, Paul Bourcier, Saïd Khatir, Yanis Lepesant et Angéline Pinilo")
        };
      }

      if (categoryName == 'Salles spécifiques') {
        addCategoryOverlay(sallesSpecifiquesLink, 'Salles spécifiques', sallesSpeLinkState, 'marker', sallesSpeURL, tailleMarker, sallesSpeCount);
        sallesSpeCount += 1;
        if (sallesSpeCount == 0) {
          createHTMLList('Salles spécifiques', listesallesSpe, insertSallesSpecifiques, sallesSpeCount);
        }
      }
      sallesSpecifiquesLink.onclick = function (e) {
        addCategoryOverlay(sallesSpecifiquesLink, 'Salles spécifiques', sallesSpeLinkState, 'marker', sallesSpeURL, tailleMarker, sallesSpeCount);
        if (sallesSpeCount == 0) {
          createHTMLList('Salles spécifiques', listesallesSpe, insertSallesSpecifiques, sallesSpeCount);
        }
        sallesSpeCount += 1;
      }
      
      //////////////////////////////////  equipement et services //////////////////////////////////////

    if (categoryName == 'Services communs') {
      addCategoryOverlay(ServicescomLink, 'Services communs', ServicescomLinkState, 'marker', ServicescomURL, tailleMarker, ServicescomCount);
      if (ServicescomCount == 0) {
        createHTMLList('Services communs', listeServicescom, insertServicescom, ServicescomCount);
      }
      ServicescomCount += 1;
    }
    ServicescomLink.onclick = function (e) {
      addCategoryOverlay(ServicescomLink, 'Services communs', ServicescomLinkState, 'marker', ServicescomURL, tailleMarker, ServicescomCount);
      if (ServicescomCount == 0) {
        createHTMLList('Services communs', listeServicescom, insertServicescom, ServicescomCount);
      }
      ServicescomCount += 1;
    }

    if (categoryName == 'Services généraux') {
      addCategoryOverlay(ServicesgenLink, 'Services généraux', ServicesgenLinkState, 'marker', ServicesgenURL, tailleMarker, ServicesgenCount);
      if (ServicesgenCount == 0) {
        createHTMLList('Services généraux', listeServicesgen, insertServicesgen, ServicesgenCount);
      }
      ServicesgenCount += 1;
    }
    ServicesgenLink.onclick = function (e) {
      addCategoryOverlay(ServicesgenLink, 'Services généraux', ServicesgenLinkState, 'marker', ServicesgenURL, tailleMarker, ServicesgenCount);
      if (ServicesgenCount == 0) {
        createHTMLList('Services généraux', listeServicesgen, insertServicesgen, ServicesgenCount);
      }
      ServicesgenCount += 1;
    }


    if (categoryName == 'Services centraux') {
      addCategoryOverlay(ServicescenLink, 'Services centraux', ServicescenLinkState, 'marker', ServicescenURL, tailleMarker, ServicescenCount);
      if (ServicescenCount == 0) {
        createHTMLList('Services centraux', listeServicescen, insertServicescen, ServicescenCount);
      }
      ServicescenCount += 1;
    }
    ServicescenLink.onclick = function (e) {
      addCategoryOverlay(ServicescenLink, 'Services centraux', ServicescenLinkState, 'marker', ServicescenURL, tailleMarker, ServicescenCount);
      if (ServicescenCount == 0) {
        createHTMLList('Services centraux', listeServicescen, insertServicescen, ServicescenCount);
      }
      ServicescenCount += 1;
    }

    if (categoryName == 'wc') {
      addCategoryOverlay(toilettesLink, 'wc', 'layer', 'marker', toilettesURL, tailleMarker, toilettesCount);
      toilettesCount += 1;
    } 
    toilettesLink.onclick = function (e) {
      addCategoryOverlay(toilettesLink, 'wc', 'layer', 'marker', toilettesURL, tailleMarker, toilettesCount);
      toilettesCount += 1;
    }
    
    copieurLink.onclick = function (e) {
      addCategoryOverlay(copieurLink, 'Copieur', 'layer', 'marker', copieursURL, tailleMarker, copieurCount);
      copieurCount += 1;
    }

    if (categoryName ==  'Micro-ondes') {
      addCategoryOverlay(microOndesLink, 'Micro-ondes', 'layer', 'marker', microOndesURL, taillePetitMarker, microOndesCount);
      microOndesCount += 1;
    }
    microOndesLink.onclick = function (e) {
      addCategoryOverlay(microOndesLink, 'Micro-ondes', 'layer', 'marker', microOndesURL, taillePetitMarker, microOndesCount);
      microOndesCount += 1;
    }

    espaceDetenteLink.onclick = function (e) {
      addCategoryOverlay(espaceDetenteLink, 'Espace détente', 'layer', 'marker', espaceDetenteURL, tailleMarker, espaceDetenteCount);
      espaceDetenteCount += 1;
    }

    if (categoryName ==  'Equipement sportif') {
      addCategoryOverlay(equipementSportifLink, 'Equipement sportif', 'layer', 'marker', equipementSportifURL, tailleMarker, equipementSportifCount);
      equipementSportifCount += 1;
    }
    equipementSportifLink.onclick = function (e) {
      addCategoryOverlay(equipementSportifLink, 'Equipement sportif', 'layer', 'marker', equipementSportifURL, tailleMarker, equipementSportifCount);
      equipementSportifCount += 1;
    }
    
    //////////////////////////////////  Formation et recherche //////////////////////////////////////
    if (categoryName == 'Formation UFRL') {
      addCategoryOverlay(FUFRLLink, 'Formation UFRL', FUFRLLinkState, 'marker', FUFRLURL, tailleMarker, FUFRLCount);
      if (FUFRLCount == 0) {
        createHTMLList('Formation UFRL', listeFUFRL, insertFUFRL, FUFRLCount);
      }
      FUFRLCount += 1;
    }
    FUFRLLink.onclick = function (e) {
      addCategoryOverlay(FUFRLLink, 'Formation UFRL', FUFRLLinkState, 'marker', FUFRLURL, tailleMarker, FUFRLCount);
      if (FUFRLCount == 0) {
        createHTMLList('Formation UFRL', listeFUFRL, insertFUFRL, FUFRLCount);
      }
      FUFRLCount += 1;
    }


    if (categoryName ==  'Formation UFRSH') {
      addCategoryOverlay(FUFRSHLink, 'Formation UFRSH', FUFRSHLinkState, 'marker', FUFRSHURL, tailleMarker, FUFRSHCount);
      if (FUFRSHCount == 0) {
        createHTMLList('Formation UFRSH', listeFUFRSH, insertFUFRSH, FUFRSHCount);
      }
      FUFRSHCount += 1;
    }

    FUFRSHLink.onclick = function (e) {
      addCategoryOverlay(FUFRSHLink, 'Formation UFRSH', FUFRSHLinkState, 'marker', FUFRSHURL, tailleMarker, FUFRSHCount);
      if (FUFRSHCount == 0) {
        createHTMLList('Formation UFRSH', listeFUFRSH, insertFUFRSH, FUFRSHCount);
      }
      FUFRSHCount += 1;
    }

    if (categoryName ==  'Formation UFRSS') {
      addCategoryOverlay(FUFRSSLink, 'Formation UFRSS', FUFRSSLinkState, 'marker', FUFRSSURL, tailleMarker, FUFRSSCount);
      if (FUFRSSCount == 0) {
        createHTMLList('Formation UFRSS', listeFUFRSS, insertFUFRSS, FUFRSSCount);
      }
      FUFRSSCount += 1;
    }
    FUFRSSLink.onclick = function (e) {
      addCategoryOverlay(FUFRSSLink, 'Formation UFRSS', FUFRSSLinkState, 'marker', FUFRSSURL, tailleMarker, FUFRSSCount);
      if (FUFRSSCount == 0) {
        createHTMLList('Formation UFRSS', listeFUFRSS, insertFUFRSS, FUFRSSCount);
      }
      FUFRSSCount += 1;
    }

    if (categoryName ==  'Formation UFRSTAPS') {
      addCategoryOverlay(FUFRSTAPSLink, 'Formation UFRSTAPS', FUFRSTAPSLinkState, 'marker', FUFRSTAPSURL, tailleMarker, FUFRSTAPSCount);
      if (FUFRSTAPSCount == 0) {
        createHTMLList('Formation UFRSTAPS', listeFUFRSTAPS, insertFUFRSTAPS, FUFRSTAPSCount);
      }
      FUFRSTAPSCount += 1;
    }
    FUFRSTAPSLink.onclick = function (e) {
      addCategoryOverlay(FUFRSTAPSLink, 'Formation UFRSTAPS', FUFRSTAPSLinkState, 'marker', FUFRSTAPSURL, tailleMarker, FUFRSTAPSCount);
      if (FUFRSTAPSCount == 0) {
        createHTMLList('Formation UFRSTAPS', listeFUFRSTAPS, insertFUFRSTAPS, FUFRSTAPSCount);
      }
      FUFRSTAPSCount += 1;
    }

    if (categoryName ==  'Formation UFRALC') {
      addCategoryOverlay(FUFRALCLink, 'Formation UFRALC', FUFRALCLinkState, 'marker', FUFRALCURL, tailleMarker, FUFRALCCount);
      if (FUFRALCCount == 0) {
        createHTMLList('Formation UFRALC', listeFUFRALC, insertFUFRALC, FUFRALCCount);
      }
      FUFRALCCount += 1;
    }
    FUFRALCLink.onclick = function (e) {
      addCategoryOverlay(FUFRALCLink, 'Formation UFRALC', FUFRALCLinkState, 'marker', FUFRALCURL, tailleMarker, FUFRALCCount);
      if (FUFRALCCount == 0) {
        createHTMLList('Formation UFRALC', listeFUFRALC, insertFUFRALC, FUFRALCCount);
      }
      FUFRALCCount += 1;
    }

    if (categoryName ==  'Autres Formations') { 
      addCategoryOverlay(AutresFormationsLink, 'Autres Formations', AutresFormationsLinkState, 'marker', AutresFormationsURL, tailleMarker, AutresFormationsInfoPopup, AutresFormationsCount);
      if (AutresFormationsCount == 0) {
        createHTMLList('Autres Formations', AutresFormationsURL, insertAutresFormations, AutresFormationsCount);
      }
      AutresFormationsCount += 1;
    }
    AutresFormationsLink.onclick = function (e) {
      addCategoryOverlay(AutresFormationsLink, 'Autres Formations', AutresFormationsLinkState, 'marker', AutresFormationsURL, tailleMarker, AutresFormationsCount);
      if (AutresFormationsCount == 0) {
        createHTMLList('Autres Formations', listeAutresFormations, insertAutresFormations, AutresFormationsCount);
      }
      AutresFormationsCount += 1;
    }


    if (categoryName ==  'Recherche UFRL') {
      addCategoryOverlay(RUFRLLink, 'Recherche UFRL', RUFRLLinkState, 'marker', RUFRLURL, tailleMarker, RUFRLInfoPopup, RUFRLCount);
      if (RUFRLCount == 0) {
        createHTMLList('Recherche UFRL', listeRUFRL, insertRUFRL, RUFRLCount);
      }
      RUFRLCount += 1;
    }
    RUFRLLink.onclick = function (e) {
      addCategoryOverlay(RUFRLLink, 'Recherche UFRL', RUFRLLinkState, 'marker', RUFRLURL, tailleMarker, RUFRLCount);
      if (RUFRLCount == 0) {
        createHTMLList('Recherche UFRL', listeRUFRL, insertRUFRL, RUFRLCount);
      }
      RUFRLCount += 1;
    }
    
    if (categoryName ==  'Recherche UFRSH') {
      addCategoryOverlay(RUFRSHLink, 'Recherche UFRSH', RUFRSHLinkState, 'marker', RUFRSHURL, tailleMarker, RUFRSHCount);
      if (RUFRSHCount == 0) {
        createHTMLList('Recherche UFRSH', listeRUFRSH, insertRUFRSH, RUFRSHCount);
      }
      RUFRSHCount += 1;
    }
    RUFRSHLink.onclick = function (e) {
      addCategoryOverlay(RUFRSHLink, 'Recherche UFRSH', RUFRSHLinkState, 'marker', RUFRSHURL, tailleMarker, RUFRSHCount);
      if (RUFRSHCount == 0) {
        createHTMLList('Recherche UFRSH', listeRUFRSH, insertRUFRSH, RUFRSHCount);
      }
      RUFRSHCount += 1;
    }
    if (categoryName ==  'Recherche UFRSS') {
      addCategoryOverlay(RUFRSSLink, 'Recherche UFRSS', RUFRSSLinkState, 'marker', RUFRSSURL, tailleMarker, RUFRSSCount);
      if (RUFRSSCount == 0) {
        createHTMLList('Recherche UFRSS', listeRUFRSS, insertRUFRSS, RUFRSSCount);
      }
      RUFRSSCount += 1;
    }
    RUFRSSLink.onclick = function (e) {
      addCategoryOverlay(RUFRSSLink, 'Recherche UFRSS', RUFRSSLinkState, 'marker', RUFRSSURL, tailleMarker, RUFRSSCount);
      if (RUFRSSCount == 0) {
        createHTMLList('Recherche UFRSS', listeRUFRSS, insertRUFRSS, RUFRSSCount);
      }
      RUFRSSCount += 1;
    }
    if (categoryName ==  'Recherche UFRSTAPS') {
      addCategoryOverlay(RUFRSTAPSLink, 'Recherche UFRSTAPS', RUFRSTAPSLinkState, 'marker', RUFRSTAPSURL, tailleMarker, RUFRSTAPSCount);
      if (RUFRSTAPSCount == 0) {
        createHTMLList('Recherche UFRSTAPS', listeRUFRSTAPS, insertRUFRSTAPS, RUFRSTAPSCount);
      }
      RUFRSTAPSCount += 1;
    }
    RUFRSTAPSLink.onclick = function (e) {
      addCategoryOverlay(RUFRSTAPSLink, 'Recherche UFRSTAPS', RUFRSTAPSLinkState, 'marker', RUFRSTAPSURL, tailleMarker, RUFRSTAPSCount);
      if (RUFRSTAPSCount == 0) {
        createHTMLList('Recherche UFRSTAPS', listeRUFRSTAPS, insertRUFRSTAPS, RUFRSTAPSCount);
      }
      RUFRSTAPSCount += 1;
    }
    if (categoryName ==  'Recherche UFRALC') {
      addCategoryOverlay(RUFRALCLink, 'Recherche UFRALC', RUFRALCLinkState, 'marker', RUFRALCURL, tailleMarker, RUFRALCCount);
      if (RUFRALCCount == 0) {
        createHTMLList('Recherche UFRALC', listeRUFRALC, insertRUFRALC, RUFRALCCount);
      }
      RUFRALCCount += 1;
    }
    RUFRALCLink.onclick = function (e) {
      addCategoryOverlay(RUFRALCLink, 'Recherche UFRALC', RUFRALCLinkState, 'marker', RUFRALCURL, tailleMarker, RUFRALCCount);
      if (RUFRALCCount == 0) {
        createHTMLList('Recherche UFRALC', listeRUFRALC, insertRUFRALC, RUFRALCCount);
      }
      RUFRALCCount += 1;
    }


  //////////////////////////////////  Bibliothèques et culture //////////////////////////////////////
  if (categoryName ==  'Lieux culturels') {
    addCategoryOverlay(lieuCulturelLink, 'Lieux culturels', 'list', 'marker', lieuCulturelURL, tailleMarker, lieuCulturelCount);
    if (lieuCulturelCount == 0) {
      createHTMLList('Lieux culturels', listelieuCulturel, insertLieuCulturel, lieuCulturelCount);
    }
    lieuCulturelCount += 1;
  }
  lieuCulturelLink.onclick = function (e) {
    addCategoryOverlay(lieuCulturelLink, 'Lieux culturels', 'list', 'marker', lieuCulturelURL, tailleMarker, lieuCulturelCount);
    if (lieuCulturelCount == 0) {
      createHTMLList('Lieux culturels', listelieuCulturel, insertLieuCulturel, lieuCulturelCount);
    }
    lieuCulturelCount += 1;
  }

  if (categoryName ==  'Bibliothèques') {
    addCategoryOverlay(bibliothequesLink, 'Bibliothèques', 'layer', 'marker', bibliothequesURL, tailleMarker, bibliothequesCount);
    bibliothequesCount += 1;
  }
  bibliothequesLink.onclick = function (e) {
    addCategoryOverlay(bibliothequesLink, 'Bibliothèques', 'layer', 'marker', bibliothequesURL, tailleMarker, bibliothequesCount);
    bibliothequesCount += 1;
  }

  if (categoryName ==  'Oeuvre') {
    addCategoryOverlay(oeuvreArtsLink, 'Oeuvre', 'layer', 'marker', oeuvreArtsURL, tailleMarker, oeuvreArtsCount);
    oeuvreArtsCount += 1;
  }
  oeuvreArtsLink.onclick = function (e) {
    addCategoryOverlay(oeuvreArtsLink, 'Oeuvre', 'layer', 'marker', oeuvreArtsURL, tailleMarker, oeuvreArtsCount);
    oeuvreArtsCount += 1;
  }

  ////////////////////////////////// Restauration et logement //////////////////////////////////////
  if (categoryName ==  'Résidence Universitaire') {
    addCategoryOverlay(resUnivLink, 'Résidence Universitaire', 'layer', 'marker', resUnivURL, tailleMarker, resUnivCount);
    resUnivCount += 1;
  }
  resUnivLink.onclick = function (e) {
    addCategoryOverlay(resUnivLink, 'Résidence Universitaire', 'layer', 'marker', resUnivURL, tailleMarker, resUnivCount);
    resUnivCount += 1;
  }

  if (categoryName ==  'Restaurant Universitaire') {
    addCategoryOverlay(restoUnivLink, 'Restaurant Universitaire', 'layer', 'marker', restoUnivURL, tailleMarker, restoUnivCount);
    restoUnivCount += 1;
  }
  restoUnivLink.onclick = function (e) {
    addCategoryOverlay(restoUnivLink, 'Restaurant Universitaire', 'layer', 'marker', restoUnivURL, tailleMarker, restoUnivCount);
    restoUnivCount += 1;
  }

  if (categoryName ==  'Cafétéria') {
    addCategoryOverlay(cafeteriasLink, 'Cafétéria', 'layer', 'marker', cafeteriasURL, taillePetitMarker, cafeteriasCount);
    cafeteriasCount += 1;
  }
  cafeteriasLink.onclick = function (e) {
    addCategoryOverlay(cafeteriasLink, 'Cafétéria', 'layer', 'marker', cafeteriasURL, taillePetitMarker, cafeteriasCount);
    cafeteriasCount += 1;
  }



  //////////////////////////////////  Sport et santé //////////////////////////////////////

  if (categoryName ==  'Pôle santé et prévention') {
    addCategoryOverlay(polesanteLink, 'Pôle santé et prévention', 'layer', 'marker', polesanteURL, tailleMarker, polesanteCount);
    polesanteCount += 1;
  }
  polesanteLink.onclick = function (e) {
    addCategoryOverlay(polesanteLink, 'Pôle santé et prévention', 'layer', 'marker', polesanteURL, tailleMarker, polesanteCount);
    polesanteCount += 1;
  }

  if (categoryName ==  'Assistants de prévention') {
    addCategoryOverlay(assistantpreventionLink, 'Assistants de prévention', 'layer', 'marker', assistantpreventionURL, tailleMarker, assistantpreventionCount);
    assistantpreventionCount += 1;
  }
  assistantpreventionLink.onclick = function (e) {
    addCategoryOverlay(assistantpreventionLink, 'Assistants de prévention', 'layer', 'marker', assistantpreventionURL, tailleMarker, assistantpreventionCount);
    assistantpreventionCount += 1;
  }
  // if (categoryName ==  'Ressources humaines') {
  //   addCategoryOverlay(rhsanteLink, 'Ressources humaines', 'layer', 'marker', rhsanteURL, tailleMarker, rhCount);
  //   rhsanteCount += 1;
  // }
  // rhsanteLink.onclick = function (e) {
  //   addCategoryOverlay(rhsanteLink, 'Ressources humaines', 'layer', 'marker', rhsanteURL, tailleMarker, rhsanteCount);
  //   rhsanteCount += 1;
  // }

  //////////////////////////////////  Vie associative ///////////////////////////////////////

  if (categoryName ==  'Associations de filières') {
    addCategoryOverlay(associationsfilieresLink, 'Associations de filières', 'layer', 'marker', associationsfilieresURL, taillePetitMarker, associationsfilieresCount);
    associationsfilieresCount += 1;
  }
  associationsfilieresLink.onclick = function (e) {
    addCategoryOverlay(associationsfilieresLink, 'Associations de filières', 'layer', 'marker', associationsfilieresURL, taillePetitMarker, associationsfilieresCount);
    associationsfilieresCount += 1;
  }

  if (categoryName ==  'Associations de Masters et Doctorats') {
    addCategoryOverlay(associationsmasterLink, 'Associations de Masters et Doctorats', 'layer', 'marker', associationsmasterURL, taillePetitMarker, associationsmasterCount);
    associationsmasterCount += 1;
  }
  associationsmasterLink.onclick = function (e) {
    addCategoryOverlay(associationsmasterLink, 'Associations de Masters et Doctorats', 'layer', 'marker', associationsmasterURL, taillePetitMarker, associationsmasterCount);
    associationsmasterCount += 1;
  }
 
  if (categoryName ==  'Associations culturelles, artistiques et sportives') {
    addCategoryOverlay(associationscasLink, 'Associations culturelles, artistiques et sportives', 'layer', 'marker', associationscasURL, taillePetitMarker, associationscasCount);
    associationscasCount += 1;
  }
  associationscasLink.onclick = function (e) {
    addCategoryOverlay(associationscasLink, 'Associations culturelles, artistiques et sportives', 'layer', 'marker', associationscasURL, taillePetitMarker, associationscasCount);
    associationscasCount += 1;
  }

  if (categoryName ==  'Associations de solidarité et de sensibilisation') {
    addCategoryOverlay(associationssolidariteLink, 'Associations de solidarité et de sensibilisation', 'layer', 'marker', associationssolidariteURL, taillePetitMarker, associationssolidariteCount);
    associationssolidariteCount += 1;
  }
  associationssolidariteLink.onclick = function (e) {
    addCategoryOverlay(associationssolidariteLink, 'Associations de solidarité et de sensibilisation', 'layer', 'marker', associationssolidariteURL, taillePetitMarker, associationssolidariteCount);
    associationssolidariteCount += 1;
  }

  //////////////////////////////////  Mobilité et accessibilité ///////////////////////////////////////
  if (categoryName ==  'Ascenseur') {
    addCategoryOverlay(ascenseurLink, 'Ascenseur', 'layer', 'picto', ascenseurURL, tailleMarker, ascenseurCount);
    ascenseurCount += 1;
  }
  ascenseurLink.onclick = function (e) {
    addCategoryOverlay(ascenseurLink, 'Ascenseur', 'layer', 'picto', ascenseurURL, taillePicto, ascenseurCount);
    ascenseurCount += 1;
  }

  if (categoryName ==  'Parking') {
    addCategoryOverlay(parkingLink, 'Parking', 'layer', 'picto', parkingURL, tailleMarker, parkingCount);
    parkingCount += 1;
    addCategoryOverlay(parkingLink, 'Parking PMR', 'layer', 'picto', parkingPMRURL, taillePicto, parkingPMRCount);
    parkingPMRCount += 1;
  }
  parkingLink.onclick = function (e) {
    addCategoryOverlay(parkingLink, 'Parking', 'layer', 'picto', parkingURL, taillePicto, parkingCount);
    parkingCount += 1;
    addCategoryOverlay(parkingLink, 'Parking PMR', 'layer', 'picto', parkingPMRURL, taillePicto, parkingPMRCount);
    parkingPMRCount += 1;
  }

  if (categoryName ==  'Parking vélo') {
    addCategoryOverlay(parkingVeloLink, 'Parking vélo', 'layer', 'point', parkingVeloColor, parkingVeloIconSize, parkingVeloCount);
    parkingVeloCount += 1;
  }
  parkingVeloLink.onclick = function (e) {
    addCategoryOverlay(parkingVeloLink, 'Parking vélo', 'layer', 'point', parkingVeloColor, parkingVeloIconSize, parkingVeloCount);
    parkingVeloCount += 1;
  }

  if (categoryName ==  'Cheminements accessibles') {
    addCategoryOverlay(lineairePMRLink, 'Cheminements accessibles', 'layer', 'line', lineairePMRColor, tailleLine, lineairePMRCount);
    lineairePMRCount += 1;
  }
  lineairePMRLink.onclick = function (e) {
    addCategoryOverlay(lineairePMRLink, 'Cheminements accessibles', 'layer', 'line', lineairePMRColor, tailleLine, lineairePMRCount);
    lineairePMRCount += 1;
  }

  if (categoryName ==  'Entrée campus') {
    addCategoryOverlay(entree_campusLink, 'Entrée campus', 'layer', 'picto', entree_campusURL,  taillePicto, entree_campusCount);
    entree_campusCount += 1;
  }
  entree_campusLink.onclick = function (e) {
    addCategoryOverlay(entree_campusLink, 'Entrée campus', 'layer', 'picto', entree_campusURL, taillePicto, entree_campusCount);
    entree_campusCount += 1;
    }

  if (categoryName ==  'Entrée batiment') {
    addCategoryOverlay(entree_batimentLink, 'Entrée batiment', 'layer', 'picto', entree_batimentURL,  taillePicto, entree_batimentCount);
    entree_batimentCount += 1;
  }  
  entree_batimentLink.onclick = function (e) {
    addCategoryOverlay(entree_batimentLink, 'Entrée batiment', 'layer', 'picto', entree_batimentURL, taillePicto, entree_batimentCount);
    entree_batimentCount += 1;
    }

   if (categoryName ==  'Accès PMR') {
    addCategoryOverlay(accesPMRLink, 'Accès PMR', 'layer', 'point', accesPMRColor, accesPMRIconSize, accesPMRCount);
    accesPMRCount += 1;
  }
  accesPMRLink.onclick = function (e) {
    addCategoryOverlay(accesPMRLink, 'Accès PMR', 'layer', 'point', accesPMRColor, accesPMRIconSize, accesPMRCount);
    accesPMRCount += 1;
  }

  metroLink.onclick = function (e) {
    addCategoryOverlay(metroLink, 'Cheminements Métro', 'layer', 'line', lineaireMetroColor, lineaireMetroIconSize, lineaireMetroCount);
    lineaireMetroCount += 1;
    addCategoryOverlay(metroLink, 'Métro', 'layer', 'picto', metroURL, taillePicto, metroCount);
    metroCount += 1;
  }
  velostarLink.onclick = function (e) {
    addCategoryOverlay(velostarLink, 'Station Vélostar', 'layer', 'point', velostarColor, taillePoint, velostarCount);
    velostarCount += 1;
    addRealTimeVelostar();
    console.log(velostarCount)
  }
  busLineLink.onclick = function (e) {
    addCategoryOverlay(busLineLink, 'Cheminements Bus', 'layer', 'line', busLineColor, tailleLine, busLineCount);
    busLineCount += 1;
    addCategoryOverlay(busLineLink, 'Bus', 'layer', 'picto', busURL, taillePicto, busCount);
    busCount += 1;
    addRealTimeBus();
  }

}) 
  };
// }


// Lorsque la page est chargée, récupérez le nom de la catégorie dans l'URL et activez la case à cocher correspondante
document.addEventListener('DOMContentLoaded', function() {
  const categoryName = getCategoryFromURL();
  if (categoryName) {
    activateCategory(categoryName);
  }
});

/////////////////////////////////// fin code pour changer de catégories /////////////////////////////

////////////////////////////////// URL pour les OBJETS  /////////////////////////////
// //// via le bouton de recherche //// 
// // Sélectionner le bouton de recherche
const searchButton = document.querySelector('#searchButton');

 
// Ajouter un gestionnaire d'événements au bouton de recherche
searchButton.addEventListener('click', function() {
  // Récupérer la valeur de la recherche à partir du champ de saisie
  const campusButton = document.querySelector('#campus .btn-primary.active');
let activeButtonName = '';
campusButtons.forEach(function(button) {
  if (button.classList.contains('active')) {
    activeButtonName = button.textContent.trim();
  }
});
  const selectedCampus = activeButtonName
  const selectedCategory = getCategoryFromURL();
  const selectedObjet = document.querySelector('#search-bar').value.trim();
  // Vérifier si la valeur de la recherche n'est pas vide
  if (selectedObjet !== '') {
    // Créer un lien et mettre à jour l'URL en fonction de la valeur de la recherche
    createLinkAndUpdateURL(selectedCampus, selectedCategory,selectedObjet);
  }
});

////////////// URL vers page //////////////////////

  /**
   * Fonction pour obtenir le nom de l'objet à partir de l'URL
   * @returns {string} Nom de l'objet
   */
  function getObjetFromURL() {
    const urlParams = new URLSearchParams(window.location.search); // Récupérer les paramètres de l'URL
    console.log(urlParams.get('objet'));
    return urlParams.get('objet'); // Récupérer la valeur du paramètre de l'objet
  }

  // document.addEventListener('click', function() {
  //   console.log('objet:', getObjetFromURL());
  // });

  /**
 * Fonction pour afficher la popup correspondant à un objet et effectuer un zoom sur la popup
 * @param {*} objetName 
 */
// avec le nouvel appel des données 
function afficherPopupObjet(selectedObjet) {
  //Définition des variables avant le fonction promise
  var fproperties = [];
  var POI = [];
  var searchBarCrossPresence = null;
  var searchValue = null;
  var searchLayerId = 'SearchResult';
  var searchLayerCount = 0;
  var searchPopup = null;
  var searchItem = [];
  var searchX = null;
  var searchY = null;
  
  
  // nouvel appel grâce à la fonction d'AP
  const getGeoJSON = (nomFichier) => fetch(nomFichier).then(res => res.json()).then(res => res.features);
  
  const geojsons = [
  getGeoJSON("../data/filtre/acces_PMR.geojson"),
  getGeoJSON("../data/filtre/amphi.geojson"),
  getGeoJSON("../data/filtre/arret_bus_pts.geojson"),
  getGeoJSON("../data/filtre/arret_metro_pts.geojson"),
  getGeoJSON("../data/filtre/ascenseur.geojson"),
  getGeoJSON("../data/filtre/asso_art_spor.geojson"),
  getGeoJSON("../data/filtre/asso_filiere.geojson"),
  getGeoJSON("../data/filtre/asso_mstr_doc.geojson"),
  getGeoJSON("../data/filtre/asso_solidarite.geojson"),
  getGeoJSON("../data/filtre/biblio.geojson"),
  getGeoJSON("../data/filtre/cafet_distrib.geojson"),
  getGeoJSON("../data/filtre/copieur.geojson"),
  getGeoJSON("../data/filtre/entree_bat.geojson"), 
  getGeoJSON("../data/filtre/entree_campus.geojson"),
  getGeoJSON("../data/filtre/eqpmt_sportif.geojson"),
  getGeoJSON("../data/filtre/esp_detente.geojson"),
  getGeoJSON("../data/filtre/labo.geojson"),
  getGeoJSON("../data/filtre/lieu_cultu.geojson"),
  getGeoJSON("../data/filtre/micro_ondes.geojson"),
  getGeoJSON("../data/filtre/oeuvres.geojson"),
  getGeoJSON("../data/filtre/parking_velo.geojson"),
  getGeoJSON("../data/filtre/parking_voiture.geojson"),
  getGeoJSON("../data/filtre/resid_univ.geojson"),
  getGeoJSON("../data/filtre/ru.geojson"),
  getGeoJSON("../data/filtre/salle_e0.geojson"),
  getGeoJSON("../data/filtre/salle_e1.geojson"),
  getGeoJSON("../data/filtre/salle_e2.geojson"),
  getGeoJSON("../data/filtre/salle_e3.geojson"),
  getGeoJSON("../data/filtre/salle_e4.geojson"),
  getGeoJSON("../data/filtre/salle_e5.geojson"),
  getGeoJSON("../data/filtre/salle_e6.geojson"),
  getGeoJSON("../data/filtre/salle_e7.geojson"),
  getGeoJSON("../data/filtre/salle_info.geojson"),
  getGeoJSON("../data/filtre/salle_spe.geojson"),
  getGeoJSON("../data/filtre/sante.geojson"),
  getGeoJSON("../data/filtre/scol.geojson"),
  getGeoJSON("../data/filtre/services.geojson"),
  getGeoJSON("../data/filtre/station_velostar.geojson"),
  getGeoJSON("../data/filtre/wc.geojson"),
  getGeoJSON("../data/fondcarte/lettre_batiment.geojson")
  ];
  
  const finalGeoJSON = {
  "type": "FeatureCollection",
  "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}}, //système de coordonnées
  "features": []
  };  
  
  Promise.all(geojsons).then(allGeoJsons => { //à l'intérieur de cette fonction se passe le regroupement des geojsons
  
  allGeoJsons.forEach(oneGeoJSON => {
      finalGeoJSON.features.concat(oneGeoJSON.features);
      
    });

  //Appeler la fonction qui gère les données fusionnées
    finalGeoJSON.features = allGeoJsons // recup de l'objet avec ts les geojsons
   var mergedFeatures = finalGeoJSON.features.reduce((acc, val) => acc.concat(val), []);
    finalGeoJSON.features = mergedFeatures // transformation de l'objet pour correspondre à l'ancien fichier points.geojson
    
    POIBrut = finalGeoJSON // affectation de cette objet dans l'objet appelé par les couches dans le reste du code
    
    POI = POIBrut.features;
      
  
  fproperties = finalGeoJSON.features.map(function (el) {
    return el.properties;})
    
      // Récupérer les caractéristiques de l'objet à partir des données POIBrut
      var features = POIBrut.features.filter(feature => feature.properties.Nom === selectedObjet);
  
    console.log("Caractéristiques trouvées pour l'objet:", features);
    console.log('poibrut 1',POIBrut)
  
    // var features = POIBrut.features.filter(feature => feature.properties.Nom === objetName);  
    
    // Vérifier si des caractéristiques ont été trouvées pour l'objet
    if (features.length > 0) {
      console.log("ca fonctionne presque");
      var feature = features[0]; // Prendre la première caractéristique trouvée
      console.log("feature", feature);
      getPopupContent(feature); // Récupérer le contenu de la popup


      // var coordinates = feature.geometry.coordinates[0];
      var coordinates = feature.geometry.coordinates[0]; 
      //  popup.setLngLat(coordinates);

      
// console.log(coordinates);
// popup.setLngLat(feature.geometry.coordinates);

      // var coordinates = feature.geometry.coordinates; // Coordonnées de l'objet
      console.log("coordinates", coordinates);



    // Créez une nouvelle instance de Popup si elle n'est pas déjà définie
    if (!popup) {
      popup = new maplibregl.Popup({
          offset: [0, -40], // Offset de la popup
          closeButton: false // Bouton de fermeture de la popup
      });
  }

  // Définir les coordonnées de la popup
  popup.setLngLat(coordinates);



      // Afficher la popup
      popup = new maplibregl.Popup({
        offset: [0, -40], // Offset de la popup
        closeButton: false // Bouton de fermeture de la popup
      })
      .setLngLat(coordinates) // Définir les coordonnées de la popup
      .setHTML('<h1>' + popupTitle + '</h1>' + popupContent) // Contenu HTML de la popup
      .addTo(map); // Ajouter la popup à la carte
  
      // Définir les limites de la carte en fonction du campus
      if (feature.properties.Campus === 'Mazier') {
        map.setMaxBounds(mazierBounds); // Définir les limites de la carte pour le campus de Mazier  
      } else {
        map.setMaxBounds(rennesBounds); // Définir les limites de la carte pour les autres campus
      }
  
      // Obtenir les dimensions de la carte
      var width = map.getCanvas().clientWidth;
      var height = map.getCanvas().clientHeight;
  
      // Convertir les coordonnées en pixels
      var point = map.project(coordinates);
  
      // Effectuer un zoom sur la popup
      map.flyTo({
        center: map.unproject([point.x, point.y]), // Coordonnées du centre de la carte (non-décalé)
        zoom: 15.75, // Niveau de zoom souhaité
        essential: false // Cette animation est essentielle, elle ne peut pas être désactivée par l'utilisateur
      });
  
      // Ajouter une épingle à la carte pour l'objet
      addPointOverlay(selectedObjet, [1, 13, 0.1, 25, 1.5]); // ajuste les paramètres de taille de l'icône
  
    } else {
      console.log("Aucune caractéristique trouvée pour l'objet:", selectedObjet);
    }
  });
  }

   // Lorsque la page se charge, récupérez le nom de l'objet dans l'URL et affichez la popup correspondante
   document.addEventListener('DOMContentLoaded', function() {
    const selectedObjet = getObjetFromURL();
    if (selectedObjet) {
      afficherPopupObjet(selectedObjet);
    }
  });
  ///////////////////////////////////////  Initialisation du fond de carte //////////////////////////////////

  // Adapter le zoom, et la largeur / placement des raccourcis spatiaux en fonction de l'écran
  var device = null;
  var largeurEcran = screen.width
  var zoomBase = 15.8;
  var BoutonsD = document.getElementById("DDD")
  var BoutonP = document.getElementById("print")

  //création du bouton 2D
  var Bouton2D = document.createElement('button'); 
  Bouton2D.setAttribute("class", "btn btn-primary");
  Bouton2D.classList.add("active"); //par défaut bouton2D actif
  Bouton2D.setAttribute("id", "DDButton");
  Bouton2D.innerHTML = '2D';

  //création du bouton 3D
  var Bouton3D = document.createElement('button'); 
  Bouton3D.setAttribute("class", "btn btn-primary");
  Bouton3D.setAttribute("id", "DDDButton");
  Bouton3D.innerHTML = '3D';

  //configuration page selon dimension de la fenetre du navigateur selon le device utilisé (téléphone ou autre)
  if (largeurEcran < 500) {
    device = 'phone';
    document.getElementById('map').style.height = '80vh'; //la carte
    zoomBase = 14.8; //le zoom
    //emplacement boutons 2D/3D :
    BoutonsD.style.position = 'absolute';
    BoutonsD.style.height = '50px';
    BoutonsD.style.width = '100px';
    BoutonsD.style.top = '95%';
    BoutonsD.style.left = '50%';
    BoutonsD.style.marginTop = '-25px';
    BoutonsD.style.marginLeft = '-50px';
    BoutonsD.appendChild(Bouton2D);
    BoutonsD.appendChild(Bouton3D);
  } else {
    BoutonsD.appendChild(Bouton2D);
    BoutonsD.appendChild(Bouton3D);
  }
  if (largeurEcran > 1000) {
    //emplacement onglets géographiques :
    document.getElementById('campus').style.width = '40%';
    document.getElementById('Villejean').style.width = '33%';
    document.getElementById('LaHarpe').style.width = '33%';
    document.getElementById('Mazier').style.width = '33%';
    document.getElementById('campus').style.marginLeft = '-20%';
  }

  //Limites de vue en fonction du campus visité
  //pour les campus villejean / La Harpe - boundingbox englobant Rennes+ :
  var rennesBounds = [
    [-1.787293, 48.067191], // Southwest coordinates
    [-1.525772, 48.169255]  // Northeast coordinates
  ];
  //Mazier - boundingbox englobant Saint-Brieuc+ ::
  var mazierBounds = [
    [-2.810090, 48.488519],
    [-2.668165, 48.534886]
  ];
  
  // Appel du fond de carte
  var map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://api.maptiler.com/maps/positron/style.json?key='+mapToken, // stylesheet location + token déclaré dans token.js
    
    center: [-1.7015402487767233, 48.11941846173602], // starting position [lng, lat]
    zoom: zoomBase,
    minZoom: 13, // zoom minimal
    pitch: 0, // inclinaison de base
    maxBounds: rennesBounds,
    attributionControl: false, // starting zoom
    preserveDrawingBuffer : true //permet d'imprimer la carte (sur firefox)
  });

  
  map.dragRotate.disable(); // vue 2D de base
  if (device == 'phone') {
    map.getCanvas().style.height = '100vh';
  } else {
    map.getCanvas().style.height = screen.height - 108 - 330;
  }

  ///////////////////////////////////////  initialisation des variables overlay //////////////////////////////////
  //var case1 = '../css/icons/case1.png'; // Lien vers l'image case non cochée
  //var case2 = '../css/icons/case2.png'; // Lien vers l'image case cochée

  // Taille overlay:
  var tailleMarker = [1, 13, 0.1, 25, 1.5]; // taille adaptative des éléments type marker /!\ NE PAS MODIFIER : pour toute modification de taille, changer la taille du .png
  //var taillePetitMarker = [1,13,0.05,25,1] // taille adaptative des éléments type marker /!\ NE PAS MODIFIER : pour toute modification de taille, changer la taille du .png
  //même taille pour tous les markers
  var taillePetitMarker = [1, 13, 0.1, 25, 1.5]; // taille adaptative des éléments type marker /!\ NE PAS MODIFIER : pour toute modification de taille, changer la taille du .png
  var tailleLine = [1.5, 13, 2, 22, 18]; // taille des éléments type ligne
  var taillePoint = [1.5, 13, 2, 22, 60]; // taille adaptative des éléments type point
  var taillePicto = [1.5, 13, 0.25, 22, 1.7]; // taille adaptative des éléments type pictogramme
  var Etiquette = []; // Liste des couches ayant des étiquettes (exemple amphithéâtres)
  var activeLayerBackground = '#EEEEEE'; // couleur du background des lignes

  /////////////// VARIABLES COUCHES ////////////////////

  // Couche amphithéâtres
  var amphiCount = 0; // initialisation du compteur
  var amphitheatresLink = document.getElementById('Amphithéâtre'); // Recherche de la balise html liée à la couche
  Etiquette.push('Amphithéâtre'); // Ajout des etiquettes
  var amphiURL = '../css/icons/layers_icons/amphi_marker.png';
  
  // Salles informatique
  var sallesInfoCount = 0;
  var sallesInfoLink = document.getElementById('Salle informatique');
  var sallesInfoURL = '../css/icons/layers_icons/salle_info_marker.png';
  
  // Salles spécifiques
  var sallesSpeCount = 0;
  var listeSallesSpecifiques = []; // Création dynamique de la liste des salles à partir du jeu de données
  var sallesSpecifiquesLink = document.getElementById('Salles spécifiques');
  var insertSallesSpecifiques = document.getElementById('insertSallesSpecifiques');
  var sallesSpeURL = '../css/icons/layers_icons/sallespe_marker.png';
  
  // Services centraux
  var ServicescenCount = 0;
  var listeServicescen = []; // Création dynamique de la liste des salles à partir du jeu de données
  var ServicescenLink = document.getElementById('Services centraux');
  var insertServicescen = document.getElementById('insertServicescen');
  var ServicescenURL = '../css/icons/layers_icons/servicescen_marker.png';
  
  // Services communs
  var ServicescomCount = 0;
  var listeServicescom = []; // Création dynamique de la liste des salles à partir du jeu de données
  var ServicescomLink = document.getElementById('Services communs');
  var insertServicescom = document.getElementById('insertServicescom');
  var ServicescomURL = '../css/icons/layers_icons/servicescom_marker.png';
  
  // Services généraux
  var ServicesgenCount = 0;
  var listeServicesgen = []; // Création dynamique de la liste des salles à partir du jeu de données
  var ServicesgenLink = document.getElementById('Services généraux');
  var insertServicesgen = document.getElementById('insertServicesgen');
  var ServicesgenURL = '../css/icons/layers_icons/servicesgen_marker.png';
  
  //formations
  // Formation UFR Sciences Humaines
  var FUFRSHCount = 0;
  var listeFUFRSH = [];
  var FUFRSHLink = document.getElementById('Formation UFRSH');
  var insertFUFRSH = document.getElementById('insertFUFRSH');
  var FUFRSHURL = '../css/icons/layers_icons/formation_marker.png';
  // Formation UFR Langue
  var FUFRLCount = 0;
  var listeFUFRL = [];
  var FUFRLLink = document.getElementById('Formation UFRL');
  var insertFUFRL = document.getElementById('insertFUFRL');
  var FUFRLURL = '../css/icons/layers_icons/formation_marker.png';
  // Formation UFR Sciences Sociales
  var FUFRSSCount = 0;
  var listeFUFRSS = [];
  var FUFRSSLink = document.getElementById('Formation UFRSS');
  var insertFUFRSS = document.getElementById('insertFUFRSS');
  var FUFRSSURL = '../css/icons/layers_icons/formation_marker.png';
  // Formation UFR STAPS
  var FUFRSTAPSCount = 0;
  var listeFUFRSTAPS = [];
  var FUFRSTAPSLink = document.getElementById('Formation UFRSTAPS');
  var insertFUFRSTAPS = document.getElementById('insertFUFRSTAPS');
  var FUFRSTAPSURL = '../css/icons/layers_icons/formation_marker.png';
  // Formation UFR ALC
  var FUFRALCCount = 0;
  var listeFUFRALC = [];
  var FUFRALCLink = document.getElementById('Formation UFRALC');
  var insertFUFRALC = document.getElementById('insertFUFRALC');
  var FUFRALCURL = '../css/icons/layers_icons/formation_marker.png';
  // Autres structures de Formation
  var AutresFormationsCount = 0;
  var listeAutresFormations = [];
  var AutresFormationsLink = document.getElementById('Autres Formations');
  var insertAutresFormations = document.getElementById('insertAutresFormations');
  var AutresFormationsURL = '../css/icons/layers_icons/formation_marker.png';

  // recherche
  // Recherche UFR Sciences Sociales
  var RUFRSSCount = 0;
  var listeRUFRSS = [];
  var RUFRSSLink = document.getElementById('Recherche UFRSS');
  var insertRUFRSS = document.getElementById('insertRUFRSS');
  var RUFRSSURL = '../css/icons/layers_icons/recherche_marker.png';
  // Recherche UFR STAPS
  var RUFRSTAPSCount = 0;
  var listeRUFRSTAPS = [];
  var RUFRSTAPSLink = document.getElementById('Recherche UFRSTAPS');
  var insertRUFRSTAPS = document.getElementById('insertRUFRSTAPS');
  var RUFRSTAPSURL = '../css/icons/layers_icons/recherche_marker.png';
  // Recherche UFR ALC
  var RUFRALCCount = 0;
  var listeRUFRALC = [];
  var RUFRALCLink = document.getElementById('Recherche UFRALC');
  var insertRUFRALC = document.getElementById('insertRUFRALC');
  var RUFRALCURL = '../css/icons/layers_icons/recherche_marker.png';
  // Recherche UFR Langues
  var RUFRLCount = 0;
  var listeRUFRL = [];
  var RUFRLLink = document.getElementById('Recherche UFRL');
  var insertRUFRL = document.getElementById('insertRUFRL');
  var RUFRLURL = '../css/icons/layers_icons/recherche_marker.png';
  // Recherche UFR Sciences Humaines
  var RUFRSHCount = 0;
  var listeRUFRSH = [];
  var RUFRSHLink = document.getElementById('Recherche UFRSH');
  var insertRUFRSH = document.getElementById('insertRUFRSH');
  var RUFRSHURL = '../css/icons/layers_icons/recherche_marker.png';

  // Bibliothèques
  var bibliothequesCount = 0; // initialisation du compteur de clics
  var bibliothequesLink = document.getElementById("Bibliothèques");
  var bibliothequesURL = '../css/icons/layers_icons/biblio_marker.png';

  // Lieux culturels
  var lieuCulturelCount = 0; // initialisation du compteur de clics
  var lieuCulturelLink = document.getElementById('Lieux culturels');
  var listelieuCulturel = []; // Création dynamique de la liste des salles à partir du jeu de données
  var insertLieuCulturel = document.getElementById('insertLieuCulturel');
  var lieuCulturelURL = '../css/icons/layers_icons/culture_marker.png';

  // Oeuvres d'arts
  var oeuvreArtsCount = 0; // initialisation du compteur de clics
  var oeuvreArtsLink = document.getElementById('Oeuvre');
  var oeuvreArtsURL = '../css/icons/layers_icons/oeuvre_marker.png';

  // Equipements sportifs
  var equipementSportifCount = 0; // initialisation du compteur de clics
  var equipementSportifLink = document.getElementById('Equipement sportif');
  var equipementSportifURL = '../css/icons/layers_icons/sport_marker.png';

  // Toilettes
  var toilettesCount = 0; // initialisation du compteur de clics
  var toilettesLink = document.getElementById('wc');
  var toilettesURL = '../css/icons/layers_icons/wc_marker.png';

  // Copieurs
  var copieurCount = 0; // initialisation du compteur de clics
  var copieurLink = document.getElementById('Copieur');
  var copieursURL = '../css/icons/layers_icons/copieur_marker.png';

  // Espace détente
  var espaceDetenteCount = 0; // initialisation du compteur de clics
  var espaceDetenteLink = document.getElementById('Espace détente');
  var espaceDetenteURL = '../css/icons/layers_icons/espacedetente_marker.png';

  // Cafeterias
  var cafeteriasCount = 0; // initialisation du compteur de clics
  var cafeteriasLink = document.getElementById('Cafétéria');
  var cafeteriasURL = '../css/icons/layers_icons/cafeteria_marker.png';

  // Micro-ondes
  var microOndesCount = 0; // initialisation du compteur de clics
  var microOndesLink = document.getElementById('Micro-ondes');
  var microOndesURL = '../css/icons/layers_icons/microondes_marker.png';

  // Résidences universitaires
  var resUnivCount = 0; // initialisation du compteur de clics
  var resUnivLink = document.getElementById("Résidence Universitaire");
  var resUnivURL = '../css/icons/layers_icons/resuniv_marker.png';

  // Restaurants universitaires
  var restoUnivCount = 0; // initialisation du compteur de clics
  var restoUnivLink = document.getElementById("Restaurant Universitaire");
  var restoUnivURL = '../css/icons/layers_icons/restauu_marker.png';

  // Associations de filières
  var associationsfilieresCount = 0; // initialisation du compteur de clics
  var associationsfilieresLink = document.getElementById('Associations de filières');
  var associationsfilieresURL = '../css/icons/layers_icons/association_marker.png';

  // Associations de Masters et Doctorats
  var associationsmasterCount = 0; // initialisation du compteur de clics
  var associationsmasterLink = document.getElementById('Associations de Masters et Doctorats');
  var associationsmasterURL = '../css/icons/layers_icons/association_marker2.png';

  // // Associations briochines
  // var associationsbriochinesCount = 0; // initialisation du compteur de clics
  // var associationsbriochinesLink = document.getElementById('Associations briochines');
  // var associationsbriochinesURL = '../css/icons/layers_icons/association_marker3.png';

  // Associations culturelles, artistiques et sportives
  var associationscasCount = 0; // initialisation du compteur de clics
  var associationscasLink = document.getElementById('Associations culturelles, artistiques et sportives');
  var associationscasURL = '../css/icons/layers_icons/association_marker4.png';

  // Associations de solidarité et de sensibilisation
  var associationssolidariteCount = 0; // initialisation du compteur de clics
  var associationssolidariteLink = document.getElementById('Associations de solidarité et de sensibilisation');
  var associationssolidariteURL = '../css/icons/layers_icons/association_marker5.png';

  // // Associations autres
  // var associationsCount = 0; // initialisation du compteur de clics
  // var associationsLink = document.getElementById('Autres');
  // var associationsURL = '../css/icons/layers_icons/association_marker6.png';

  // Ascenseur
  var ascenseurCount = 0; // initialisation du compteur de clics
  var ascenseurLink = document.getElementById('Ascenseur');
  var ascenseurURL = '../css/icons/layers_icons/ascenseur.png';

  // Parking
  var parkingCount = 0; // initialisation du compteur de clics
  var parkingLink = document.getElementById('Parking');
  var parkingURL = '../css/icons/layers_icons/paking_picto.png';

  // Parking PMR
  var parkingPMRCount = 0; // initialisation du compteur de clics
  var parkingPMRURL = '../css/icons/layers_icons/parkingH_picto.png';

  // Parking vélo
  var parkingVeloCount = 0; // initialisation du compteur de clics
  var parkingVeloLink = document.getElementById("Parking vélo");
  var parkingVeloColor = 'purple';
  var parkingVeloIconSize = [1.5, 13, 2, 22, 60];

   // Entrée campus
   var entree_campusLink = document.getElementById('Entrée campus');
   var entree_campusCount = 0; // initialisation du compteur de clics
   var entree_campusURL = '../css/icons/layers_icons/entrée_campus_2.png';

   // Entrée batiment
   var entree_batimentLink = document.getElementById('Entrée batiment');
   var entree_batimentCount = 0; // initialisation du compteur de clics
   var entree_batimentURL = '../css/icons/layers_icons/entrée_campus_2.png';

  // Couche Pole santé et prévention

  var polesanteCount = 0; // initialisation du compteur de clics
  var polesanteLink = document.getElementById('Pôle santé et prévention');
  var polesanteURL = '../css/icons/layers_icons/sante_marker.png';

  // Couche Assistants de prévention
  var assistantpreventionCount = 0; // initialisation du compteur de clics
  var assistantpreventionLink = document.getElementById('Assistants de prévention');
  var assistantpreventionURL = '../css/icons/layers_icons/sante_marker.png';
  
  // Couche Assistants de prévention
  var rhsanteCount = 0; // initialisation du compteur de clics
  var rhsanteLink = document.getElementById('Ressources humaines');
  var rhsanteURL = '../css/icons/layers_icons/sante_marker.png';

  // Lineaire PMR
  var lineairePMRCount = 0; // initialisation du compteur de clics
  var lineairePMRLink = document.getElementById('Cheminements accessibles');
  var lineairePMRColor = '#2b2f37';
  var lineairePMRType = 'line';

  // Accès PMR
  var accesPMRLink = document.getElementById('Accès PMR');
  var accesPMRCount = 0; // initialisation du compteur de clics
  var accesPMRColor = '#2b2f37';
  var accesPMRIconSize = [1.5, 13, 2, 22, 60];

  // Lineaire Metro
  var lineaireMetroCount = 0; // initialisation du compteur de clics
  var metroLink = document.getElementById("Métro");
  var lineaireMetroColor = 'red';
  var lineaireMetroIconSize = [1.5, 13, 2, 22, 60];
  var lineaireMetroType = 'line';
  
  // Arrets metro
  var metroCount = 0; // initialisation du compteur de clics
  var metroColor = 'red';
  var metroIconSize = [1.5, 13, 4, 22, 80];
  var metroURL = '../css/icons/layers_icons/metro_picto.png';
  
  // Linéaire Bus
  var busLineCount = 0; // initialisation du compteur de clics
  var busLineLink = document.getElementById("Bus");
  var busLineColor = '#3893F5';

  // Arrets bus
  var busCount = 0; // initialisation du compteur de clics
  var busColor = 'green';
  var busIconSize = [1.5, 13, 4, 22, 80];
  var busURL = '../css/icons/layers_icons/bus_marker.png';
  
  // Vélostar
  var velostarCount = 0; // initialisation du compteur de clics
  var velostarLink = document.getElementById("Station Vélostar");
  var velostarColor = 'green';

  //// Récupération en continu de l'état des menus des couches suivantes :
  var ServicescenLinkState = null;
  setInterval(function () {
    ServicescenLinkState = ServicescenLink.nextElementSibling.className;
  }, 500); //refresh toutes les 500milis

  var ServicesgenLinkState = null;
  setInterval(function () {
    ServicesgenLinkState = ServicesgenLink.nextElementSibling.className;
  }, 500);

  var ServicescomLinkState = null;
  setInterval(function () {
    ServicescomLinkState = ServicescomLink.nextElementSibling.className;
  }, 500);

  var sallesSpeLinkState = null;
  setInterval(function () {
    sallesSpeLinkState = sallesSpecifiquesLink.nextElementSibling.className;
  }, 500);

  var FUFRLLinkState = null;
  setInterval(function () {
    FUFRLLinkState = FUFRLLink.nextElementSibling.className;
  }, 500);

  var FUFRALCLinkState = null;
  setInterval(function () {
    FUFRALCLinkState = FUFRALCLink.nextElementSibling.className;
  }, 500);

  var FUFRSHLinkState = null;
  setInterval(function () {
    FUFRSHLinkState = FUFRSHLink.nextElementSibling.className;
  }, 500);

  var FUFRSSLinkState = null;
  setInterval(function () {
    FUFRSSLinkState = FUFRSSLink.nextElementSibling.className;
  }, 500);

  var FUFRSTAPSLinkState = null;
  setInterval(function () {
    FUFRSTAPSLinkState = FUFRSTAPSLink.nextElementSibling.className;
  }, 500);

  var AutresFormationsLinkState = null;
  setInterval(function () {
    AutresFormationsLinkState = AutresFormationsLink.nextElementSibling.className;
  }, 500);

  var RUFRLLinkState = null;
  setInterval(function () {
    RUFRLLinkState = RUFRLLink.nextElementSibling.className;
  }, 500);

  var RUFRSHLinkState = null;
  setInterval(function () {
    RUFRSHLinkState = RUFRSHLink.nextElementSibling.className;
  }, 500);

  var RUFRSSLinkState = null;
  setInterval(function () {
    RUFRSSLinkState = RUFRSSLink.nextElementSibling.className;
  }, 500);

  var RUFRSTAPSLinkState = null;
  setInterval(function () {
    RUFRSTAPSLinkState = RUFRSTAPSLink.nextElementSibling.className;
  }, 500);

  var RUFRALCLinkState = null;
  setInterval(function () {
    RUFRALCLinkState = RUFRALCLink.nextElementSibling.className;
  }, 500);

  var listLayers = [ServicescomLink, ServicesgenLink, ServicescenLink, sallesSpecifiquesLink, FUFRLLink, FUFRSHLink, FUFRSSLink, FUFRSTAPSLink, FUFRALCLink, RUFRLLink, RUFRSHLink, RUFRSSLink, RUFRSTAPSLink, RUFRALCLink];

  ////////////// Autres variables
  var Layers = []; // Liste des couches
  var popup = null; // Variable popup
  var popupList = null; // Variable popup sur les listes d'enregistrements
  // Coordonnées de la salle sélectionnée
  var salleRX = null;
  var salleRY = null;
  var pictoCount = 0;

  //////////////////////////////////   Initialisation des fonctions //////////////////////////////////////

  //Variables nécessaires à la fonctionnalité de changement de vue (2D -> 3D)
  var DDD = false; // Vue de base en 2D
  var bati2DId = 'bati2DId'; // Identifiant de la couche de bati 2D
  var bati2DCount = 0; // Nombre de fois que la couche de bati 2D a été appelée (< nécessité de changer d'identifiant)
  var bati3DId = 'bati3dId';  // Identifiant de la couche de bati 3D
  var bati3DCount = 0; // Nombre de fois que la couche de bati 3D a été appelée
  var bati2DHId = 'bati2DHId'; // idem couche hover
  var bati3DHId = 'bati3dHId'; // idem couche hover
  var etiqBati2DId = 'etiqBati2DId'; // idem couche etiquette
  var etiqBati3DId = 'etiqBati3DId'; // idem couche etiquette
  var popupBati = new maplibregl.Popup({// Popup Hover Bati
    closeButton: false,
    closeOnClick: false
  });
  var popupContent = null;

////////// Fonction pour afficher le référentiel bati 3D //////////
  function getBati3D() {

    //vérifie si la vue est en 2D, si oui retire les vues 2D
    if (bati2DCount != 0) {
      map.removeLayer(bati2DId);
      map.removeLayer(bati2DHId);
      map.removeLayer(etiqBati2DId);
    };

    pictoCount += 1;
    bati3DCount += 1;
    bati3DId = 'bati3DId' + bati3DCount;
    bati3DHId = 'bati3DHId' + bati3DCount;
    etiqBati3DId = 'etiqBati3DId' + bati3DCount;
    
    //data batiments en 3D
    if(!map.getSource("bati3D")) {
      map.addSource("bati3D", {
        type: "geojson",
        data: "../data/bati/Bati_3D.geojson?v="+version
      });
    }

    map.addLayer({
      id: bati3DId,
      type: "fill-extrusion",
      source: "bati3D",
      paint: {
        'fill-extrusion-color': '#647BA1',
        'fill-extrusion-height': {
          'type': 'identity',
          'property': 'hauteur'
        },
        'fill-extrusion-base': {
          'type': 'identity',
          'property': 'hauteur_mi'},
        'fill-extrusion-opacity': 0.8
      }
    }, Layers[0]);


    map.addLayer({
      id: bati3DHId,
      type: "fill-extrusion",
      source: "bati3D",
      filter: ["==", "Nom", ""],
      paint: {
        'fill-extrusion-color': '#647BA1',
        'fill-extrusion-height': {
          'type': 'identity',
          'property': 'hauteur'
        },
        'fill-extrusion-base': {
          'type': 'identity',
          'property': 'hauteur_mi'},
        'fill-extrusion-opacity': 0.8
      }
    }, Layers[0]);


    map.on("click", bati3DId, function (e) {
      map.setFilter(bati3DHId, ["==", "Id", e.features[0].properties.Id]);
      var popupTitle = '';
      popupContent = '';
      if (Layers.length == 0) {
        if (e.features[0].properties.Nom != "null" && e.features[0].properties.Nom != null && e.features[0].properties.Nom != "") {
          popupTitle = e.features[0].properties.Nom;
        }
        if (e.features[0].properties.Photo != "null" && e.features[0].properties.Photo != null && e.features[0].properties.Photo != "") {
          popupContent += '<img src = \'' + e.features[0].properties.Photo + '?v='+version+'\'/>'
        }
        if (e.features[0].properties.Infos != "null" && e.features[0].properties.Infos != null && e.features[0].properties.Infos != "") {
          popupContent += '<p>' + e.features[0].properties.Infos + '<p>';
        }

        if (popupBati != null && popupBati != "null" && popupBati != "") {
          popupBati.remove();
        }
        ;
        if (e.features[0].properties.Nom != "null" && e.features[0].properties.Nom != null && e.features[0].properties.Nom != "") {
          if ((popup == null || popup.isOpen() == false) && (searchPopup == null || searchPopup.isOpen() === false) && (popupList == null || popupList.isOpen() === false)) {
            popupBati = new maplibregl.Popup({
              offset: [0, -45],
              closeButton: false,
              className: 'popup-bati'
            })
                    .setLngLat(e.lngLat)
                    .setHTML('<h1>' + popupTitle + '</h1>' + popupContent)
                    .addTo(map);
          }
        }
      }
    });

    //Reset la coloration du polygone batiment quand la souris quitte la couche
    map.on("click", bati3DHId, function () {
      map.setFilter(bati3DHId, ["==", "Id", ""]);
      popupBati.remove();
    });

    //ajout d'une couche 
    map.addLayer({
      id: etiqBati3DId,
      type: "symbol",
      source: {
        type: "geojson",
        data: POIBrut
      },
      filter: ['==', 'Categorie', 'Batiment'],
      layout: {
        "text-field": "{Etiquette}",
        "text-anchor": "center",
        "text-size": {'base': 1.3, 'stops': [[13, 2.5], [22, 60]]},
        "text-max-width": 8
      },
      minzoom: 14,
    });

    //ajout des pictos permanents
    addPictoFondDeCarte()
  }
  ;
  var popupContent = null;
////////// fin de la definition de la fonction getBati3D() //////////

////////// Fonction pour afficher le référentiel bati 2D //////////
  function getBati2D() {

    if (bati3DCount != 0) {
      map.removeLayer(bati3DId);
      map.removeLayer(bati3DHId);
      map.removeLayer(etiqBati3DId);
      //console.log('bati3DId');
    }
    ;
    pictoCount += 1;
    bati2DCount += 1;
    bati2DId = 'bati2DId' + bati2DCount;
    bati2DHId = 'bati2DHId' + bati2DCount;
    etiqBati2DId = 'etiqBati2DId' + bati2DCount;

    //ajout de couches
    if(!map.getSource("bati2D")) {
      map.addSource("bati2D", {
        type: "geojson",
        data: "../data/bati/Bati_2D.geojson?v="+version
      });
    }

    map.addLayer({
      id: bati2DId, // Identifiant de la couche
      type: "fill",
      source: "bati2D",
      paint: {
        'fill-color': '#647BA1',
        // 'fill-opacity': 0.8
      }
    }, Layers[0]);

    map.addLayer({
      id: bati2DHId,
      type: "fill",
      source: "bati2D",
      filter: ["==", "Id", ""],
      paint: {
        'fill-color': '#647BA1',
        // 'fill-opacity': 0.5
      }
    }, Layers[0]);

    //interactivité
    map.on("click", bati2DId, function (e) {
      map.setFilter(bati2DHId, ["==", "Id", e.features[0].properties.Id]);
      var popupTitle = '';
      popupContent = '';
      if (Layers.length == 0) {
        if (e.features[0].properties.Nom != "null"&& e.features[0].properties.Nom != null && e.features[0].properties.Nom != "") {
          popupTitle = e.features[0].properties.Nom;
          // console.log(popupTitle);
        }
        if (e.features[0].properties.Photo != "null" && e.features[0].properties.Photo != null && e.features[0].properties.Photo != "") {
          popupContent += '<img src = \'' + e.features[0].properties.Photo + '?v=' + version + '\'/>'
          // console.log(popupContent); // verification du lien de l'image
        }
        if (e.features[0].properties.Info != "null" && e.features[0].properties.Info != null && e.features[0].properties.Info != "") {
          popupContent += '<p>' + e.features[0].properties.Info + '<p>';
        }
        if (popupBati != null && popupBati != "null" && popupBati != "") {
          popupBati.remove();
        }
        ;
        if (e.features[0].properties.Nom != "null" && e.features[0].properties.Nom != null && e.features[0].properties.Nom != "") {
          if ((popup == null || popup.isOpen() == false) && (searchPopup == null || searchPopup.isOpen() === false) && (popupList == null || popupList.isOpen() === false)) {

            popupBati = new maplibregl.Popup({
              offset: [0, -45],
              closeButton: false,
              className: 'popup-bati'
            })
                    .setLngLat(e.lngLat)
                    .setHTML('<h1>' + popupTitle + '</h1>' + popupContent)
                    .addTo(map);
          }
        }
      }

    });

    //Reset la coloration du polygone batiment quand la souris quitte la couche.
    map.on("click", bati2DHId, function () {
      map.setFilter(bati2DHId, ["==", "Id", ""]);
      popupBati.remove();
    });

    //ajout d'une couche
    map.addLayer({
      id: etiqBati2DId,
      type: "symbol",
      source: {
        type: "geojson",
        data: POIBrut
      },
      filter: ['==', 'Categorie', 'Batiment'],
      layout: {
        "text-field": "{Etiquette}",
        "text-anchor": "center",
        "text-size": {'base': 1.3, 'stops': [[13, 2.5], [22, 60]]},
        "text-max-width": 8, 
        "text-font" : ["ubuntumono-bold-italic-webfont"] 


      },
      paint: {
        "text-color": "#000000", // Couleur du texte
        "text-opacity": 1, // Opacité du texte
      },
      
      minzoom: 14,
    });
    addPictoFondDeCarte()
  }
  ;
////////// fin de la definition de la fonction getBati2D() //////////

////////// Fonction pour zoomer sur l'item sélectionné dans la liste (barre de recherche) ////////// 
  function getSwitchPopup() {
    getPopupContent(salleRecherchee);
    popupList = new maplibregl.Popup({
      offset: [0, -45],
      closeButton: false
    })
            //.setLngLat(salleRecherchee.geometry.coordinates)
			.setLngLat(salleRX) //version Paul
            .setHTML('<h1>' + popupTitle + '</h1><div class="description">' + popupContent + '</div>')
            .addTo(map);
  }
  ;
////////// fin de la definition de la fonction getSwitchPopup() //////////


////////// Variable switchPOI //////////
  var switchPOI = function (value) {
    value = value.split("!").join("'");
    salleRecherchee = null;
    salleRX = null;
    salleRY = null;
    var htmlPOI = document.getElementById(value);

    // var htmlPOIParent = htmlPOI.parentNode;

    /* if (document.getElementById('fleche')) {
     var previousFleche =  document.getElementById('fleche');
     previousFleche.nextSibling.classList;remov('active');
     document.getElementById('fleche').remove();

     }

     var fleche = document.createElement('img');
     /*fleche.setAttribute('src', '../css/icons/fleche.png');
     fleche.setAttribute('id', 'fleche');
     fleche.style.width = '20px';
     fleche.style.position = 'absolute';
     htmlPOIParent.insertBefore(fleche, htmlPOI);*/

    if (document.getElementsByClassName('leaf active')) {
      var previousActiveLeaves = document.getElementsByClassName('leaf active');
      for (let i = 0; i < previousActiveLeaves.length; i++) {
        previousActiveLeaves[i].classList.remove('active');
      }
    }

  htmlPOI.classList.add('active');
    if (popup) {
      popup.remove();
    }
    if (popupList) {
      popupList.remove();
    }
    for (var i = 0; i < POI.length; i++) {

      if (POI[i].properties.Nom === value) {
        salleRecherchee = POI[i];
      }
    }
    salleRX = salleRecherchee.geometry.coordinates[0];
    salleRY = salleRecherchee.geometry.coordinates[1];
    if (salleRecherchee.properties.Campus === 'Mazier') {
      map.setMaxBounds(mazierBounds);
    } else {
      map.setMaxBounds(rennesBounds);
    }
    ;
    if (DDD) {
      map.jumpTo({
      	//center: [salleRX, salleRY],
        center: [salleRX[0], salleRX[1]], //version Paul
        zoom: 16.5,
        pitch: 45,
        speed: 0.6
      });
    } else {
      map.jumpTo({
        //center: [salleRX, salleRY],
        center: [salleRX[0], salleRX[1]], //version Paul
        zoom: 16.5,
        pitch: 0,
        speed: 0.6
      });
    }
    getSwitchPopup();
  }

////////// Fonction ajoutant une liste de picto de manière permanente sur le fond de carte ////////// 

function addPictoFondDeCarte() {
	
  // Charger les données GeoJSON des éléments remarquables
  fetch("../data/fondcarte/elements_remarquables/elements_remarquables.geojson?v=" + version)
    .then(response => response.json())
    .then(data => {
      data.features.forEach(feature => {
        const iconName = feature.properties.icon;
        const size = feature.properties.size;
        const iconImage = `../css/icons/iconfond/elements_remarquables/${iconName}.png`;

        //Picto permanent 2_P
        if (!map.hasImage(iconName)) {
          map.loadImage(iconImage).then(response => {
            const image = response.data;
            map.addImage(iconName, image);
          });
        }

        //Picto permanent Design_BU
          map.addLayer({
            "id": iconName + pictoCount,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [feature]
              }
           },
            "layout": {
              "visibility": 'visible',
              "icon-image": iconName,
              "icon-size": size,
              "icon-allow-overlap": true
            },
          minzoom: 15.5,
         });
        });
    });
  
  // Charger les données GeoJSON des lettres des bâtiments
  fetch("../data/fondcarte/lettre_batiment.geojson?v=" + version)
    .then(response => response.json())
    .then(data => {
      data.features.forEach(feature => {
        const iconName = feature.properties.icon;
        const iconImage = `../css/icons/iconfond/lettre_batiment/${iconName}.png`;

  

        //Picto permanent escalier_arc_en_ciel
        if (!map.hasImage(iconName)) {
          map.loadImage(iconImage).then(response => {
            const image = response.data;
            map.addImage(iconName, image);
          });
        }

        //Picto permanent Jardin
          map.addLayer({
            "id": iconName + pictoCount,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [feature]
              }
            },
            "layout": {
              "visibility": 'visible',
              "icon-image": iconName,
              "icon-allow-overlap": true
            },
          minzoom: 15.5,
         });
      });
    });

  // Picto permanent Caféteria
  map.loadImage("../css/icons/iconfond/cafe.png").then(response => {
    const image = response.data;
    if (!map.hasImage("cafe")) {
      map.addImage('cafe', image);
    }
    map.addLayer({
      "id": "cafeteria" + pictoCount,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": "../data/fondcarte/cafeteria.geojson?v="+version
      },
      "layout": {
        "visibility": 'visible',
        "icon-image": "cafe",
        "icon-size": 0.80
      },
      minzoom: 16.5,
    });
  });

  // Ajouter d'autres pictogrammes permanents de la même manière que ci-dessus pour les autres catégories (bibliothèque, restaurant universitaire, parking, etc.)
  // Picto permanent Bibliothèque
  map.loadImage("../css/icons/iconfond/biblio.png").then(response => {
    const image = response.data;
    if (!map.hasImage("biblio")) {
      map.addImage('biblio', image);
    }
    map.addLayer({
      "id": "biblio" + pictoCount,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": "../data/fondcarte/biblio.geojson?v="+version
      },
      "layout": {
        "visibility": 'visible',
        "icon-image": "biblio",
        "icon-size": 0.80
      },
      minzoom: 15.5,
    });
  });

  // Picto permanent Restaurant U
  map.loadImage("../css/icons/iconfond/resto.png").then(response => {
    const image = response.data;
    if (!map.hasImage("resto")) {
      map.addImage('resto', image);
    }
    map.addLayer({
      "id": "ru" + pictoCount,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": "../data/fondcarte/ru.geojson?v="+version
      },
      "layout": {
        "visibility": 'visible',
        "icon-image": "resto",
        "icon-size": 0.80
      },
      minzoom: 15.5,
    });
  });

  // Picto permanent Parking
  map.loadImage("../css/icons/iconfond/parking.png").then(response => {
    const image = response.data;
    if (!map.hasImage("parking")) {
      map.addImage('parking', image);
    }
    map.addLayer({
      "id": "parking" + pictoCount,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": "../data/fondcarte/parking.geojson?v="+version
      },
      "layout": {
        "visibility": 'visible',
        "icon-image": "parking",
        "icon-size": 0.50
      },
      minzoom: 15,
    });
  });

  // Picto permanent Metro
  map.loadImage("../css/icons/iconfond/metro.png").then(response => {
    const image = response.data;
    if (!map.hasImage("metro")) {
      map.addImage('metro', image);
    }
    map.addLayer({
      "id": "metro" + pictoCount,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": "../data/fondcarte/metro.geojson?v="+version
      },
      "layout": {
        "visibility": 'visible',
        "icon-image": "metro",
        "icon-size": 0.80
      },
      minzoom: 15,
    });
  });

  // Picto permanent Pôle Santé
  map.loadImage("../css/icons/iconfond/sante.png").then(response => {
    const image = response.data;
    if (!map.hasImage("sante")) {
      map.addImage('sante', image);
    }
    map.addLayer({
      "id": "polesante" + pictoCount,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": "../data/fondcarte/polesante.geojson?v="+version
      },
      "layout": {
        "visibility": 'visible',
        "icon-image": "sante",
        "icon-size": 0.80
      },
      minzoom: 17,
    });
  });

  // Picto permanent Piscine
  map.loadImage("../css/icons/iconfond/piscine.png").then(response => {
    const image = response.data;
    if (!map.hasImage("piscine")) {
      map.addImage('piscine', image);
    }
    map.addLayer({
      "id": "piscine" + pictoCount,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": "../data/fondcarte/piscine.geojson?v="+version
      },
      "layout": {
        "visibility": 'visible',
        "icon-image": "piscine",
        "icon-size": 1.00
      },
      minzoom: 15,
    });
  });

  // Picto permanent Bus
  map.loadImage("../css/icons/iconfond/bus.png").then(response => {
    const image = response.data;
    if (!map.hasImage("bus")) {
      map.addImage('bus', image);
    }
    map.addLayer({
      "id": "bus" + pictoCount,
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": "../data/fondcarte/bus.geojson?v="+version
      },
      "layout": {
        "visibility": 'visible',
        "icon-image": "bus",
        "icon-size": 0.60
      },
      minzoom: 16,
    });
  });
}


////////// fin de la definition de la fonction addPictoFondDecarte() //////////

////////// Fonction ajoutant un point (de type épingle) ////////// 
  function addPointOverlay(name, iconSize) {

    var iconURL = '../css/icons/layers_icons/recherche.png'
    var markerOffset = [-15, -20];
    if (iconSize.toString() === '1,13,0.1,25,1.5') {
      markerOffset = [-30, -50];
    } else if (iconSize.toString() === '1,13,0.05,25,1') {
      markerOffset = [-40, -50]
    }

    map.loadImage(iconURL).then(response => {
      const image = response.data;
      map.addImage(name + 'image', image);
      map.addLayer({
        "id": name,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": POIBrut
        },
        "filter": ['==', 'Nom', name],
        "layout": {
          "icon-image": name + 'image',
          "icon-size": {'base': iconSize[0], 'stops': [[iconSize[1], iconSize[2]], [iconSize[3], iconSize[4]]]},
          "icon-allow-overlap": true,
          "icon-offset": {stops: [
              [13, [0, markerOffset[0]]],
              [22, [0, markerOffset[1]]]
            ]}
        },

      });
    });

    Layers.push(name);
    var couche = name;
    var type = 'marker';
  }
////////// fin de la definition de la fonction addPictoFondDecarte() //////////

////////// Fonction ajoutant un point (de type épingle) ////////// 
  function addPointOverlay(name, iconSize) {

    var iconURL = '../css/icons/layers_icons/recherche.png'
    var markerOffset = [-15, -20]; // Décalage du picto
    if (iconSize.toString() === '1,13,0.1,25,1.5') {
      markerOffset = [-30, -50];
    } else if (iconSize.toString() === '1,13,0.05,25,1') {
      markerOffset = [-40, -50]
    }

    map.loadImage(iconURL).then(response => {
      const image = response.data;
      map.addImage(name + 'image', image);
      map.addLayer({
        "id": name,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": POIBrut
        },
        "filter": ['==', 'Nom', name],
        "layout": {
          "icon-image": name + 'image',
          "icon-size": {'base': iconSize[0], 'stops': [[iconSize[1], iconSize[2]], [iconSize[3], iconSize[4]]]},
          "icon-allow-overlap": true,
          "icon-offset": {stops: [
              [13, [0, markerOffset[0]]],
              [22, [0, markerOffset[1]]]
            ]}
        },

      });
    });

    // possibilité de clicker sur le pins pour réaficher la popup 
    map.on('click', name, function(e) {
      // Open the associated popup
      popup.addTo(map);
    });

    Layers.push(name);
    var couche = name;
    var type = 'marker';


  }

  
////////// fin de la définition de la fonction addPointOverlay() //////////

////////// Fonction ajoutant des couches géographiques de superpositions selon un filtre 'Categorie' ////////// 
  function addCategoryOverlay(htmllink, nomDeLaCouche, ordre, type, colorOrUrl, iconSize, overlayCount, minZoom, maxZoom) {

    ////////// AJOUT DES DONNEES TYPE LINEAIRE ////////////
    if (type == 'line') {

      //Si aucune couche n'est déjà sélectionnée
      if (overlayCount === 0) {

        map.addLayer({
          id: nomDeLaCouche,
          type: "line",
          source: {
            type: "geojson",
            data: lines
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          filter: ['==', 'Categorie', nomDeLaCouche],
          paint: {
            "line-color": colorOrUrl,
            "line-width": {'base': iconSize[0], 'stops': [[iconSize[1], iconSize[2]], [iconSize[3], iconSize[4]]]}
          }
        });

        Layers.push(nomDeLaCouche); //ajoute la couche dans un tableau "Layers"
        
        // ici on parcourt les noeuds enfants HTML passé en paramètres htmllink 
        for (var i = 0; i < htmllink.childNodes.length; i++) {
          if (htmllink.childNodes[i].className === "case") { //on choisit ceux en classe 'case'
            htmllink.childNodes[i].classList.add('active'); //on les marque comme actifs
            break;
          }
        }

        //htmllink.style.backgroundColor = activeLayerBackground;
        htmllink.classList.add('active'); // on marque comme actif le paramètre htmllink aussi
      
      //Si des couches sont déjà sélectionnées :
      } else {
        var visibility = map.getLayoutProperty(nomDeLaCouche, 'visibility');

        if (visibility === 'visible') { //Si la couche en question est déjà sélectionnée...
          //...désactive la couche :
          for (var i = 0; i < htmllink.childNodes.length; i++) {
            if (htmllink.childNodes[i].className === "case active") { 
              htmllink.childNodes[i].classList.remove('active'); //alors retire le paramètre 'active' des noeuds enfants
              ;
              break;
            }
          }
          
          htmllink.classList.remove('active'); //retire le paramètre 'active' de l'htmllink
          map.setLayoutProperty(nomDeLaCouche, 'visibility', 'none'); //passe le paramètre de la couche en visibility 'none'
          Layers = Layers.filter(item => item != nomDeLaCouche); //supprime le nom de la couche du tableau Layers

          //...et désactive les étiquettes :
          if (etiquette) {
            map.setLayoutProperty(nomDeLaCoucheEtiquette, 'visibility', 'none'); //passe le paramètre de l'étiquette en visibility 'none'
            Layers = Layers.filter(item => item != nomDeLaCoucheEtiquette); //supprime le nom des étiquettes du tableau Layers
          }

        } else { //Si la couche en question n'est pas déjà sélectionnée
          map.setLayoutProperty(nomDeLaCouche, 'visibility', 'visible'); //alors l'active
          Layers.push(nomDeLaCouche); //et l'ajoute à la liste Layers
          
          //et passe les paramètres des noeuds enfants html et de l'hmtllink en statut 'active'
          for (var i = 0; i < htmllink.childNodes.length; i++) {
            if (htmllink.childNodes[i].className == "case") { 
              htmllink.childNodes[i].classList.add('active'); 
              //notes.setAttribute('src', case2);
              //notes.classList.add('active');
              break;
            }
          }
          //htmllink.style.backgroundColor = activeLayerBackground;
          htmllink.classList.add('active');
        }
      }
      ;
      // FIN TYPE LIGNE //

      ////////// AJOUT DES DONNEES PONCTUELLES ////////////
    } else {

      /// activation des étiquettes de la couche ///
      var etiquette = false; //créer une variable etiquette
      for (var i = 0; i < Etiquette.length; i++) {
        if (Etiquette[i] === nomDeLaCouche) {
          etiquette = true; //que l'on passe en true, si le type est différent de ligne
          var nomDeLaCoucheEtiquette = nomDeLaCouche + 'etiquette'
        }
      }

      /// autres paramètres ///
      if (overlayCount === 0) { // si aucune couche sélectionnée

        // définition de la position des markers-- //
        if (type == 'marker') {
          var markerOffset = [-13, -17]; //définit un décalage du marker par rapport aux coordonnées du points
          if (iconSize.toString() === '1,13,0.1,25,1.5') {
            markerOffset = [-23, -40];
//	        			console.log(markerOffset)
          } else if (iconSize.toString() === '1,13,0.05,25,1') {
            markerOffset = [-35, -43]
//	        			console.log(markerOffset)
          }
          // symbole associé au marker //  
          map.loadImage(colorOrUrl).then(response => {
            const image = response.data;
            map.addImage(nomDeLaCouche + 'image', image);
            map.addLayer({
              "id": nomDeLaCouche,
              "type": "symbol",
              "source": {
                "type": "geojson",
                "data": POIBrut
              },
              "filter": ['==', 'Categorie', nomDeLaCouche],
              "layout": {
                "icon-image": nomDeLaCouche + 'image',
                "icon-size": {'base': iconSize[0], 'stops': [[iconSize[1], iconSize[2]], [iconSize[3], iconSize[4]]]},
                "icon-allow-overlap": true,
                "icon-offset": {stops: [
                    [13, [0, markerOffset[0]]],
                    [22, [0, markerOffset[1]]]
                  ]}
              },

            });
          });

          Layers.push(nomDeLaCouche); // ajout des symboles, en tant que couche, à un tableau 'Layers'

          // étiquette associée au marker - si elle existe //
          if (etiquette) {

            ////////// Definition de la première fonction etiqOverlay() //////////
            function etiqOverlay() {
              overlayEtiquette = map.addLayer({
                id: nomDeLaCoucheEtiquette,
                type: "symbol",
                source: {
                  type: "geojson",
                  data: POIBrut
                },
                filter: ['==', 'Categorie', nomDeLaCouche],
                layout: {
                  "text-field": "{Etiquette}",
                  "text-anchor": "center",
                  "text-size": {'base': 1.5, 'stops': [[15.8, 10], [20, 25]]},
                  "text-allow-overlap": true,
                  "text-offset": {stops: [
                      [15.8, [0, -1.8]],
                      [20, [0, -2.4]]
                    ]}
                },
                paint: {
                  "text-color": "black",
                },
                minzoom: 15.8
              });
              map.moveLayer(nomDeLaCouche + 'etiquette', 0)
            }
            ////////// fin de la définition de la première fonction etiqOverlay() //////////

            setTimeout(etiqOverlay, 1000); //la fonction est appellée après 1000 milisecondes
            Layers.push(nomDeLaCoucheEtiquette); //la couche d'étiquette est ajoutée au tableau Layers
          }
          ////////// AJOUT DES DONNEES PONCTUELLES (POINTS) ////////////
        }        
        if (type == 'point') {

          map.addLayer({
            id: nomDeLaCouche,
            type: "circle",
            source: {
              type: "geojson",
              data: POIBrut
            },
            filter: ['==', 'Categorie', nomDeLaCouche],
            layout: {'visibility': 'visible'},
            paint: {
              "circle-radius": {'base': iconSize[0], 'stops': [[iconSize[1], iconSize[2]], [iconSize[3], iconSize[4]]]},
              "circle-color": colorOrUrl,
              "circle-opacity": 0.9
            }
          });

          if (etiquette) {
            overlayEtiquette = map.addLayer({
              id: nomDeLaCoucheEtiquette,
              type: "symbol",
              source: {
                type: "geojson",
                data: POIBrut
              },
              filter: ['==', 'Categorie', nomDeLaCouche],
              layout: {
                "text-field": "{Etiquette}",
                "text-anchor": "center",
                "text-size": {'base': 1.5, 'stops': [[13, 2], [22, 60]]},
              },
              paint: {
                "text-color": "black"
              },
              minzoom: 15.8
            });

            Layers.push(nomDeLaCoucheEtiquette);
          }
        }
        if (type == 'picto') {
//	            	console.log(colorOrUrl);
          map.loadImage(colorOrUrl).then(response => {
            const image = response.data;
            map.addImage(nomDeLaCouche + 'image', image);
            map.addLayer({
              "id": nomDeLaCouche,
              "type": "symbol",
              "source": {
                "type": "geojson",
                "data": POIBrut
              },
              "filter": ['==', 'Categorie', nomDeLaCouche],
              "layout": {
                "icon-image": nomDeLaCouche + 'image',
                "icon-size": {'base': iconSize[0], 'stops': [[iconSize[1], iconSize[2]], [iconSize[3], iconSize[4]]]},
                "icon-allow-overlap": true,
              },
              paint: {
                "text-color": "black",
              },
            });
          });
          Layers.push(nomDeLaCouche);
          if (etiquette) {

            ////////// Definition de la deuxième fonction etiqOverlay() ////////// 
            function etiqOverlay() {
              var overlayEtiquette = map.addLayer({
                id: nomDeLaCoucheEtiquette,
                type: "symbol",
                source: {
                  type: "geojson",
                  data: POIBrut
                },
                filter: ['==', 'Categorie', nomDeLaCouche],
                layout: {
                  "text-field": "{Etiquette}",
                  "text-anchor": "center",
                  "text-size": {'base': 1.5, 'stops': [[13, 8], [22, 50]]},
                  "text-allow-overlap": true,
                },
                paint: {
                  "text-color": "black",
                },
                minzoom: 15.8
              });
              map.moveLayer(nomDeLaCouche + 'etiquette', 0)
            }
            // fin de la définition de la deuxième fonction etiqOverlay() //

            setTimeout(etiqOverlay, 1000);
            Layers.push(nomDeLaCoucheEtiquette);
          }
        }

        Layers.push(nomDeLaCouche);

        if (htmllink.nodeName === 'LI') {  // si l'élément HTML htmllink est de type liste <li>
          for (var i = 0; i < htmllink.childNodes.length; i++) { 
            if (htmllink.childNodes[i].className === "case") { //si a une classe "case"
              htmllink.childNodes[i].classList.add('active'); // alors la classe "active" est ajoutée
            }
          }
          htmllink.classList.add('active'); // ajoute la classe "active" à l'élément htmllink lui-même
        }

        if (htmllink.nodeName === 'A') { //si l'élément HTML htmllink est un lien <a>
          htmllink.classList.add('active');
          htmllink.parentElement.classList.add('active');
        }

      } else { //mais si d'autres couches sont déjà sélectionnées
        ////////// définition de la fonction hideLayer() //////////
        function hideLayer(nomDeLaCouche, htmllink) {
          if (htmllink.nodeName === 'LI') { //si l'élement est dans liste
            for (var i = 0; i < htmllink.childNodes.length; i++) {
              if (htmllink.childNodes[i].className === "case active") {
                htmllink.childNodes[i].classList.remove('active');
              }
            }
            htmllink.classList.remove('active');
          }
          if (htmllink.nodeName === 'A') {
            htmllink.classList.remove('active');
            htmllink.parentElement.classList.remove('active');
          }
          map.setLayoutProperty(nomDeLaCouche, 'visibility', 'none');
          Layers = Layers.filter(item => item != nomDeLaCouche); //retire la couche du tableau Layers
          if (popup) { //s’il y a une popup, la retire
            popup.remove();
          }
          if (popupList) { //s’il y a une popupList, la retire
            popupList.remove();
          }
          if (etiquette) { //s’il y a une couches d'étiquettes, passe en non visible
            map.setLayoutProperty(nomDeLaCoucheEtiquette, 'visibility', 'none');
            Layers = Layers.filter(item => item != nomDeLaCoucheEtiquette); //retire du tableau 
            if (popup) { //retire sa popup le cas échéant
              popup.remove();
            }
          }
        }
        ////////// fin de la définition de la fonction hideLayer() //////////

        ////////// définition de la fonction showLayer() //////////
        function showLayer(nomDeLaCouche, htmllink) {
          map.setLayoutProperty(nomDeLaCouche, 'visibility', 'visible');
          map.moveLayer(nomDeLaCouche, 0) //déplace l’ordre de la couche en index 0
          Layers.push(nomDeLaCouche); //ajoute la couche au tableau Layers
          if (htmllink.nodeName === 'LI') {
            for (var i = 0; i < htmllink.childNodes.length; i++) {
              if (htmllink.childNodes[i].className === "case") {
                htmllink.childNodes[i].classList.add('active');
                break;
              }
            }
            htmllink.classList.add('active');
          }
          if (htmllink.nodeName === 'A') {
            htmllink.classList.add('active');
            htmllink.parentElement.classList.add('active');
          }

          if (etiquette) { //s'il y a une couche d'étiquettes
            map.setLayoutProperty(nomDeLaCoucheEtiquette, 'visibility', 'visible');
            Layers.push(nomDeLaCoucheEtiquette); //ajoute la couche au tableau Layers
            map.moveLayer(nomDeLaCoucheEtiquette, 0);
          }
        }
        ////////// fin de la définition de la fonction showLayer() //////////

        var visibility = map.getLayoutProperty(nomDeLaCouche, 'visibility'); //définition de la variable visibility

        if (visibility === 'visible') {
          if (listLayers.includes(htmllink)) { // Si l'élément htmllink est inclus dans la liste
            if (ordre !== "nav nav-third-level collapse") { // ...et si l'ordre n'est pas "nav nav-third-level collapse"
              hideLayer(nomDeLaCouche, htmllink);  // ...alors masque la couche spécifiée
            }
          } else {
            hideLayer(nomDeLaCouche, htmllink);  // S'il n'est pas dans la liste, masque également la couche
          }
        } else {
          showLayer(nomDeLaCouche, htmllink); // Si la visibilité n'est pas "visible", affiche la couche spécifiée pour l'élément htmllink
        }
      }
      ;
      getPopup(nomDeLaCouche, colorOrUrl, type);
      map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, {layers: Layers});
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      });
    }
  }
////////// fin de la définition de la fonction addCategoryOverlay() //////////

var popupTitle = null;
var popupContent = [];

////////// Fonction allant chercher le contenu ////////// 
  function getPopupContent(feature) {
    popupTitle = null;
    popupContent = [];

    /// Titre de la popup ///
    if (feature.properties.Categorie != "null" && feature.properties.Categorie != null && feature.properties.Categorie != "") {
      popupTitle = feature.properties.Categorie;
    }
    if (feature.properties.Nom != "null" && feature.properties.Nom != null && feature.properties.Nom != "") {
      popupTitle = feature.properties.Nom;
    }

    /// Ecrit le contenu de la popup selon des conditions (ex. Bâtiment A, niveau : 0) ///
    //console.log(feature.properties.Batiment)

    //Batiment n'est pas null :
    if (feature.properties.Batiment != "null" && feature.properties.Batiment != null && feature.properties.Batiment != "") {
      popupContent += '<p>Bâtiment ' + feature.properties.Batiment ;
    }
    //Niveau n'est pas null... :
    if (feature.properties.Niveau != "null" && feature.properties.Niveau != null && feature.properties.Niveau != "") {
      if (feature.properties.Niveau.toString().startsWith('niveau')){
        var niveau = feature.properties.Niveau;
      }
      else {
        var niveau = 'niveau ' + feature.properties.Niveau;
      }
      //... et Batiment n'est pas null :
      if (feature.properties.Batiment != "null" && feature.properties.Batiment != null && feature.properties.Batiment != "") {
        popupContent += ', ' + niveau ;
      }
      //ou... et Batiment est null :
      else {
        popupContent += '<p>' + niveau ;
      }
    }
    //Batiment OU Niveau n'est pas null :
    if ((feature.properties.Batiment != "null" && feature.properties.Batiment != null && feature.properties.Batiment != "")
    || (feature.properties.Niveau != "null" && feature.properties.Niveau != null && feature.properties.Niveau != "")) {
      popupContent += '</p>';
    }
    //Capacité n'est pas null :
    if (feature.properties.Capacite != "null" && feature.properties.Capacite != null && feature.properties.Capacite != "") {
      popupContent += '<p>' + feature.properties.Capacite + '<p>';
    }
    //Info n'est pas null :
    if (feature.properties.Info != "null" && feature.properties.Info != null && feature.properties.Info != "") {
      popupContent += '<p>' + feature.properties.Info + '<p>';
    }
    //Lien n'est pas null :
    if (feature.properties.Lien != "null" && feature.properties.Lien != null && feature.properties.Lien != "") {
		//Categorie est 'Oeuvre' :
      if (feature.properties.Categorie == 'Oeuvre') {
        popupContent += '<p><a href =" ' + feature.properties.Lien + '" target=\"_blank\">Explorer la storymap</a></p>';
      }
      else { //Categorie n'est pas 'Oeuvre' :
        popupContent += '<p><a href =" ' + feature.properties.Lien + '" target=\"_blank\">Site internet</a></p>';
      }
    }
    //Mail n'est pas null :
    if (feature.properties.Mail != "null" && feature.properties.Mail != null && feature.properties.Mail != "") {
      popupContent += '<p>Contacter par mail : <a href="mailto:' + feature.properties.Mail + '">'+feature.properties.Mail+'</a></p>';
    }
    //Tel n'est pas null :
    if (feature.properties.Tel != "null" && feature.properties.Tel != null && feature.properties.Tel != "") {
      popupContent += '<p>Contacter par téléphone : <a href="tel:' + feature.properties.Tel + '">'+feature.properties.Tel+'</a></p>';
    }
    //Image n'est pas null :
    if (feature.properties.Image != "null" && feature.properties.Image != null && feature.properties.Image != "") {
      //Categorie est ''Département de formation' 
      if (feature.properties.Categorie == 'Département de formation') {
        popupTitle += '<img style = \'height : 60px; position : absolute; right : 0;top:0\' src = \'' + feature.properties.Image + '?v=' + version +'\'/>'
      }
      //Categorie est 'Oeuvre'
      else if (feature.properties.Categorie == 'Oeuvre') {
        popupContent += '<img style = \'height : auto; width : 96%; margin-left:2%; margin-right:2%; margin-bottom: 4px;\' src = \'' + feature.properties.Image + '?v=' + version +'\'/>'
      }
      //Autres Categories
      else {
        popupContent += '<img style = \'height : 60px; left : 50%\' src = \'' + feature.properties.Image + '?v=' + version +'\'/>'
      }
    }
  }
////////// fin de la définition de la fonction getPopupContent()//////////

////////// Fonction affichage la popup ////////// 
  function getPopup(couche, iconURL, type) {
    map.on('click', function (e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: [couche]
      });

      if (!features.length) {
        return;
      }
      var feature = features[0];

      getPopupContent(feature);

      if (type == 'marker') {
        popup = new maplibregl.Popup({
          offset: [0, -40],
          closeButton: false
        })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h1>' + popupTitle + '</h1>' + popupContent)
                .addTo(map);
      } else {
        popup = new maplibregl.Popup({
          //           offset: [0, -15],
          offset: [5, -15],
          closeButton: false
        })
                .setLngLat(feature.geometry.coordinates)
                .setHTML('<h1>' + popupTitle + '</h1>' + popupContent)
                .addTo(map);
      }
  
        // création du lien pour les objets lorsqu'on clique sur l'épingle 
        const selectedObjet = popupTitle.trim(); // Récupérer le nom de l'objet à partir du titre de la popup
        const selectedCampus = getCampusFromURL(); // Récupérer le campus à partir de l'URL
        const selectedCategory = getCategoryFromURL(); // Récupérer la catégorie à partir de l'URL
        
        // const objetId = feature.properties.id; // Récupérer l'id de l'objet
        createLinkAndUpdateURL(selectedCampus, selectedCategory, selectedObjet); // Appeler la fonction pour changer l'objet et l'URL

  
    });
  }
  
  
////////// fin de la définition de la fonction getPopup() //////////

  var salleRecherchee = null;

////////// Fonction fonction createHTMLList() ////////// 
var elLink, elList;
  function createHTMLList(categorie, listeDeNoms, elementCible, overlayCount) {
    // initialisation de variables :
    salleRecherchee = null;
    var listeLink = [];
    elLink = null
    elList = null

    if (overlayCount == 0) {
      var data = fproperties.filter(function (e) { //filtre les données sur la catégorie sélectionnée
        return e.Categorie === categorie;
      })
      for (let i = 0; i < data.length; i++) {
        listeDeNoms.push(data[i]['Nom']); //pousse les noms de chaque entité dans une listeDeNoms
      }
      for (let i = 0; i < listeDeNoms.length; i++) { //pour chaque élément de la liste
        var currentName = listeDeNoms[i].split("'").join("!"); //remplace les ' par !
        elList = document.createElement('li'); //créer un élément <li>
        elementCible.appendChild(elList); //elList ajouté comme enfant de elementCible
        elLink = document.createElement('a'); //créer un élément <a>
        elLink.innerHTML = listeDeNoms[i]; // définit le contenu HTML de <a>
        elLink.setAttribute('id', listeDeNoms[i]); //définit l'id de <a>
        elLink.setAttribute('href', '#'); //définit le href de <a>
        elLink.classList.add('leaf'); //ajoute la classe 'leaf' à <a>
        var theFunction = 'switchPOI(' + '\'' + currentName + '\');return false;'
        //elLink.setAttribute('href',theFunction);
        //elLink.addEventListener("click", () => switchPOI(currentName));
        elLink.setAttribute('onclick', theFunction);
        elList.appendChild(elLink);  //elLink ajouté comme enfant de elList, on a donc une liste (li) de liens (a)
      }
      for (let i = 0; i < listeDeNoms.length; i++) {
        listeLink.push(document.getElementById(listeDeNoms[i])) //on obtient ici la liste de liens dans l'élément cible HTML
      }

    }

  }


  
// fin de la définition de la fonction createHTMLList() //

//////////////////////////////////   Interactivité menus //////////////////////////////////////
  // ZOOMS sur les campus
  var jumpingZoom = 15.8;
  if (device = 'phone') {
    jumpingZoom = 15
  }
  ;
  var zoomLaHarpe = document.getElementById("LaHarpe")
  zoomLaHarpe.addEventListener('click', function () {
    map.setMaxBounds(rennesBounds);
    map.jumpTo({
      zoom: zoomBase,
      center: [-1.7091, 48.1254]
    });
    zoomLaHarpe.classList.add('active');
    zoomMazier.classList.remove('active');
    zoomVillejean.classList.remove('active');
  });
  var zoomVillejean = document.getElementById("Villejean")
  zoomVillejean.classList.add('active');
  zoomVillejean.addEventListener('click', function () {
    map.setMaxBounds(rennesBounds);
    map.jumpTo({
      zoom: zoomBase,
      center: [-1.7013, 48.119365]
    });
    zoomVillejean.classList.add('active');
    zoomMazier.classList.remove('active');
    zoomLaHarpe.classList.remove('active');
  });
  var zoomMazier = document.getElementById("Mazier")
  zoomMazier.addEventListener('click', function () {
    map.setMaxBounds(mazierBounds);
    map.jumpTo({
      zoom: zoomBase,
      center: [-2.7410000, 48.513033]
    });
    zoomMazier.classList.add('active');
    zoomVillejean.classList.remove('active');
    zoomLaHarpe.classList.remove('active');
  });

 //Evénément click pour déclancher l'impression
const boutonPrinter = document.getElementById('imprimer');
boutonPrinter.addEventListener('click', function () {
  window.print()})
//////////////////////////////////   Initialisation des données carte //////////////////////////////////////

  //appel des lignes
  var lines = (function () {
    var jsonLines = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "../data/lineaire.geojson?v="+version,
      'dataType': "json",
      'success': function (data) {
        jsonLines = data;
      }
    });
    return jsonLines;
  })();

//Définition des variables avant le fonction promise
  var fproperties = [];
  var POI = [];
  var searchBarCrossPresence = null;
  var searchValue = null;
  var searchLayerId = 'SearchResult';
  var searchLayerCount = 0;
  var searchPopup = null;
  var searchItem = [];
  var searchX = null;
  var searchY = null;


// nouvel appel grâce à la fonction d'AP
const getGeoJSON = (nomFichier) => fetch(nomFichier).then(res => res.json()).then(res => res.features);

const geojsons = [
  getGeoJSON("../data/filtre/acces_PMR.geojson"),
  getGeoJSON("../data/filtre/amphi.geojson"),
  getGeoJSON("../data/filtre/arret_bus_pts.geojson"),
  getGeoJSON("../data/filtre/arret_metro_pts.geojson"),
  getGeoJSON("../data/filtre/ascenseur.geojson"),
  getGeoJSON("../data/filtre/asso_art_spor.geojson"),
  getGeoJSON("../data/filtre/asso_filiere.geojson"),
  getGeoJSON("../data/filtre/asso_mstr_doc.geojson"),
  getGeoJSON("../data/filtre/asso_solidarite.geojson"),
  getGeoJSON("../data/filtre/biblio.geojson"),
  getGeoJSON("../data/filtre/cafet_distrib.geojson"),
  getGeoJSON("../data/filtre/copieur.geojson"),
  getGeoJSON("../data/filtre/entree_bat.geojson"), 
  getGeoJSON("../data/filtre/entree_campus.geojson"),
  getGeoJSON("../data/filtre/eqpmt_sportif.geojson"),
  getGeoJSON("../data/filtre/esp_detente.geojson"),
  getGeoJSON("../data/filtre/labo.geojson"),
  getGeoJSON("../data/filtre/lieu_cultu.geojson"),
  getGeoJSON("../data/filtre/micro_ondes.geojson"),
  getGeoJSON("../data/filtre/oeuvres.geojson"),
  getGeoJSON("../data/filtre/parking_velo.geojson"),
  getGeoJSON("../data/filtre/parking_voiture.geojson"),
  getGeoJSON("../data/filtre/resid_univ.geojson"),
  getGeoJSON("../data/filtre/ru.geojson"),
  getGeoJSON("../data/filtre/salle_e0.geojson"),
  getGeoJSON("../data/filtre/salle_e1.geojson"),
  getGeoJSON("../data/filtre/salle_e2.geojson"),
  getGeoJSON("../data/filtre/salle_e3.geojson"),
  getGeoJSON("../data/filtre/salle_e4.geojson"),
  getGeoJSON("../data/filtre/salle_e5.geojson"),
  getGeoJSON("../data/filtre/salle_e6.geojson"),
  getGeoJSON("../data/filtre/salle_e7.geojson"),
  getGeoJSON("../data/filtre/salle_info.geojson"),
  getGeoJSON("../data/filtre/salle_spe.geojson"),
  getGeoJSON("../data/filtre/sante.geojson"),
  getGeoJSON("../data/filtre/scol.geojson"),
  getGeoJSON("../data/filtre/services.geojson"),
  getGeoJSON("../data/filtre/station_velostar.geojson"),
  getGeoJSON("../data/filtre/wc.geojson"),
  getGeoJSON("../data/fondcarte/lettre_batiment.geojson")
];

const finalGeoJSON = {
  "type": "FeatureCollection",
  "features": []
};

 
Promise.all(geojsons).then(allGeoJsons => { //à l'intérieur de cette fonction se passe le regroupement des geojsons

  allGeoJsons.forEach(oneGeoJSON => {
      finalGeoJSON.features.concat(oneGeoJSON.features);
    });
    
  //Appeler la fonction qui gère les données fusionnées
    finalGeoJSON.features = allGeoJsons // recup de l'objet avec ts les geojsons
   var mergedFeatures = finalGeoJSON.features.reduce((acc, val) => acc.concat(val), []);
    finalGeoJSON.features = mergedFeatures // transformation de l'objet pour correspondre à l'ancien fichier points.geojson
    
    POIBrut = finalGeoJSON // affectation de cette objet dans l'objet appelé par les couches dans le reste du code
    
    POI = POIBrut.features;

  fproperties = finalGeoJSON.features.map(function (el) {
    return el.properties;})

  map.on("load", function () {
    // Couche herbe
    map.addLayer({
      id: "Herbe",
      type: "fill",
      source: {
        type: "geojson",
        data: "../data/fondcarte/grass.geojson?v="+version
      },
      paint: {
        'fill-color': '#9FE19C',
        'fill-opacity': 0.5
      }
    });

  // Déplacer le calque vers le bas de la pile de calques
  map.moveLayer("Herbe", map.getStyle().layers[1].id); // pour mettre les épingles au dessus de l'herbe 

    // Couche référentiel bati 2D
    getBati2D();

    // Couche piste athletisme
    map.addLayer({
      id: "Piste d'athlétisme Villejean",
      type: "fill",
      source: {
        type: "geojson",
        data: "../data/fondcarte/piste_athle.geojson?v="+version
      },
      paint: {
        'fill-color': '#C09C83',
        'fill-opacity': 0.85
      }
    });
    map.addLayer({
      id: "Terrain de football Villejean",
      type: "line",
      source: {
        type: "geojson",
        data: "../data/fondcarte/terrain_football.geojson?v="+version
      },
      "paint": {
        'line-color': '#FFFFFF',
        'line-width': {'base': 1.2, 'stops': [[13, 0.5], [22, 3]]}
      }
    });
});





//////////////////////////////////  Barre de recherche //////////////////////////////////////


  var jproperties = fproperties.filter(function (e) {
    return e.Nom !== null;
  })


  var options = {
    data: jproperties,
    getValue: "Nom",
    template: {
      type: "description",
      fields: {
        // Possibilité de mettre le campus en description
        description: "Campus"
      }
    },
    list: {
      match: {
        enabled: true
      }
    },
    theme: "plate-dark"
  };
  $("#search-bar").easyAutocomplete(options);

})
.catch(e => {
  alert("Erreur oups");
  console.error(e);
}); // fin de la fonction aggrégeant les geojsons. Je la fait se fermer un peu après la partie
//concernant les couches car cela désactive la barre de recherche sinon

//////////////////////////////////// couches temps réel //////////////////////////////////////////////
// Velostar
var geojsonVelos = null;
var previousDataVelos = {times: [], stations: []};
var prevInfo = null;
var velostarTRCount = 0;
var nomLayer = null;
// var velostarLink = document.getElementById('Station Vélostar'); //déjà créé plus haut

////////// définition de la fonction addRealTimeVelostar //////////
function addRealTimeVelostar() {
  velostarTRCount += 1;
  if (velostarTRCount === 1) {
    updateData();

    function updateData() {
      //Appel de l'API pour les vélos
      $.ajax({
        //URL de l'API
        url: "https://data.explore.star.fr/api/records/1.0/search/?dataset=vls-stations-etat-tr&facet=nom&facet=etat&facet=nombreemplacementsactuels&facet=nombreemplacementsdisponibles&facet=nombrevelosdisponibles&format=geojson&rows=150",

        //Type de données
        dataType: "jsonp", //type de données attendu en réponse à la requête - utilisé pour les appels cross-domain
        crossDomain: true, //la requête peut être exécutée depuis un domaine différent de celui de la page actuelle

        //Méthode appelée si le téléchargement a fonctionné
        success: function (geojson) {
//                    console.log("Données téléchargées");
          geojsonVelos = geojson; //stockage des données reçues dans geojsonVelos
          saveBikeData();
          if (nomLayer === null) {
            showBikeData();
          } else {
            var visibility = map.getLayoutProperty(nomLayer, 'visibility');
            if (visibility === 'visible') {
              showBikeData();
            } else {
//                            console.log('données masquées')
            }
          }
          ;
          setTimeout(updateData, 60 * 1000);
        },

        //Méthode appelée lorsque le téléchargement a échoué
        error: function () {
          alert("Erreur lors du téléchargement des vélos !");
        }
      });
    }
    ;

    function saveBikeData() {
      //On change la structure des données pour simplifier l'utilisation
      var stations = {};
      var prevStationData = null;

      // Pour chaque station de vélos dans les données récupérée
      geojsonVelos.features.forEach(f => { 
        stations[f.properties.nom] = f.properties;  // Stocke les propriétés de chaque station

        //On compare avec le nombre de vélos précédent
        if (previousDataVelos.stations.length > 0) {
          // Calcule la différence de vélos disponibles par rapport aux données précédentes
          f.properties.diff = f.properties.nombrevelosdisponibles - previousDataVelos.stations[previousDataVelos.stations.length - 1][f.properties.nom].nombrevelosdisponibles;
        } else {
          //Si aucune donnée précédente n'est disponible, initialise la différence à 0
          f.properties.diff = 0;
        }

        //On met à jour l'affichage des infos si besoin
        if (prevInfo && prevInfo === f.properties.nom) {
          prevStationData = f;
        }
      });

      // Ajoute le timestamp actuel et les données de stations au tableau des temps des données précédentes
      previousDataVelos.times.push(Date.now());
      previousDataVelos.stations.push(stations);
      // Supprime les couches obsolètes de la liste des couches
      Layers = Layers.filter(item => item != "bikes" + (previousDataVelos.times.length - 1));
    }
    ;

    function showBikeData() {
      //On supprime les données précédentes
      if (previousDataVelos.times.length > 1) {
        map.removeLayer("bikes" + (previousDataVelos.times.length - 1));
      }

      nomLayer = "bikes" + previousDataVelos.times.length; //On créé une nouvelle couche de données
      Layers.push(nomLayer); //On l'ajoute à la liste Layers

      map.addLayer({ //et on l'ajoute au canva map
        id: nomLayer,
        type: "circle",
        source: {
          type: "geojson",
          data: geojsonVelos
        },
        filter: ["has", "diff"],
        paint: {
          "circle-radius": {'base': 1.5, 'stops': [[13, 5], [22, 60]]},
          "circle-color": "green"
        }
      });
    }
    ;

  } else { 
    //ci-après : si la couche était visible, alors devient invisible et inversement.
    var clickedLayer = this.textContent;
    var visibility = map.getLayoutProperty(nomLayer, 'visibility');
    if (visibility === 'visible') {
//        	console.log("hey")
      map.setLayoutProperty(nomLayer, 'visibility', 'none'); 
      Layers = Layers.filter(item => item != nomLayer); // si la couche passe en invisible, la retire de Layers,
    } else {
      map.setLayoutProperty(nomLayer, 'visibility', 'visible');
      Layers.push(nomLayer); // si la couche passe en visible l'ajoute à Layers
    }
  }
  ;

  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: [nomLayer]
    });
    if (!features.length) {
      return;
    }
    var feature = features[0];
    popup = new maplibregl.Popup({
      offset: [0, -15],
      closeButton: false,
    })
            .setLngLat(feature.geometry.coordinates)
            .setHTML('<h1> Station vélostar : ' + feature.properties.nom + '</h1><p>Nombre de vélos disponibles : ' + feature.properties.nombrevelosdisponibles + '<br>Nombre d\'emplacements disponibles : ' + feature.properties.nombreemplacementsdisponibles + '</p>')
            .addTo(map);
  });

  map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, {layers: Layers});
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
}
////////// fin de la définition de la fonction addRealTimeVelostar //////////

// Couche des BUS
var geojsonBus = null;
var previousDataBus = {times: [], stations: []};
var prevInfo = null;
var busTRCount = 0
var nomLayerBus = null
// var busLink = document.getElementById('Bus'); // déjà appelé plus haut
////////// définition de la fonction addRealTimeBus //////////
function addRealTimeBus() {
  busTRCount += 1;
  if (busTRCount === 1) {
    updateBusData();
    function updateBusData() {
      //Appel de l'API pour les vélos
      $.ajax({
        //URL de l'API
        url: "https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-bus-vehicules-position-tr&facet=numerobus&facet=etat&facet=nomcourtligne&facet=sens&facet=destination&facet=ecartsecondes&format=geojson&rows=500",

        //Type de données
        dataType: "jsonp",
        crossDomain: true,

        //Méthode appelée lorsque le téléchargement a fonctionné
        success: function (geojson) {
//                    console.log("Données téléchargées");
          geojsonBus = geojson;
          saveBusData();
          if (nomLayerBus === null) {
            showBusData()
          } else {
            var visibility = map.getLayoutProperty(nomLayerBus, 'visibility');
            if (visibility === 'visible') {
              showBusData()
            } else {
//                            console.log('données masquées')
            }
          }
          ;
          setTimeout(updateBusData, 60 * 1000);
        },

        //Méthode appelée lorsque le téléchargement a échoué
        error: function () {
          alert("Erreur lors du téléchargement des bus !");
        }
      });
    }
    ;
    function saveBusData() {
      //On change la structure des données pour simplifier l'utilisation
      var stations = {};
      var prevStationData = null;

      previousDataBus.times.push(Date.now());
      previousDataBus.stations.push(stations);
      Layers = Layers.filter(item => item != "bus" + (previousDataBus.times.length - 1));
    }
    function showBusData() {
      //On supprime les données précédentes
      if (previousDataBus.times.length > 1) {
        map.removeLayer("bus" + (previousDataBus.times.length - 1));
      }

      //On créé un nouveau calque de données
      nomLayerBus = "busTR" + previousDataBus.times.length;
      Layers.push(nomLayerBus);
      map.addLayer({
        id: nomLayerBus,
        type: "circle",
        source: {
          type: "geojson",
          data: geojsonBus
        },
        filter: ['==', 'etat', 'En ligne'],
        paint: {
          "circle-radius": {'base': 1.7, 'stops': [[13, 5], [22, 60]]},
          "circle-color": "#0066ff"
        }
      });
    }
    busCount += 1;
  } else {
    var clickedLayer = this.textContent;

    var visibility = map.getLayoutProperty(nomLayerBus, 'visibility');
    if (visibility === 'visible') {
      map.setLayoutProperty(nomLayerBus, 'visibility', 'none');
      Layers = Layers.filter(item => item != nomLayerBus);
    } else {
      map.setLayoutProperty(nomLayerBus, 'visibility', 'visible');
      Layers.push(nomLayerBus);
    }
  }
  ;

  map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: [nomLayerBus]
    });
    if (!features.length) {
      return;
    }
    var feature = features[0];
    popup = new maplibregl.Popup({
      offset: [0, -15],
      closeButton: false,
    })
            .setLngLat(feature.geometry.coordinates)
            .setHTML('<h1> Bus du réseau STAR </h1><p>Ligne : ' + feature.properties.nomcourtligne + '<br>A destination de : ' + feature.properties.destination + '</p>')
            .addTo(map);
  });
  map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, {layers: Layers});
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  });
}
////////// fin de la définition de la fonction addRealTimeBus //////////

  ////////// définition de la fonction getSearchPopup //////////
  function getSearchPopup() {
    var popupTitle = searchItem.properties.Nom;
    var popupContent = '';

    //Batiment n'est pas null :
    if (searchItem.properties.Batiment != null) {
      popupContent += '<p>Bâtiment ' + searchItem.properties.Batiment;
    }
    ;

    //Niveau n'est pas nul :
    if (searchItem.properties.Niveau != null) {
      if (searchItem.properties.Batiment != null){ //... Batiment n'est pas null :
        if (searchItem.properties.Niveau.toString().startsWith('niveau')){
          var niveau = searchItem.properties.Niveau;
        }
        else {
          var niveau = 'niveau ' + searchItem.properties.Niveau;
        }
        popupContent += ', ' + niveau ;
      }
      else {
      popupContent += '<p>' + niveau ;
      }
    }

    //Batiment OU Niveau n'est pas null :
    if (searchItem.properties.Batiment != null || searchItem.properties.Niveau != null){
      popupContent += '</p>';
    }
    ;
    //Info n'est pas null :
    if (searchItem.properties.Info != null) {
      popupContent += '<p>' + searchItem.properties.Info + '<p>';
    }
    ;
    //Capacité n'est pas null :
    if (searchItem.properties.Capacite != null) {
      popupContent += '<p>' + searchItem.properties.Capacite + '<p>';
    }
    ;
    //Lien n'est pas null :
    if (searchItem.properties.Lien != null) {
      popupContent += '<p><a href="' + searchItem.properties.Lien + '" target=\"_blank\">Site internet</a></p>';
    }
    ;
    //Mail n'est pas null :
    if (searchItem.properties.Mail != null) {
      popupContent += '<p>Contacter par mail : <a href="maito:' + searchItem.properties.Mail + '">'+searchItem.properties.Mail+'</a></p>';
    }
    ;
    //Téléphone n'est pas null :
    if (searchItem.properties.Tel != null) {
      popupContent += '<p>Contacter par téléphone : <a href="tel:' + searchItem.properties.Tel + '">'+searchItem.properties.Tel+ '</a></p>';
    }
    ;
    //Image n'est pas null :
    if (searchItem.properties.Image != null) {
      if (searchItem.properties.Categorie == 'Département de formation') {
        popupTitle += '<img style = \'height : 60px ; position : absolute ; right : 0\' src = \'' + searchItem.properties.Image + '?v=' + version +'\'/>';
      } else {
        popupContent += '<img style = \'height : 50px\' src = \'' + searchItem.properties.Image + '?v=' + version +'\'/>';
      }
    }
    ;
    //Création d'un objet searchPopup
    searchPopup = new maplibregl.Popup({
      offset: [0, -45],
      closeButton: false  
    })
            //.setLngLat(searchItem.geometry.coordinates)
            .setLngLat(searchX) //version Paul
            .setHTML('<h1>' + popupTitle + '</h1><div class="description">' + popupContent + '</div>')
            .addTo(map);
  }
  ;
  ////////// fin de la définition de la fonction getSearchPopup //////////

  var searchBarCrossPresence = null;

  ////////// définition de la fonction getSearchedItem //////////
  function getSearchedItem(item) {

    //initialisation des variables si une requête a été faite 
    if (searchValue !== null) {
      searchValue = null
      searchItem = [];
      searchX = null;
      searchY = null;
      Layers = Layers.filter(item => item != searchLayerId); //la couche de recherche précédente est supprimée de Layers...
      searchLayerCount += 1; //le compteur de couche de recherche est incrémenté
      searchPopup.remove(); 
      map.removeLayer(searchLayerId) //... et supprimée de la carte 
      searchLayerId = 'searchResult' + searchLayerCount;
    };

    if (item) { //si un item a été passé à la fonction
      searchValue = item; //searchValue est défini sur cet item. 
    } else {
      searchValue = document.getElementById("search-bar").value; // sinon sinon, il est extrait de la valeur d'un élément HTML avec l'ID "searchfield".
    }


    for (var i = 0; i < POI.length; i++) {
      if (POI[i].properties.Nom === searchValue) {
        searchItem = POI[i]; //Si un POI correspondant est trouvé (dans la liste POI), il est assigné à searchItem

        //charge une image qui sera utilisée comme icône pour le POI recherché
        map.loadImage('../css/icons/layers_icons/recherche.png').then(response => {
          const image = response.data;
          map.addImage(searchLayerId + 'image', image);

          //ajoute une nouvelle couche de symboles à la carte pour afficher le POI recherché
          map.addLayer({
            "id": searchLayerId,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": searchItem
            },
            "layout": {
              "icon-image": searchLayerId + 'image',
              "icon-size": {'base': tailleMarker[0], 'stops': [[tailleMarker[1], tailleMarker[2]], [tailleMarker[3], tailleMarker[4]]]},
              "icon-allow-overlap": true,
              "icon-offset": {stops: [
                  [13, [0, -30]],
                  [22, [0, -50]]
                ]}
            },
          });
        });

        Layers.push(searchLayerId);

        //le curseur passe en mode main (pointer) plutôt que flèche
        map.on('mousemove', function (e) {
          var features = map.queryRenderedFeatures(e.point, {layers: Layers});
          map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
        });

        searchX = searchItem.geometry.coordinates[0];
        searchY = searchItem.geometry.coordinates[1];
        // Configuration de la carte pour le campus Mazier
        if (POI[i].properties.Campus === 'Mazier') {
          map.setMaxBounds(mazierBounds);
          zoomVillejean.classList.remove('active');
          zoomMazier.classList.add('active');
          zoomLaHarpe.classList.remove('active');
        }
         // Configuration de la carte pour le campus Villejean
        if (POI[i].properties.Campus === 'Villejean') {
          map.setMaxBounds(rennesBounds);
          zoomVillejean.classList.add('active');
          zoomMazier.classList.remove('active');
          zoomLaHarpe.classList.remove('active');
        }
        // Configuration de la carte pour le campus La Harpe 
        if (POI[i].properties.Campus === 'La Harpe') {
          map.setMaxBounds(rennesBounds);
          zoomVillejean.classList.remove('active');
          zoomMazier.classList.remove('active');
          zoomLaHarpe.classList.add('active');
        }

        if (DDD) {
          // Configuration de la carte pour le mode 3D
          map.jumpTo({
            //center: [searchX, searchY], 
            center: searchX, //version paul
            zoom: 16.5,
            pitch: 45,
            speed: 0.6
          });
        } else {
          // Configuration de la carte pour le mode 2D
          map.jumpTo({
            //center: [searchX, searchY],
            center: searchX, //version paul
            zoom: 16.5,
            pitch: 0,
            speed: 0.6
          });
        }

        getSearchPopup();
        
        //Evenement fermer la popup : si l'utilisateur clique ailleurs sur la carte alors que le popup est ouvert
        map.on('click', function (e) {
          if (searchPopup.isOpen() == true) {
            searchPopup.remove();

          }
        })
      }
    }
  }
////////// fin de la définition de la fonction getSearchedItem //////////


//////////////////////////////////   3D   //////////////////////////////////////
  var DDButton = document.getElementById('DDButton');
  var DDDButton = document.getElementById('DDDButton');

  var zoomCible;

  DDDButton.addEventListener('click', function () { // Action du bouton 3D
    var X = map.getCenter()["lng"];
    var Y = map.getCenter()["lat"];
    var currentZoom = map.getZoom()
    if (DDD === false) {
      Y = Y - 0.00021;
      getBati3D();
      zoomCible = currentZoom + 0.5;
      map.jumpTo({
        center: [X, Y],
        pitch: 60,
        speed: 0.08,
        zoom: zoomCible
      });
      DDDButton.classList.add('active');
      DDD = true;
      map.dragRotate.enable();
      DDButton.classList.remove('active');
    }
  })
  DDButton.addEventListener('click', function () { // Action du bouton 2D
    var X = map.getCenter()["lng"];
    var Y = map.getCenter()["lat"]; // Récupération des coordonnées du centre de la carte
    var currentZoom = map.getZoom() // Récupération du zoom actuel
    var button = document.getElementById('DDDButton'); // Récupération du bouton 3D
    if (DDD) { // Si on est en 3D
      Y = Y + 0.00021;
      getBati2D(); // On enlève les bâtiments en 3D
      zoomCible = currentZoom - 0.5;
      map.jumpTo({
        center: [X, Y],
        pitch: 0, 
        speed: 0.08,
        zoom: zoomCible 
      });
      map.dragRotate.disable(); // On désactive la rotation de la carte

      DDButton.classList.add('active'); // On active le bouton 2D
      DDD = false;  // On passe en 2D

      map.dragRotate.enable(); // On active la rotation de la carte
      DDDButton.classList.remove('active'); // On désactive le bouton 3D
    }
  }) 

//////////////////////////////////   Ajout de l'habillage de la carte //////////////////////////////////////
  var nav = new maplibregl.NavigationControl();
  map.addControl(nav, 'top-left');
  map.addControl(new maplibregl.ScaleControl({
    maxWidth: 120,
    unit: 'metric'}));

  map.addControl(new maplibregl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }));
  if (screen.width > 700) {
    var attributionContainer = document.createElement('div');
    attributionContainer.classList.add('attribution-container');
    /*attributionContainer.style.backgroundColor = 'white';
     attributionContainer.style.position = 'absolute';
     attributionContainer.style.background = 'rgba(255,255,255, 0.5)';
     attributionContainer.style.bottom = '0';
     attributionContainer.style.right = '0';
     attributionContainer.style.display = 'inline-block';
     attributionContainer.style.zIndex = '9999';*/
    var attributionLink1 = document.createElement('a');
    attributionLink1.innerHTML = '© OpenMapTiles '
    attributionLink1.setAttribute("class", "attribution");
    attributionLink1.setAttribute('href', 'https://openmaptiles.org');
    var attributionLink2 = document.createElement('a');
    attributionLink2.innerHTML = '© OpenStreetMap contributors ';
    attributionLink2.setAttribute("class", "attribution");
    attributionLink2.setAttribute('href', 'http://www.openstreetmap.org/about');
    var attributionLink3 = document.createElement('a');
    attributionLink3.innerHTML = '© MapLibre ';
    attributionLink3.setAttribute("class", "attribution");
    attributionLink3.setAttribute('href', 'https://maplibre.org/');
    var attributionLink4 = document.createElement('a');
    attributionLink4.innerHTML = '© Master SIGAT';
    attributionLink4.setAttribute("class", "attribution");
    attributionLink4.setAttribute('href', 'https://esigat.wordpress.com');
    var carte = document.getElementById('map');
    carte.appendChild(attributionContainer);
    attributionContainer.appendChild(attributionLink1);
    attributionContainer.appendChild(attributionLink2);
    attributionContainer.appendChild(attributionLink3);
    attributionContainer.appendChild(attributionLink4);
  }
// ajout actions barre de recherche
//var searchButton = document.getElementById('searchButton');
var searchBarCrossPresence = null;

searchButton.addEventListener('click', function (e) {
  if (searchBarCrossPresence == null) {
    searchBarCrossPresence = 'yes';
    searchButton.classList.add('search-active'); // Ajouter la classe pour l'icône de la croix
    getSearchedItem();
  } else {
    Layers = Layers.filter(item => item != searchLayerId);
    console.log(searchLayerId);
    map.removeLayer(searchLayerId);
    searchPopup.remove();
    searchBarCrossPresence = null;
    $("#search-bar").val("");
    searchButton.classList.remove('search-active'); // Supprimer la classe pour l'icône de la croix
  }
});

var searchbar = document.getElementById('search-bar');
searchButton.addEventListener('keypress', function (e) {
  if (e.keyCode == 13) {
    getSearchedItem();
  }
});
