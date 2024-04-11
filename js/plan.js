// Importation du token fond de carte MapTiler au début de la fonction IIFE
import {mapToken} from './token.js';

(function ($) {
  ///////////////////////////// code origine ////////////////////////////
  //ci-dessous l'extraction d'une valeur d'un paramètre d'URL (avec expression régulière) 

  function getQueryStringValue(key) {
    console.log('key:', key);
    console.log('window.location.search:', window.location.search); 
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));

  } // Fonction pour récupérer la valeur du paramètre de l'URL

  var overlay = getQueryStringValue("layer").toString(); // Récupérer la valeur du paramètre de couche
  var overlayPoint = getQueryStringValue("point").toString();

  // fonction utilisé lors du chargement 

////////////////////////////// fin code origine ////////////////////////////


/**
 * Créer un lien vers le site Zone Téléchargement
 * @param campus Nom du campus
 * @param categories Nom de la catégorie
 * @param objet Nom de l'objet/élément 
 * les autres paramètres 
 * @returns {string} URL de recherche
 */

/////////////////////////////////// code pour changer de campus /////////////////////////////

// // Fonction pour créer une URL avec un paramètre de campus et mettre à jour l'URL de la page
// function createLinkAndUpdateURL(campus, categories) { // parametre non obligatoire possibles (ex: 2D/3D)
//   let url = `http://127.0.0.1:5500/?`; // changer l'adresse du site par le vrai 
  
//   url += `campus=${encodeURIComponent(campus)}`; // Ajouter le paramètre de campus à l'URL encodeURIComponent pour gérer les caractères spéciaux
  
//   // attendre la réparation du bug pour activer les boutons 2D et 3D 
//     // pas mis dans la fonction car pas obligatoire (pour le moment)
//   if (BoutonsD == '2D') {
//     url += `&D=2D`;
//   }  //2D ou 3D 
//   else {
//     url += `&D=3D`;
//   }
//   //////// attendre la réparation du bug pour activer les boutons 2D et 3D inutile ? 

//   url += `&layers=${encodeURIComponent(categories)}`; // Ajouter le paramètre de couche à l'URL 
//   // à ajouter : paramêtre multiple pour les catégories


//   // Mettre à jour l'URL sans recharger la page
//   history.pushState({ campus: campus }, campus, url);
//   return url;
// }



// // Sélectionner tous les boutons de campus
// const campusButtons = document.querySelectorAll('.btn.btn-primary');
// const categoriesCase = document.querySelectorAll('.case'); // Sélectionner toutes les cases de catégorie


// // Ajouter un gestionnaire d'événements à chaque bouton de campus + création de lien et mise à jour de l'URL 
// campusButtons.forEach(function(button) {
//   button.addEventListener('click', function(event) {
//     const campusName = event.target.textContent.trim(); // Récupérer le nom du campus à partir du bouton cliqué
//     createLinkAndUpdateURL(campusName); // Passer une chaîne vide pour les catégories car les boutons de campus ne semblent pas concernés par les catégories
//   });
// });
// // cf contentpage et essayer de faire pareil, une fonction 

// // // Ajouter un gestionnaire d'événements à chaque case de catégorie + création de lien et mise à jour de l'URL 
// // categoriesCase.forEach(function(li) { 
// //   li.addEventListener('click', function(event) {
// //     const categorieName = event.target.textContent.trim(); // Récupérer le nom de la catégorie à partir de la case cliquée
// //     createLinkAndUpdateURL(campusName, categorieName); // Passer une chaîne vide pour le campus car les cases de catégorie ne semblent pas concernées par le campus
// //   });
// // });



// // Fonction pour activer le bouton correspondant au nom du campus
// function activateCampusButton(campusName) {
//   const campusButtons = document.querySelectorAll('.btn.btn-primary');
//   campusButtons.forEach(function(button) {
//     if (button.textContent.trim() === campusName) {
//       button.classList.add('active'); // Ajouter la classe active au bouton 

//       // Ajouter la logique pour définir le zoom en fonction du campus
//       if (campusName === 'Mazier') {
//         map.setMaxBounds(mazierBounds);
//         map.flyTo({
//           zoom: zoomBase,
//           center: [-2.7410000, 48.513033]
//         });
//       } else if (campusName === 'Villejean') {
//         map.setMaxBounds(rennesBounds);
//         map.flyTo({
//           zoom: zoomBase,
//           center: [-1.7013, 48.119365]
//         });
//       } else if (campusName === 'La Harpe') {
//         map.setMaxBounds(rennesBounds);
//         map.flyTo({
//           zoom: zoomBase,
//           center: [-1.7091, 48.1254]
//         });
//       }

//     } else {
//       button.classList.remove('active');
//     }
//   });
// }
// // fonction a revoir, redondance de code ??? 


// // Fonction pour obtenir le nom du campus à partir de l'URL
// function getCampusFromURL() {
//   const urlParams = new URLSearchParams(window.location.search); // Récupérer les paramètres de l'URL
//   return urlParams.get('campus'); // Récupérer la valeur du paramètre de campus
// }

// // Lorsque la page se charge, récupérez le nom du campus dans l'URL et activez le bouton correspondant
// document.addEventListener('DOMContentLoaded', function() { // quand l'url est rechargé alors on récupère le campus si il y en a un alors on active le bouton correspondant
//   const campusName = getCampusFromURL();
//   if (campusName) {
//     activateCampusButton(campusName);
//     console.log('Campus:', campusName);
//   }
// });

/////////////////////////// fin du code pour changer de campus /////////////////////////////



// dire que quand y un espace %20
// changer le lien directement dans l'url OK 
// simplification + compréhension du code 



////////////////////////////////// test popup lien /////////////////////////////



/////////////////////////////////// code pour changer de campus /////////////////////////////

// Fonction pour créer une URL avec un paramètre de campus et mettre à jour l'URL de la page
function createLinkAndUpdateURL(objet) {
  let url = `http://127.0.0.1:5500/?`;
  url += `&objet=${encodeURIComponent(objet)}`; 

  // Mettre à jour l'URL sans recharger la page
  history.pushState({ objet: objet }, objet, url);
  return url;
}

// // Appeler la fonction avec le paramètre souhaité
// createLinkAndUpdateURL(objet);

console.log(createLinkAndUpdateURL());


// Sélectionner tous les boutons de popup 
const popupButtons = document.querySelectorAll('.mapboxgl-popup');
const marker = document.querySelectorAll('.marker');

// verifier si les éléments sont présents sur la page 
document.addEventListener('click', () => {

  if (marker.length > 0) {
    console.log("Les éléments marker sont présents sur la page et un clic a été effectué.");
  } else {
    console.log("Les éléments marker ne sont pas présents sur la page.");
  }
});


// verifier si les éléments sont présents sur la page 
document.addEventListener('click', () => {
  const popupButtons = document.querySelectorAll('.mapboxgl-popup');

  if (popupButtons.length > 0) {
    console.log("Les éléments popup sont présents sur la page et un clic a été effectué.");
  } else {
    console.log("Les éléments popup ne sont pas présents sur la page.");
  }
});


// Ajouter un gestionnaire d'événements à chaque bouton de objet
document.addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('mapboxgl-popup')) {
    const objetName = target.querySelector('h1').textContent.trim(); // Récupérer le nom de l'objet à partir du bouton cliqué
    createLinkAndUpdateURL(objetName); 
    console.log('test') // Appeler la fonction pour changer le objet et l'URL
  }
});


