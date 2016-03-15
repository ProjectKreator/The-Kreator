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
- Noter le client id et le client secret, ils seront nécessaires pour configurer l'application