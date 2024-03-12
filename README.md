# atelier-sigat-plan-campus-R2
Ce dépôt contient les fichiers et codes nécéssaires pour l'accomplissement de l'atelier du plan interactif de l'université Rennes 2 en partenariat avec le master SIGAT (promo 2023-2024)

Dans un premier temps, le code initial est pris en main et modifié pour gérer l'affichage correctement :
1) correction des accès aux fichiers (../ , ./, /). Cela permet l'affichage des fichiers styles
2) création d'un module token et import du module dans la fichier plan.js. Cela permet l'affichage du fond de plan et une mise à jour facilité de la clé
3) ajout de "var" devant des variables non-déclarées (plan.js)
4) aération du code HTML


Point Hadrien Pavie - 15/02 - éléments
1) Visionneuse - Mabox GL JS ou Malibre GL JS
2) Fournisseurs tuiles - Maptiler / Mapbox / Maps
3) Données R2

> Campus Rennes & Saint Brieuc
10-20 tuiles
> geojson.io (éditeur web permet de modifier du code geojson en mode interactif)

Les issues en status "wontfix" ne seront pas traitées en tout cas pas pour le moment.
Il s'agit soit d'amélioration du code (mais qui ne bloque pas son fonctionnement en l'état actuel),
soit de bugs identifiés, mais qui seront corrigé via les modifications prévues du code (réagencement, nouvelle sidebar, etc).