// Fonction pour activer le bouton correspondant au nom du campus
function activateCampusButton(campusName) {
  const campusButtons = document.querySelectorAll('.btn.btn-primary');
  campusButtons.forEach(function(button) {
    if (button.textContent.trim() === campusName) {
      button.classList.add('active'); // Ajouter la classe active au bouton 

      // Ajouter la logique pour définir le zoom en fonction du campus
      if (campusName === 'Mazier') {
        map.setMaxBounds(mazierBounds);
        map.flyTo({
          zoom: zoomBase,
          center: [-2.7410000, 48.513033]
        });
      } else if (campusName === 'Villejean') {
        map.setMaxBounds(rennesBounds);
        map.flyTo({
          zoom: zoomBase,
          center: [-1.7013, 48.119365]
        });
      } else if (campusName === 'La Harpe') {
        map.setMaxBounds(rennesBounds);
        map.flyTo({
          zoom: zoomBase,
          center: [-1.7091, 48.1254]
        });
      }

    } else {
      button.classList.remove('active');
    }
  });
}

// Fonction pour obtenir le nom du campus à partir de l'URL
function getCampusFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('campus');
}

// Lorsque la page se charge, récupérez le nom du campus dans l'URL et activez le bouton correspondant
document.addEventListener('DOMContentLoaded', function() {
  const campusName = getCampusFromURL();
  if (campusName) {
    activateCampusButton(campusName);
    console.log('Campus:', campusName);
  }
});

/////////////////////////// fin du code pour changer de campus /////////////////////////////



