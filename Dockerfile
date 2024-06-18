# Étape 1 : Construction de l'application Node.js
# Utilise l'image officielle de Node.js version 20 comme base pour la construction
FROM node:20 as build

# Définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copie les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances définies dans package.json
RUN npm install

# Copie tous les fichiers du répertoire courant de l'hôte dans le répertoire de travail du conteneur
COPY . .

# (Optionnel) Si votre microservice nécessite une étape de construction, vous pouvez la faire ici
# Exemple : Construire le projet
# RUN npm run build

# Reconstruit le module bcrypt à partir du source pour s'assurer qu'il est compatible avec l'environnement de construction
RUN npm rebuild bcrypt --build-from-source

# Étape 2 : Création de l'image finale avec seulement l'environnement d'exécution Node.js
# Utilise l'image officielle de Node.js version 20 comme base pour l'image finale
FROM node:20 as final

# Définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copie tous les fichiers du répertoire de travail de l'étape de construction vers l'image finale
COPY --from=build /usr/src/app .

# Expose le port 4002 pour l'application Node.js (correction du commentaire : il s'agit du port 4002)
EXPOSE 4002

# Démarre l'application Node.js
CMD ["node", "app.js"]
