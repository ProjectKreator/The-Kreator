# The-Kreator-II
====================
GUIDE D'INSTALLATION
====================

Deux actions sont nécessaires pour faire fonctionner l'application Kreator :
	- Créer, sur les différentes APIs, les applications qu'utilisera Kreator ;
	- Configurer le fichier de settings de l'application

La personne procédant à l'installation doit avoir des drois d'accès d'administrateur sur :
	- Les organisations gitHub
	- Le nom de domaine google
	- Trello

I - Création des applications

	1 - API GitHub

- Se connecter à GitHub sur la page des settings de l'organisation (sur la dernière case à droite du bandeau de navigation, "settings" puis le nom de l'organisation dans le menu de gauche)
- Cliquer sur "Oauth applications"
- Cliquer sur "register new application"
- Choisir un nom d'application, l'URL de l'application (http://www.example.com), éventuellement une description
- Dans Authorization callback URL, renseigner "http://www.example.com/github" et créer l'application
- Noter le client id et le client secret, ils seront nécessaires pour configurer l'application.

	2 - API Google

- Se connecter sur https://console.developers.google.com avec des identifiants d'administration
- Créer un projet avec le nom souhaité
- Sur le tableau de bord du projet, cliquer sur Activer et gérer des API (cadre bleu)
- Activer l'API Admin SDK
- Créer des identifiants
	. L'API est appelée depuis un serveur web
	. Accède aux données utilisateur
	. Dans origines JavaScript autorisées, renseigner l'URL de l'application (http://www.example.com)
	. Dans URI de redirection autorisées, renseigner : "http://www.example.com/google" ET "http://www.example.com/_oauth/google"
	. Configurer l'écran d'autorisation Oauth2
- A la fin, Google fournit un ID client et un code secret, qui seront nécessaires pour la configuration du Kreator

NB : ces opérations ne sont pas réalisables si la console n'a pas été autorisée. Vérifiez sur "admin.google.com -> applications -> autres services google" que "Google Developers Console" est bien activée.

	3 - API Trello

- Se connecter sur http://trello.com/app-key avec un compte qui a des droits d'administration et noter la clef affichée. Contrairement à GitHub et Google, les API sont personnelles et ne peuvent pas dépendre d'une organisation.

II - Configuration du fichier settings
Le fichier settings est un json renfermant toutes les configurations de l'application. Il est séparé en deux parties : la partie "public", qui est accessible par les clients, et le reste, qui n'est accessible que par le serveur. Lors de la configuration, il est donc nécessaire, pour chaque application, de modifier la partie publique et la partie qui n'est pas publique pour ne pas oublier de réglages.

	1 - API GitHub
- Dans la partie publique : renseigner le client ID précédemment obtenu, ainsi que le nom de l'organisation qui détient l'application
- Dans la partie non publique : renseigner le client secret précédemment obtenu

	2 - Google
- Dans la partie publique :
	. clientID : clientID précédemment obtenu
	. redirectUrl : l'adresse de l'application à laquelle la chaîne "/google" a été ajoutée (http://www.example.com/google)
	. acceptedDomainName : le nom de domaine (example.com)
	. groups : renseigner les noms de tous les groupes auxquels les dev ou les bizdev doivent être ajoutés, dans le tableau correspondant. Par exemple, pour ajouter le groupe "joinus@example.com", ajouter uniquement "joinus".

- Dans la partie non publique :
	. secret : secret précédemment obtenu
	. passwordForNewUser : le mot de passe souhaité lorsque l'on crée un nouvel utilisateur.

	3 - Trello
- Dans la partie publique :
	. apiKey : la clef précedemment obtenue
	. organization : nom de l'organisation à laquelle rajouter les nouveaux employés
	. boards : tableau contenant des identifiants de tableaux auxquels rajouter des personnes.
		Ex : Dans l'adresse "https://trello.com/b/ZlvHCkma/itineraire", l'identifiant est "ZlvHCkma".
	. templateBoardFormation : Un nouveau tableau sera créé, copiant le tableau dont l'identifiant est indiqué et ajoutant le nouvel employé dessus. Copier l'identifiant du tableau de formation correspondant.
- Dans la partie non publique :
	N/A

Pour trello, il est également nécessaire de modifier la ligne "<script src="https://api.trello.com/1/client.js?key=cdfe125685dbd8ca533cb67ee42f1c98"></script>" du fichier "the-kreator.html" ; il faut remplacer, après "key=" la chaîne par la nouvel clef d'API trello.