// IDEE : 
  // faire une selection suivant le type d'élément / création d'une constante 

  ///////////////////////////////////////  Initialisation du fond de carte //////////////////////////////////

  // Adapter le zoom, et la largeur / placement des raccourcis spatiaux en fonction de l'écran
  var device = null;
  var largeurEcran = screen.width
  var zoomBase = 15.8;
  var BoutonsD = document.getElementById("DDD")
  var Bouton2D = document.createElement('button');
  Bouton2D.setAttribute("class", "btn btn-primary");

  //par défaut bouton2D actif
  Bouton2D.classList.add("active");
  Bouton2D.setAttribute("id", "DDButton");
  Bouton2D.innerHTML = '2D';

  //déclaration bouton 3D
  var Bouton3D = document.createElement('button');
  Bouton3D.setAttribute("class", "btn btn-primary");
  Bouton3D.setAttribute("id", "DDDButton");
  Bouton3D.innerHTML = '3D';

  //configuration page selon dimension de la fenetre du navigateur
  if (largeurEcran < 500) {
    device = 'phone';
    document.getElementById('map').style.height = '80vh';
    zoomBase = 14.8;
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
    document.getElementById('campus').style.width = '40%';
    document.getElementById('Villejean').style.width = '33%';
    document.getElementById('LaHarpe').style.width = '33%';
    document.getElementById('Mazier').style.width = '33%';
    document.getElementById('campus').style.marginLeft = '-20%';
  }

  //Limites de vue en fonction du campus visité
  //Villejean / La Harpe
  var rennesBounds = [
    [-1.787293, 48.067191], // Southwest coordinates
    [-1.525772, 48.169255]  // Northeast coordinates
  ];
  
  //Mazier
  var mazierBounds = [
    [-2.810090, 48.488519],
    [-2.668165, 48.534886]
  ];
  
  // Appel du fond de carte
  var map = new maplibregl.Map({
    container: 'map', // container id
    style: 'https://api.maptiler.com/maps/positron/style.json?key='+mapToken, // stylesheet location
    
    center: [-1.7015402487767233, 48.11941846173602], // starting position [lng, lat]
    zoom: zoomBase,
    minZoom: 13, // zoom minimal
    pitch: 0, // inclinaison de base
    maxBounds: rennesBounds,
    attributionControl: false, // starting zoom
    paint: {
      'fill-opacity': 0.2  // Définir l'opacité de remplissage à 80%
      // d'autres propriétés de peinture
    }
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
  
  // Couche salles informatique
  var sallesInfoCount = 0;
  var sallesInfoLink = document.getElementById('Salle informatique');
  var sallesInfoURL = '../css/icons/layers_icons/salle_info_marker.png';
  
  // Couche salles spécifiques
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
  
  // Services commun
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
  // Recherche UFR Langue
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

  // Couche bibliothèques
  var bibliothequesCount = 0; // initialisation du compteur de clics
  var bibliothequesLink = document.getElementById("Bibliothèques");
  var bibliothequesURL = '../css/icons/layers_icons/biblio_marker.png';

  // Couche Lieu culturel
  var lieuCulturelCount = 0; // initialisation du compteur de clics
  var lieuCulturelLink = document.getElementById('Lieux culturels');
  var listelieuCulturel = []; // Création dynamique de la liste des salles à partir du jeu de données
  var insertLieuCulturel = document.getElementById('insertLieuCulturel');
  var lieuCulturelURL = '../css/icons/layers_icons/culture_marker.png';

  // Couche oeuvres d'arts
  var oeuvreArtsCount = 0; // initialisation du compteur de clics
  var oeuvreArtsLink = document.getElementById('Oeuvre');
  var oeuvreArtsURL = '../css/icons/layers_icons/oeuvre_marker.png';

  // Couche équipements sportifs
  var equipementSportifCount = 0; // initialisation du compteur de clics
  var equipementSportifLink = document.getElementById('Equipement sportif');
  var equipementSportifURL = '../css/icons/layers_icons/sport_marker.png';

  // Couche toilettes
  var toilettesCount = 0; // initialisation du compteur de clics
  var toilettesLink = document.getElementById('Toilettes');
  var toilettesURL = '../css/icons/layers_icons/wc_marker.png';

  // Couche copieurs
  var copieurCount = 0; // initialisation du compteur de clics
  var copieurLink = document.getElementById('Copieur');
  var copieursURL = '../css/icons/layers_icons/copieur_marker.png';

  // Couche espace détente
  var espaceDetenteCount = 0; // initialisation du compteur de clics
  var espaceDetenteLink = document.getElementById('Espace détente');
  var espaceDetenteURL = '../css/icons/layers_icons/espacedetente_marker.png';

  // Couche cafeterias
  var cafeteriasCount = 0; // initialisation du compteur de clics
  var cafeteriasLink = document.getElementById('Cafétéria');
  var cafeteriasURL = '../css/icons/layers_icons/cafeteria_marker.png';

  // Couche Micro-ondes
  var microOndesCount = 0; // initialisation du compteur de clics
  var microOndesLink = document.getElementById('Micro-ondes');
  var microOndesURL = '../css/icons/layers_icons/microondes_marker.png';

  // Couche Résidences universitaires
  var resUnivCount = 0; // initialisation du compteur de clics
  var resUnivLink = document.getElementById("Résidence Universitaire");
  var resUnivURL = '../css/icons/layers_icons/resuniv_marker.png';

  // Couche Restaurants universitaires
  var restoUnivCount = 0; // initialisation du compteur de clics
  var restoUnivLink = document.getElementById("Restaurant Universitaire");
  var restoUnivURL = '../css/icons/layers_icons/restauu_marker.png';

  // Couche Associations de filières
  var associationsfilieresCount = 0; // initialisation du compteur de clics
  var associationsfilieresLink = document.getElementById('Associations de filières');
  var associationsfilieresURL = '../css/icons/layers_icons/association_marker.png';

  // Couche Associations de Masters et Doctorats
  var associationsmasterCount = 0; // initialisation du compteur de clics
  var associationsmasterLink = document.getElementById('Associations de Masters et Doctorats');
  var associationsmasterURL = '../css/icons/layers_icons/association_marker2.png';

  // Couche Associations briochines
  var associationsbriochinesCount = 0; // initialisation du compteur de clics
  var associationsbriochinesLink = document.getElementById('Associations briochines');
  var associationsbriochinesURL = '../css/icons/layers_icons/association_marker3.png';

  // Couche Associations culturelles, artistiques et sportives
  var associationscasCount = 0; // initialisation du compteur de clics
  var associationscasLink = document.getElementById('Associations culturelles, artistiques et sportives');
  var associationscasURL = '../css/icons/layers_icons/association_marker4.png';

  // Couche Associations de solidarité et de sensibilisation
  var associationssolidariteCount = 0; // initialisation du compteur de clics
  var associationssolidariteLink = document.getElementById('Associations de solidarité et de sensibilisation');
  var associationssolidariteURL = '../css/icons/layers_icons/association_marker5.png';

  // Couche Associations autres
  var associationsCount = 0; // initialisation du compteur de clics
  var associationsLink = document.getElementById('Autres');
  var associationsURL = '../css/icons/layers_icons/association_marker6.png';

  // Couche ascenseur
  var ascenseurCount = 0; // initialisation du compteur de clics
  var ascenseurLink = document.getElementById('Ascenseur');
  var ascenseurColor = '#1da34a';
  var ascenseurIconSize = [1.5, 13, 2, 22, 60];

  // Couche parking
  var parkingCount = 0; // initialisation du compteur de clics
  var parkingLink = document.getElementById('Parking');
  var parkingURL = '../css/icons/layers_icons/paking_picto.png';

  // Couche parking PMR
  var parkingPMRCount = 0; // initialisation du compteur de clics
  var parkingPMRURL = '../css/icons/layers_icons/parkingH_picto.png';

  // Couche parking vélo
  var parkingVeloCount = 0; // initialisation du compteur de clics
  var parkingVeloLink = document.getElementById("Parking vélo");
  var parkingVeloColor = 'purple';
  var parkingVeloIconSize = [1.5, 13, 2, 22, 60];

  // Couche Pole santé
  var polesanteCount = 0; // initialisation du compteur de clics
  var polesanteLink = document.getElementById('Pole santé');
  var polesanteURL = '../css/icons/layers_icons/sante_marker.png';

  // Lineaire PMR
  var lineairePMRCount = 0; // initialisation du compteur de clics
  var lineairePMRLink = document.getElementById("Cheminements accessibles");
  var lineairePMRColor = '#8D7F5F';
  var lineairePMRType = 'line';

  // Couche Accès PMR
  var accesPMRCount = 0; // initialisation du compteur de clics
  var accesPMRColor = '#8D7F5F';
  var accesPMRIconSize = [1.5, 13, 2, 22, 60];

  // Lineaire Metro
  var lineaireMetroCount = 0; // initialisation du compteur de clics
  var metroLink = document.getElementById("Métro");
  var lineaireMetroColor = 'red';
  var lineaireMetroIconSize = [1.5, 13, 2, 22, 60];
  var lineaireMetroType = 'line';
  
  // Couche arrets metro
  var metroCount = 0; // initialisation du compteur de clics
  var metroColor = 'red';
  var metroIconSize = [1.5, 13, 4, 22, 80];
  var metroURL = '../css/icons/layers_icons/metro_picto.png';
  
  // Couche arrets bus
  var busCount = 0; // initialisation du compteur de clics
  var busColor = 'green';
  var busIconSize = [1.5, 13, 4, 22, 80];
  var busURL = '../css/icons/layers_icons/bus_marker.png';
  
  // Couche vélostar
  var velostarCount = 0; // initialisation du compteur de clics
  var velostarLink = document.getElementById("Station Vélostar");
  var velostarColor = 'green';
  
  // Couche bus
  var busLineCount = 0; // initialisation du compteur de clics
  var busLineLink = document.getElementById("Bus");
  var busLineColor = '#3893F5';

  //// Récupération en continu de l'état des menus des couches suivantes :
  var ServicescenLinkState = null;
  setInterval(function () {
    ServicescenLinkState = ServicescenLink.nextElementSibling.className;
  }, 500);

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
  //////////////////////////////////   Initialisation de de fonctions //////////////////////////////////////

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
  // Fonction pour afficher le référentiel bati 3D
  function getBati3D() {
    if (bati2DCount != 0) {
      map.removeLayer(bati2DId);
      map.removeLayer(bati2DHId);
      map.removeLayer(etiqBati2DId);
    }
    ;
    pictoCount += 1;
    bati3DCount += 1;
    bati3DId = 'bati3DId' + bati3DCount;
    bati3DHId = 'bati3DHId' + bati3DCount;
    etiqBati3DId = 'etiqBati3DId' + bati3DCount;
    map.addSource("bati3D", {
      type: "geojson",
      data: "../data/bati/Bati_3D.geojson"
    });
    map.addLayer({
      id: bati3DId,
      type: "fill-extrusion",
      source: "bati3D",
      paint: {
        'fill-extrusion-color': '#d1d1e0',
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
        'fill-extrusion-color': '#D82B09',
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
    map.on("mousemove", bati3DId, function (e) {
      map.setFilter(bati3DHId, ["==", "Id", e.features[0].properties.Id]);
      var popupTitle = '';
      popupContent = '';
      if (Layers.length == 0) {
        if (e.features[0].properties.Nom !== "null") {
          popupTitle = e.features[0].properties.Nom;
        }
        if (e.features[0].properties.Photo !== "null") {
          popupContent += '<img src = \'' + e.features[0].properties.Photo + '\'/>'
        }
        if (e.features[0].properties.Infos !== "null") {
          popupContent += '<p>' + e.features[0].properties.Infos + '<p>';
        }
        if (popupBati !== null) {
          popupBati.remove();
        }
        ;
        if (e.features[0].properties.Nom !== "null") {
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
    // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
    map.on("mouseleave", bati3DHId, function () {
      map.setFilter(bati3DHId, ["==", "Id", ""]);
      popupBati.remove();
    });
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
    addPictoFondDeCarte()
  }
  ;
  var popupContent = null;
  // Fonction pour afficher le référentiel bati 2D
  function getBati2D() {
    if (bati3DCount != 0) {
      map.removeLayer(bati3DId);
      map.removeLayer(bati3DHId);
      map.removeLayer(etiqBati3DId);
      console.log('bati3DId');
    }
    ;
    pictoCount += 1;
    bati2DCount += 1;
    bati2DId = 'bati2DId' + bati2DCount;
    bati2DHId = 'bati2DHId' + bati2DCount;
    etiqBati2DId = 'etiqBati2DId' + bati2DCount;
    map.addSource("bati2D", {
      type: "geojson",
      data: "../data/bati/Bati_2D.geojson"
    });
    map.addLayer({
      id: bati2DId, // Identifiant de la couche
      type: "fill",
      source: "bati2D",
      paint: {
        'fill-color': '#6A8CC8', // Couleur de remplissage
        'fill-opacity': 0.8
      }
    }, Layers[0]);
    map.addLayer({
      id: bati2DHId,
      type: "fill",
      source: "bati2D",
      filter: ["==", "Id", ""],
      paint: {
        'fill-color': '#D82B09',
        'fill-opacity': 0.5
      }
    }, Layers[0]);
    map.on("mousemove", bati2DId, function (e) {
      map.setFilter(bati2DHId, ["==", "Id", e.features[0].properties.Id]);
      var popupTitle = '';
      popupContent = '';
      if (Layers.length == 0) {
        if (e.features[0].properties.Nom !== "null") {
          popupTitle = e.features[0].properties.Nom;
          //console.log(popupTitle);
        }
        if (e.features[0].properties.Photo !== "null") {
          popupContent += '<img src = \"./' + e.features[0].properties.Photo + '\">' // Affichage de la photo
          //console.log(popupContent)
        }
        if (e.features[0].properties.Info !== "null") {
          popupContent += '<p>' + e.features[0].properties.Info + '<p>';
          
        }
        if (popupBati !== null) {
          popupBati.remove();
        }
        ;
        if (e.features[0].properties.Nom !== "null") {
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

    // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
    map.on("mouseleave", bati2DHId, function () {
      map.setFilter(bati2DHId, ["==", "Id", ""]);
      popupBati.remove();
    });
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
        "text-halo-color": "#FFFFFF", // Couleur du halo du texte
        "text-halo-width": 1, // Largeur du halo du texte


      },
      
      minzoom: 14,
    });
    addPictoFondDeCarte()
  }
  ;
// Fonctions pour zoomer sur l'item sélectionné dans la liste
  function getSwitchPopup() {
    getPopupContent(salleRecherchee);
    popupList = new maplibregl.Popup({
      offset: [0, -45],
      closeButton: false
    })
            .setLngLat(salleRecherchee.geometry.coordinates)
            .setHTML('<h1>' + popupTitle + '</h1><div class="description">' + popupContent + '</div>')
            .addTo(map);
  }
  ;

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
      for (i = 0; i < previousActiveLeaves.length; i++) {
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
      map.flyTo({
        center: [salleRX, salleRY],
        zoom: 16.5,
        pitch: 45,
        speed: 0.6
      });
    } else {
      map.flyTo({
        center: [salleRX, salleRY],
        zoom: 16.5,
        pitch: 0,
        speed: 0.6
      });
    }
    getSwitchPopup();
  }

  function addPictoFondDeCarte() {
    //picto fond de carte
    //Bibliothèque
    map.loadImage("../css/icons/iconfond/biblio.png", function (error, image) {
      if (error)
        throw error;
      if (!map.hasImage("biblio")) {
        map.addImage('biblio', image);
      }
      map.addLayer({
        "id": "biblio" + pictoCount,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": "../data/fondcarte/biblio.geojson"
        },
        "layout": {
          "visibility": 'visible',
          "icon-image": "biblio",
          "icon-size": 0.90
        },
        minzoom: 15.5,
      });
    });

    //Caféteria
    map.loadImage("../css/icons/iconfond/cafe.png", function (error, image) {
      if (error)
        throw error;
      if (!map.hasImage("cafe")) {
        map.addImage('cafe', image);
      }
      map.addLayer({
        "id": "cafeteria" + pictoCount,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": "../data/fondcarte/cafeteria.geojson"
        },
        "layout": {
          "visibility": 'visible',
          "icon-image": "cafe",
          "icon-size": 0.80
        },
        minzoom: 16.5,
      });
    });


    //Restaurant U
    map.loadImage("../css/icons/iconfond/resto.png", function (error, image) {
      if (error)
        throw error;
      if (!map.hasImage("resto")) {
        map.addImage('resto', image);
      }
      map.addLayer({
        "id": "ru" + pictoCount,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": "../data/fondcarte/ru.geojson"
        },
        "layout": {
          "visibility": 'visible',
          "icon-image": "resto",
          "icon-size": 0.80
        },
        minzoom: 15.5,
      });
    });

    //Parking
    map.loadImage("../css/icons/iconfond/parking.png", function (error, image) {
      if (error)
        throw error;
      if (!map.hasImage("parking")) {
        map.addImage('parking', image);
      }
      map.addLayer({
        "id": "parking" + pictoCount,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": "../data/fondcarte/parking.geojson"
        },
        "layout": {
          "visibility": 'visible',
          "icon-image": "parking",
          "icon-size": 0.50
        },
        minzoom: 15,
      });
    });

    //Metro
    map.loadImage("../css/icons/iconfond/metro.png", function (error, image) {
      if (error)
        throw error;
      if (!map.hasImage("metro")) {
        map.addImage('metro', image);
      }
      map.addLayer({
        "id": "metro" + pictoCount,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": "../data/fondcarte/metro.geojson"
        },
        "layout": {
          "visibility": 'visible',
          "icon-image": "metro",
          "icon-size": 0.80
        },
        minzoom: 15,
      });
    });

    //Pôle Sante
    map.loadImage("../css/icons/iconfond/sante.png", function (error, image) {
      if (error)
        throw error;
      if (!map.hasImage("sante")) {
        map.addImage('sante', image);
      }
      map.addLayer({
        "id": "polesante" + pictoCount,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": "../data/fondcarte/polesante.geojson"
        },
        "layout": {
          "visibility": 'visible',
          "icon-image": "sante",
          "icon-size": 0.80
        },
        minzoom: 17,
      });
    });

    //Piscine
    map.loadImage("../css/icons/iconfond/piscine.png", function (error, image) {
      if (error)
        throw error;
      if (!map.hasImage("piscine")) {
        map.addImage('piscine', image);
      }
      map.addLayer({
        "id": "piscine" + pictoCount,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": "../data/fondcarte/piscine.geojson"
        },
        "layout": {
          "visibility": 'visible',
          "icon-image": "piscine",
          "icon-size": 1.00
        },
        minzoom: 15,
      });
    });

    //Bus
    map.loadImage("../css/icons/iconfond/bus.png", function (error, image) {
      if (error)
        throw error;
      if (!map.hasImage("bus")) {
        map.addImage('bus', image);
      }
      map.addLayer({
        "id": "bus" + pictoCount,
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": "../data/fondcarte/bus.geojson"
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
  function addPointOverlay(name, iconSize) {
    var iconURL = '../css/icons/layers_icons/recherche.png'
    var markerOffset = [-15, -20];
    if (iconSize.toString() === '1,13,0.1,25,1.5') {
      markerOffset = [-30, -50];
    } else if (iconSize.toString() === '1,13,0.05,25,1') {
      markerOffset = [-40, -50]
    }
    map.loadImage(iconURL, function (error, image) {
      if (error)
        throw error;
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

  function addCategoryOverlay(htmllink, nomDeLaCouche, ordre, type, colorOrUrl, iconSize, overlayCount, minZoom, maxZoom) {
    ////////// AJOUT DES DONNEES TYPE LINEAIRE ////////////

    if (type == 'line') {
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
        Layers.push(nomDeLaCouche);
        for (var i = 0; i < htmllink.childNodes.length; i++) {
          if (htmllink.childNodes[i].className === "case") {
            htmllink.childNodes[i].classList.add('active');
            break;
          }
        }
        //htmllink.style.backgroundColor = activeLayerBackground;
        htmllink.classList.add('active');
      } else {
        var visibility = map.getLayoutProperty(nomDeLaCouche, 'visibility');
        if (visibility === 'visible') {
          for (var i = 0; i < htmllink.childNodes.length; i++) {
            if (htmllink.childNodes[i].className === "case active") {
              htmllink.childNodes[i].classList.remove('active');
              ;
              break;
            }
          }
          htmllink.classList.remove('active');
          map.setLayoutProperty(nomDeLaCouche, 'visibility', 'none');
          Layers = Layers.filter(item => item != nomDeLaCouche);
          if (etiquette) {
            map.setLayoutProperty(nomDeLaCoucheEtiquette, 'visibility', 'none');
            Layers = Layers.filter(item => item != nomDeLaCoucheEtiquette);
          }
        } else {
          map.setLayoutProperty(nomDeLaCouche, 'visibility', 'visible');
          Layers.push(nomDeLaCouche);

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
      ////////// AJOUT DES DONNEES PONCTUELLES ////////////
    } else {
      var etiquette = false;
      for (var i = 0; i < Etiquette.length; i++) {
        if (Etiquette[i] === nomDeLaCouche) {
          etiquette = true;
          var nomDeLaCoucheEtiquette = nomDeLaCouche + 'etiquette'
        }
      }
      if (overlayCount === 0) {
        ////////// AJOUT DES DONNEES PONCTUELLES (MARKER) ////////////
        if (type == 'marker') {
          var markerOffset = [-13, -17];
          if (iconSize.toString() === '1,13,0.1,25,1.5') {
            markerOffset = [-23, -40];
//	        			console.log(markerOffset)
          } else if (iconSize.toString() === '1,13,0.05,25,1') {
            markerOffset = [-35, -43]
//	        			console.log(markerOffset)

          }

          map.loadImage(colorOrUrl, function (error, image) {
            if (error)
              throw error;
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
          Layers.push(nomDeLaCouche);

          if (etiquette) {
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
            setTimeout(etiqOverlay, 1000);
            Layers.push(nomDeLaCoucheEtiquette);

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
          map.loadImage(colorOrUrl, function (error, image) {
            if (error)
              throw error;
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
            setTimeout(etiqOverlay, 1000);
            Layers.push(nomDeLaCoucheEtiquette);
          }
        }
        Layers.push(nomDeLaCouche);
        if (htmllink.nodeName === 'LI') {
          for (var i = 0; i < htmllink.childNodes.length; i++) {
            if (htmllink.childNodes[i].className === "case") {
              htmllink.childNodes[i].classList.add('active');
            }
          }
          htmllink.classList.add('active');
        }

        if (htmllink.nodeName === 'A') {
          htmllink.classList.add('active');
          htmllink.parentElement.classList.add('active');
        }
      } else {
        function hideLayer(nomDeLaCouche, htmllink) {
          if (htmllink.nodeName === 'LI') {
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
          Layers = Layers.filter(item => item != nomDeLaCouche);
          if (popup) {
            popup.remove();
          }
          if (popupList) {
            popupList.remove();
          }
          if (etiquette) {
            map.setLayoutProperty(nomDeLaCoucheEtiquette, 'visibility', 'none');
            Layers = Layers.filter(item => item != nomDeLaCoucheEtiquette);
            if (popup) {
              popup.remove();
            }
          }
        }

        function showLayer(nomDeLaCouche, htmllink) {
          map.setLayoutProperty(nomDeLaCouche, 'visibility', 'visible');

          map.moveLayer(nomDeLaCouche, 0)
          Layers.push(nomDeLaCouche);
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

          if (etiquette) {
            map.setLayoutProperty(nomDeLaCoucheEtiquette, 'visibility', 'visible');
            Layers.push(nomDeLaCoucheEtiquette);
            map.moveLayer(nomDeLaCoucheEtiquette, 0);
          }
        }

        var visibility = map.getLayoutProperty(nomDeLaCouche, 'visibility');

        if (visibility === 'visible') {
          if (listLayers.includes(htmllink)) {
            if (ordre !== "nav nav-third-level collapse") {
              hideLayer(nomDeLaCouche, htmllink);
            }
          } else {
            hideLayer(nomDeLaCouche, htmllink);
          }
        } else {
          showLayer(nomDeLaCouche, htmllink);
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

  var popupTitle = null;
  var popupContent = [];
  function getPopupContent(feature) {
    popupTitle = null;
    popupContent = [];
    //Titre de la popup
    if (feature.properties.Categorie !== "null" && feature.properties.Categorie !== null && feature.properties.Categorie !== "") {
      popupTitle = feature.properties.Categorie;
    }
    if (feature.properties.Nom !== "null" && feature.properties.Nom !== null && feature.properties.Nom !== "") {
      popupTitle = feature.properties.Nom;
    }
    // Contenu de la popup
//        console.log(feature.properties.Batiment)
    if (feature.properties.Batiment !== "null" && feature.properties.Batiment !== null && feature.properties.Batiment !== "") {
      popupContent += '<p>Bâtiment ' + feature.properties.Batiment ;
    }
    if (feature.properties.Niveau !== "null" && feature.properties.Niveau !== null && feature.properties.Niveau !== "") {
      if (feature.properties.Batiment !== "null" && feature.properties.Batiment !== null && feature.properties.Batiment !== "") {
        popupContent += ', niveau ' + feature.properties.Niveau ;
      }
      else {
        popupContent += '<p>niveau ' + feature.properties.Niveau ;
      }
    }
    if ((feature.properties.Batiment !== "null" && feature.properties.Batiment !== null && feature.properties.Batiment !== "")
    || (feature.properties.Niveau !== "null" && feature.properties.Niveau !== null && feature.properties.Niveau !== "")) {
      popupContent += '</p>';
    }
    if (feature.properties.Capacite !== "null" && feature.properties.Capacite !== null && feature.properties.Capacite !== "") {
      popupContent += '<p>' + feature.properties.Capacite + '<p>';
    }
    if (feature.properties.Info !== "null" && feature.properties.Info !== null && feature.properties.Info !== "") {
      popupContent += '<p>' + feature.properties.Info + '<p>';
    }
    if (feature.properties.Lien !== "null" && feature.properties.Lien !== null && feature.properties.Lien !== "") {
      if (feature.properties.Categorie == 'Oeuvre') {
        popupContent += '<p><a href =" ' + feature.properties.Lien + '" target=\"_blank\">Explorer la storymap</a></p>';
      }
      else {
        popupContent += '<p><a href =" ' + feature.properties.Lien + '" target=\"_blank\">Site internet</a></p>';
      }
    }
    if (feature.properties.Mail !== "null" && feature.properties.Mail !== null && feature.properties.Mail !== "") {
      popupContent += '<p>Contacter par mail : <a href="mailto:' + feature.properties.Mail + '">'+feature.properties.Mail+'</a></p>';
    }
    if (feature.properties.Tel !== "null" && feature.properties.Tel !== null && feature.properties.Tel !== "") {
      popupContent += '<p>Contacter par téléphone : <a href="tel:' + feature.properties.Tel + '">'+feature.properties.Tel+'</a></p>';
    }
    if (feature.properties.Image !== "null" && feature.properties.Image !== null && feature.properties.Image !== "") {
      if (feature.properties.Categorie == 'Département de formation') {
        popupTitle += '<img style = \'height : 60px; position : absolute; right : 0;top:0\' src = \'' + feature.properties.Image + '\'/>'
      }
      else if (feature.properties.Categorie == 'Oeuvre') {
        popupContent += '<img style = \'height : auto; width : 96%; margin-left:2%; margin-right:2%; margin-bottom: 4px;\' src = \'' + feature.properties.Image + '\'/>'
      }
      else {
        popupContent += '<img style = \'height : 60px; left : 50%\' src = \'' + feature.properties.Image + '\'/>'
      }
    }
  }


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

    });
  }


  var salleRecherchee = null;
  function createHTMLList(categorie, listeDeNoms, elementCible, overlayCount) {
    salleRecherchee = null;

    var listeLink = [];
    elLink = null
    elList = null
    if (overlayCount == 0) {
      var data = fproperties.filter(function (e) {
        return e.Categorie === categorie;
      })
      for (i = 0; i < data.length; i++) {
        listeDeNoms.push(data[i]['Nom']);
      }
      for (i = 0; i < listeDeNoms.length; i++) {
        currentName = listeDeNoms[i].split("'").join("!");
        elList = document.createElement('li');
        elementCible.appendChild(elList);
        elLink = document.createElement('a');
        elLink.innerHTML = listeDeNoms[i];
        elLink.setAttribute('id', listeDeNoms[i]);
        elLink.setAttribute('href', '#');
        elLink.classList.add('leaf');
        var theFunction = 'switchPOI(' + '\'' + currentName + '\');return false;'
        //          elLink.setAttribute('href',theFunction);
        elLink.setAttribute('onclick', theFunction);
        elList.appendChild(elLink);
      }
      for (i = 0; i < listeDeNoms.length; i++) {
        listeLink.push(document.getElementById(listeDeNoms[i]))
      }
    }
  }

//////////////////////////////////   Interactivité menus //////////////////////////////////////
  // ZOOMS sur les campus
  var flyingZoom = 15.8;
  if (device = 'phone') {
    flyingZoom = 15
  }
  ;
  var zoomLaHarpe = document.getElementById("LaHarpe")
  zoomLaHarpe.addEventListener('click', function () {
    map.setMaxBounds(rennesBounds);
    map.flyTo({
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
    map.flyTo({
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
    map.flyTo({
      zoom: zoomBase,
      center: [-2.7410000, 48.513033]
    });
    zoomMazier.classList.add('active');
    zoomVillejean.classList.remove('active');
    zoomLaHarpe.classList.remove('active');
  });
//////////////////////////////////   Initialisation des données carte //////////////////////////////////////
  var POIBrut = (function () {
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "../data/points.geojson",
      'dataType': "json",
      'success': function (data) {
        json = data;
      }
    });
    return json;
  })();
  var POI = [];
  POI = POIBrut.features;

  var fproperties = POIBrut.features.map(function (el) {
    return el.properties;
  });

  var lines = (function () {
    var jsonLines = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "../data/lineaire.geojson",
      'dataType': "json",
      'success': function (data) {
        jsonLines = data;
      }
    });
    return jsonLines;
  })();


  map.on("load", function () {
    // Couche herbe
    map.addLayer({
      id: "Herbe",
      type: "fill",
      source: {
        type: "geojson",
        data: "../data/habillage/grass.geojson"
      },
      paint: {
        'fill-color': '#9FE19C', // #F8E7CE beige 
        'fill-opacity': 1
      }
    });

    // Couche référentiel bati 2D
    getBati2D();

    // Couche piste athletisme
    map.addLayer({
      id: "Piste d'athlétisme Villejean",
      type: "fill",
      source: {
        type: "geojson",
        data: "../data/habillage/piste_athle.geojson"
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
        data: "../data/habillage/terrain_football.geojson"
      },
      "paint": {
        'line-color': '#FFFFFF',
        'line-width': {'base': 1.2, 'stops': [[13, 0.5], [22, 3]]}
      }
    });



//////////////////////////////////   OVERLAYS //////////////////////////////////////

//////////////////////////////////  Groupe Amphis et salles spécifiques //////////////////////////////////////

    if (overlayPoint) {
      getSearchedItem(overlayPoint);
    }

    if (overlay == 'Amphithéâtre') {
      addCategoryOverlay(amphitheatresLink, 'Amphithéâtre', 'layer', 'marker', amphiURL, tailleMarker, amphiCount);
      amphiCount += 1;
    }
    amphitheatresLink.onclick = function (e) {
      addCategoryOverlay(amphitheatresLink, 'Amphithéâtre', 'layer', 'marker', amphiURL, tailleMarker, amphiCount);
      amphiCount += 1;
    }

    if (overlay == 'Salle informatique') {
      addCategoryOverlay(sallesInfoLink, 'Salle informatique', 'layer', 'marker', sallesInfoURL, tailleMarker, sallesInfoCount);
      sallesInfoCount += 1;
    }
    sallesInfoLink.onclick = function (e) {
      addCategoryOverlay(sallesInfoLink, 'Salle informatique', 'layer', 'marker', sallesInfoURL, tailleMarker, sallesInfoCount);
      sallesInfoCount += 1;
    }

    if (overlay == 'Salles spécifiques') {
      addCategoryOverlay(sallesSpecifiquesLink, 'Salles spécifiques', sallesSpeLinkState, 'marker', sallesSpeURL, tailleMarker, sallesSpeCount);
      if (sallesSpeCount == 0) {
        createHTMLList('Salles spécifiques', listeSallesSpecifiques, insertSallesSpecifiques, sallesSpeCount);
      }
      sallesSpeCount += 1;
    }
    sallesSpecifiquesLink.onclick = function (e) {
      addCategoryOverlay(sallesSpecifiquesLink, 'Salles spécifiques', sallesSpeLinkState, 'marker', sallesSpeURL, tailleMarker, sallesSpeCount);
      if (sallesSpeCount == 0) {
        createHTMLList('Salles spécifiques', listeSallesSpecifiques, insertSallesSpecifiques, sallesSpeCount);
      }
      sallesSpeCount += 1;
    }

//////////////////////////////////  Structures et services //////////////////////////////////////

    if (overlay == 'Services communs') {
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

    if (overlay == 'Services généraux') {
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


    if (overlay == 'Services centraux') {
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
    if (overlay == 'Formation UFRL') {
      addCategoryOverlay(FUFRLLink, 'Formation UFRL', FUFRLLinkState, 'marker', FUFRLURL, tailleMarker, FUFRLCount);
      if (FUFRLCount == 0) {
        createHTMLList('Formation UFRL', listeFUFRL, insertFUFRL, FUFRLCount);
      }
      FUFRLCount += 1;
    }
    //////////////////////////////////  Formation et recherche //////////////////////////////////////
    FUFRLLink.onclick = function (e) {
      addCategoryOverlay(FUFRLLink, 'Formation UFRL', FUFRLLinkState, 'marker', FUFRLURL, tailleMarker, FUFRLCount);
      if (FUFRLCount == 0) {
        createHTMLList('Formation UFRL', listeFUFRL, insertFUFRL, FUFRLCount);
      }
      FUFRLCount += 1;
    }
    if (overlay == 'Formation UFRSH') {
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
    if (overlay == 'Formation UFRSS') {
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
    if (overlay == 'Formation UFRSTAPS') {
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
    if (overlay == 'Formation UFRALC') {
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
    if (overlay == 'Autres Formations') {
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
    if (overlay == 'Recherche UFRL') {
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
    if (overlay == 'Recherche UFRSH') {
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
    if (overlay == 'Recherche UFRSS') {
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
    if (overlay == 'Recherche UFRSTAPS') {
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
    if (overlay == 'Recherche UFRALC') {
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
    if (overlay == 'Lieux culturels') {
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

    if (overlay == 'Bibliothèques') {
      addCategoryOverlay(bibliothequesLink, 'Bibliothèques', 'layer', 'marker', bibliothequesURL, tailleMarker, bibliothequesCount);
      bibliothequesCount += 1;
    }
    bibliothequesLink.onclick = function (e) {
      addCategoryOverlay(bibliothequesLink, 'Bibliothèques', 'layer', 'marker', bibliothequesURL, tailleMarker, bibliothequesCount);
      bibliothequesCount += 1;
    }
    if (overlay == 'Oeuvre') {
      addCategoryOverlay(oeuvreArtsLink, 'Oeuvre', 'layer', 'marker', oeuvreArtsURL, tailleMarker, oeuvreArtsCount);
      oeuvreArtsCount += 1;
    }
    oeuvreArtsLink.onclick = function (e) {
      addCategoryOverlay(oeuvreArtsLink, 'Oeuvre', 'layer', 'marker', oeuvreArtsURL, tailleMarker, oeuvreArtsCount);
      oeuvreArtsCount += 1;
    }

////////////////////////////////// Restauration et logement //////////////////////////////////////
    if (overlay == 'Résidence Universitaire') {
      addCategoryOverlay(resUnivLink, 'Résidence Universitaire', 'layer', 'marker', resUnivURL, tailleMarker, resUnivCount);
      resUnivCount += 1;
    }
    resUnivLink.onclick = function (e) {
      addCategoryOverlay(resUnivLink, 'Résidence Universitaire', 'layer', 'marker', resUnivURL, tailleMarker, resUnivCount);
      resUnivCount += 1;
    }

    if (overlay == 'Restaurant Universitaire') {
      addCategoryOverlay(restoUnivLink, 'Restaurant Universitaire', 'layer', 'marker', restoUnivURL, tailleMarker, restoUnivCount);
      restoUnivCount += 1;
    }
    restoUnivLink.onclick = function (e) {
      addCategoryOverlay(restoUnivLink, 'Restaurant Universitaire', 'layer', 'marker', restoUnivURL, tailleMarker, restoUnivCount);
      restoUnivCount += 1;
    }

    if (overlay == 'Cafétéria') {
      addCategoryOverlay(cafeteriasLink, 'Cafétéria', 'layer', 'marker', cafeteriasURL, taillePetitMarker, cafeteriasCount);
      cafeteriasCount += 1;
    }
    cafeteriasLink.onclick = function (e) {
      addCategoryOverlay(cafeteriasLink, 'Cafétéria', 'layer', 'marker', cafeteriasURL, taillePetitMarker, cafeteriasCount);
      cafeteriasCount += 1;
    }

    if (overlay == 'Micro-ondes') {
      addCategoryOverlay(microOndesLink, 'Micro-ondes', 'layer', 'marker', microOndesURL, taillePetitMarker, microOndesCount);
      microOndesCount += 1;
    }
    microOndesLink.onclick = function (e) {
      addCategoryOverlay(microOndesLink, 'Micro-ondes', 'layer', 'marker', microOndesURL, taillePetitMarker, microOndesCount);
      microOndesCount += 1;
    }

//////////////////////////////////  Sport et santé //////////////////////////////////////
    if (overlay == 'Equipement sportif') {
      addCategoryOverlay(equipementSportifLink, 'Equipement sportif', 'layer', 'marker', equipementSportifURL, tailleMarker, equipementSportifCount);
      equipementSportifCount += 1;
    }
    equipementSportifLink.onclick = function (e) {
      addCategoryOverlay(equipementSportifLink, 'Equipement sportif', 'layer', 'marker', equipementSportifURL, tailleMarker, equipementSportifCount);
      equipementSportifCount += 1;
    }

    if (overlay == 'Pole santé') {
      addCategoryOverlay(polesanteLink, 'Pole santé', 'layer', 'marker', polesanteURL, tailleMarker, polesanteCount);
      polesanteCount += 1;
    }
    polesanteLink.onclick = function (e) {
      addCategoryOverlay(polesanteLink, 'Pole santé', 'layer', 'marker', polesanteURL, tailleMarker, polesanteCount);
      polesanteCount += 1;
    }


//////////////////////////////////  Vie associative ///////////////////////////////////////


    associationsfilieresLink.onclick = function (e) {
      addCategoryOverlay(associationsfilieresLink, 'Associations de filières', 'layer', 'marker', associationsfilieresURL, taillePetitMarker, associationsfilieresCount);
      associationsfilieresCount += 1;
    }
    associationsmasterLink.onclick = function (e) {
      addCategoryOverlay(associationsmasterLink, 'Associations de Masters et Doctorats', 'layer', 'marker', associationsmasterURL, taillePetitMarker, associationsmasterCount);
      associationsmasterCount += 1;
    }
    associationsbriochinesLink.onclick = function (e) {
      addCategoryOverlay(associationsbriochinesLink, 'Associations briochines', 'layer', 'marker', associationsbriochinesURL, taillePetitMarker, associationsbriochinesCount);
      associationsbriochinesCount += 1;
      for (var i = 0; i < Layers.length; i++) {
        if (Layers[i] = 'Associations briochines') {
          map.setMaxBounds(mazierBounds);
          map.flyTo({
            center: [-2.7410000, 48.513033],
            zoom: 16.5,
            pitch: 0,
            speed: 0.6
          });
          zoomMazier.classList.add('active');
          zoomVillejean.classList.remove('active');
          zoomLaHarpe.classList.remove('active');
        }
      }
    }
    associationscasLink.onclick = function (e) {
      addCategoryOverlay(associationscasLink, 'Associations culturelles, artistiques et sportives', 'layer', 'marker', associationscasURL, taillePetitMarker, associationscasCount);
      associationscasCount += 1;
    }
    associationssolidariteLink.onclick = function (e) {
      addCategoryOverlay(associationssolidariteLink, 'Associations de solidarité et de sensibilisation', 'layer', 'marker', associationssolidariteURL, taillePetitMarker, associationssolidariteCount);
      associationssolidariteCount += 1;
    }
    associationsLink.onclick = function (e) {
      addCategoryOverlay(associationsLink, 'Autres', 'layer', 'marker', associationsURL, taillePetitMarker, associationsCount);
      associationsCount += 1;
    }

//////////////////////////////////  Divers ///////////////////////////////////////

    copieurLink.onclick = function (e) {
      addCategoryOverlay(copieurLink, 'Copieur', 'layer', 'marker', copieursURL, tailleMarker, copieurCount);
      copieurCount += 1;
    }
    espaceDetenteLink.onclick = function (e) {
      addCategoryOverlay(espaceDetenteLink, 'Espace détente', 'layer', 'marker', espaceDetenteURL, tailleMarker, espaceDetenteCount);
      espaceDetenteCount += 1;
    }

//////////////////////////////////  Mobilité et accessibilité ///////////////////////////////////////

    ascenseurLink.onclick = function (e) {
      addCategoryOverlay(ascenseurLink, 'Ascenseur', 'layer', 'point', ascenseurColor, ascenseurIconSize, ascenseurCount);
      ascenseurCount += 1;
    }
    parkingLink.onclick = function (e) {
      addCategoryOverlay(parkingLink, 'Parking', 'layer', 'picto', parkingURL, taillePicto, parkingCount);
      parkingCount += 1;
      addCategoryOverlay(parkingLink, 'Parking PMR', 'layer', 'picto', parkingPMRURL, taillePicto, parkingPMRCount);
      parkingPMRCount += 1;
    }


    parkingVeloLink.onclick = function (e) {
      addCategoryOverlay(parkingVeloLink, 'Parking vélo', 'layer', 'point', parkingVeloColor, parkingVeloIconSize, parkingVeloCount);
      parkingVeloCount += 1;
    }
    lineairePMRLink.onclick = function (e) {
      addCategoryOverlay(lineairePMRLink, 'Cheminements accessibles', 'layer', 'line', lineairePMRColor, tailleLine, lineairePMRCount);
      lineairePMRCount += 1;
      addCategoryOverlay(lineairePMRLink, 'Accès PMR', 'layer', 'point', accesPMRColor, accesPMRIconSize, accesPMRCount);
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
      setInterval(addRealTimeVelostar(), 1000);
    }
    busLink.onclick = function (e) {
      addCategoryOverlay(busLink, 'Cheminements Bus', 'layer', 'line', busLineColor, tailleLine, busLineCount);
      busLineCount += 1;
      addCategoryOverlay(busLink, 'Bus', 'layer', 'picto', busURL, taillePicto, busCount);
      busCount += 1;
      addRealTimeBus();
    }
  });
//////////////////////////////////// couches temps réel //////////////////////////////////////////////
// Velostar
  var geojsonVelos = null;
  var previousDataVelos = {times: [], stations: []};
  var prevInfo = null;
  var velostarTRCount = 0
  var nomLayer = null
  var velostarLink = document.getElementById('Station Vélostar');
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
          dataType: "jsonp",
          crossDomain: true,

          //Méthode appelée lorsque le téléchargement a fonctionné
          success: function (geojson) {
//                    console.log("Données téléchargées");
            geojsonVelos = geojson;
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
        geojsonVelos.features.forEach(f => {
          stations[f.properties.nom] = f.properties;

          //On compare avec le nombre de vélos précédent
          if (previousDataVelos.stations.length > 0) {
            f.properties.diff = f.properties.nombrevelosdisponibles - previousDataVelos.stations[previousDataVelos.stations.length - 1][f.properties.nom].nombrevelosdisponibles;
          } else {
            f.properties.diff = 0;
          }

          //On met à jour l'affichage des infos si besoin
          if (prevInfo && prevInfo === f.properties.nom) {
            prevStationData = f;
          }
        });

        previousDataVelos.times.push(Date.now());
        previousDataVelos.stations.push(stations);
        Layers = Layers.filter(item => item != "bikes" + (previousDataVelos.times.length - 1));
      }
      function showBikeData() {
        //On supprime les données précédentes
        if (previousDataVelos.times.length > 1) {
          map.removeLayer("bikes" + (previousDataVelos.times.length - 1));
        }

        //On créé un nouveau calque de données
        nomLayer = "bikes" + previousDataVelos.times.length;
        Layers.push(nomLayer);
        map.addLayer({
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
    } else {
      var clickedLayer = this.textContent;

      var visibility = map.getLayoutProperty(nomLayer, 'visibility');
      if (visibility === 'visible') {
//        	console.log("hey")
        map.setLayoutProperty(nomLayer, 'visibility', 'none');
        Layers = Layers.filter(item => item != nomLayer);
      } else {
        map.setLayoutProperty(nomLayer, 'visibility', 'visible');
        Layers.push(nomLayer);
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

// Couche des BUS
  var geojsonBus = null;
  var previousDataBus = {times: [], stations: []};
  var prevInfo = null;
  var busTRCount = 0
  var nomLayerBus = null
  var busLink = document.getElementById('Bus');
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

//////////////////////////////////  Barre de recherche //////////////////////////////////////

  // initialisation des popup
  var searchPopup = null
  var jproperties = fproperties.filter(function (e) {
    return e.Nom !== null;
  })
  // Récupération des propriétés du json
  var searchValue = null;
  var searchItem = [];
  var searchX = null;
  var searchY = null;
  var searchLayerCount = 0;
  var searchLayerId = 'SearchResult';
  var searchPopup = null
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
  $("#searchfield").easyAutocomplete(options);

  function getSearchPopup() {
    var popupTitle = searchItem.properties.Nom;
    var popupContent = '';

    if (searchItem.properties.Batiment != null) {
      popupContent += '<p>Bâtiment ' + searchItem.properties.Batiment;
    }
    ;
    if (searchItem.properties.Niveau != null) {
      if (searchItem.properties.Batiment != null){
        popupContent += ', niveau ' + searchItem.properties.Niveau ;
      }
      else {
      popupContent += '<p>Niveau ' + searchItem.properties.Niveau ;
      }
    }
    if (searchItem.properties.Batiment != null || searchItem.properties.Niveau != null){
      popupContent += '</p>';
    }
    ;
    if (searchItem.properties.Info != null) {
      popupContent += '<p>' + searchItem.properties.Info + '<p>';
    }
    ;
    if (searchItem.properties.Capacite != null) {
      popupContent += '<p>' + searchItem.properties.Capacite + '<p>';
    }
    ;
    if (searchItem.properties.Lien != null) {
      popupContent += '<p><a href="' + searchItem.properties.Lien + '" target=\"_blank\">Site internet</a></p>';
    }
    ;
    if (searchItem.properties.Mail != null) {
      popupContent += '<p>Contacter par mail : <a href="maito:' + searchItem.properties.Mail + '">'+searchItem.properties.Mail+'</a></p>';
    }
    ;
    if (searchItem.properties.Tel != null) {
      popupContent += '<p>Contacter par téléphone : <a href="tel:' + searchItem.properties.Tel + '">'+searchItem.properties.Tel+ '</a></p>';
    }
    ;
    if (searchItem.properties.Image != null) {
      if (searchItem.properties.Categorie == 'Département de formation') {
        popupTitle += '<img style = \'height : 60px ; position : absolute ; right : 0\' src = \'' + searchItem.properties.Image + '\'/>';
      } else {
        popupContent += '<img style = \'height : 50px\' src = \'' + searchItem.properties.Image + '\'/>';
      }
    }
    ;
    searchPopup = new maplibregl.Popup({
      offset: [0, -45],
      closeButton: false
    })
            .setLngLat(searchItem.geometry.coordinates)
            .setHTML('<h1>' + popupTitle + '</h1><div class="description">' + popupContent + '</div>')
            .addTo(map);
  }
  ;
  var searchBarCrossPresence = null;
  function getSearchedItem(item) {


    if (searchValue !== null) {
      searchValue = null
      searchItem = [];
      searchX = null;
      searchY = null;
      Layers = Layers.filter(item => item != searchLayerId);
      searchLayerCount += 1;
      searchPopup.remove();
      map.removeLayer(searchLayerId)
      searchLayerId = 'searchResult' + searchLayerCount;
    }
    ;
    if (item) {
      searchValue = item;
    } else {
      searchValue = document.getElementById("searchfield").value;
    }
    for (var i = 0; i < POI.length; i++) {
      if (POI[i].properties.Nom === searchValue) {
        searchItem = POI[i];



        map.loadImage('../css/icons/layers_icons/recherche.png', function (error, image) {
          if (error)
            throw error;
          map.addImage(searchLayerId + 'image', image);
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
        map.on('mousemove', function (e) {
          var features = map.queryRenderedFeatures(e.point, {layers: Layers});
          map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
        });
        searchX = searchItem.geometry.coordinates[0];
        searchY = searchItem.geometry.coordinates[1];
        if (POI[i].properties.Campus === 'Mazier') {
          map.setMaxBounds(mazierBounds);
          zoomVillejean.classList.remove('active');
          zoomMazier.classList.add('active');
          zoomLaHarpe.classList.remove('active');
        }
        if (POI[i].properties.Campus === 'Villejean') {
          map.setMaxBounds(rennesBounds);
          zoomVillejean.classList.add('active');
          zoomMazier.classList.remove('active');
          zoomLaHarpe.classList.remove('active');
        }
        if (POI[i].properties.Campus === 'La Harpe') {
          map.setMaxBounds(rennesBounds);
          zoomVillejean.classList.remove('active');
          zoomMazier.classList.remove('active');
          zoomLaHarpe.classList.add('active');
        }
        if (DDD) {
          map.flyTo({
            center: [searchX, searchY],
            zoom: 16.5,
            pitch: 45,
            speed: 0.6
          });
        } else {
          map.flyTo({
            center: [searchX, searchY],
            zoom: 16.5,
            pitch: 0,
            speed: 0.6
          });
        }
        getSearchPopup();
        map.on('click', function (e) {
          if (searchPopup.isOpen() == true) {
            searchPopup.remove();

          }
        })
      }
    }
  }



//////////////////////////////////   3D   //////////////////////////////////////
  DDButton = document.getElementById('DDButton'); // Bouton pour passer en 2D
  DDDButton = document.getElementById('DDDButton'); // Bouton pour passer en 3D
  DDD = false; // Variable pour savoir si on est en 3D ou non

  DDDButton.addEventListener('click', function () { // Action du bouton 3D
    var X = map.getCenter()["lng"];
    var Y = map.getCenter()["lat"];
    var currentZoom = map.getZoom()
    if (DDD === false) {
      Y = Y - 0.00021;
      getBati3D();
      zoomCible = currentZoom + 0.5;
      map.flyTo({
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
      map.flyTo({
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
  var searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', function (e) {
    if (searchBarCrossPresence == null) {
      searchBarCrossPresence = 'yes';
      $(searchButton).addClass('off');
      getSearchedItem();
    }
    else {
        Layers = Layers.filter(item => item != searchLayerId);
        console.log(searchLayerId);
        map.removeLayer(searchLayerId);
        searchPopup.remove();
        searchBarCrossPresence = null;
        $("#searchfield").val("");
        $(searchButton).removeClass('off');
    }
  });


  var searchfield = document.getElementById('searchfield');
  searchButton.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
      getSearchedItem();
    }
  });

// Supression des filtres
  $("#btnRemovefilters").on("click", function () {
    $('ul.nav li:not(.sidebar-search,.sidebar-remove-filters), ul.nav li:not(.sidebar-search,.sidebar-remove-filters) a ').each(function (i) {
      if ($(this).attr('id')) {
        var removelayer = $(this).attr('id');
        if (map.getLayer(removelayer)) {
          var visibility = map.getLayoutProperty(removelayer, 'visibility');
          if (visibility != "none") {
            if (Layers.includes(removelayer)) {
              var element = $("[id='" + removelayer + "']");
              if (!element.next('ul').hasClass("in"))
                element.next('ul').addClass("in");
              if (listLayers.includes(element.get(0))) {
                var index = $.inArray(element.get(0), listLayers);
                if (index > -1) {
                  listLayers.splice(index, 1);
                }
              }
              element.trigger("click");
              if (element.next('ul').hasClass("in"))
                element.next('ul').removeClass("in");
              if (element.parent().hasClass("active"))
                element.parent().removeClass("active");
            }
          }
        }
      }
    });

    $('ul.nav li.active a.active').each(function (i) {
      if ($(this).hasClass("active"))
        $(this).removeClass("active");
    });
    $('ul.nav li.active:not(.sidebar-search,.sidebar-remove-filters), ul.nav li.active:not(.sidebar-search,.sidebar-remove-filters) ul.in ').each(function (i) {
      if ($(this).hasClass("active"))
        $(this).removeClass("active");
      if ($(this).hasClass("in"))
        $(this).removeClass("in");
    });

  });
})(jQuery);
