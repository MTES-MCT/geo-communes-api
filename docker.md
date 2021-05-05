# Déploiement

## Créer le répertoire `sources`

```bash
sudo mkdir /srv/env/geo-api/sources
```

## Donner les droits en écriture sur le répertoire `sources`

```bash
sudo chmod g+w /srv/env/geo-api/sources
```

### rendre l'utilisateur git owner de /srv/env/geo-api/sources

```bash
sudo chown -R git:users /srv/env/geo-api/sources
```

## Copier les fichiers sources (geojson) sur le serveur

```bash
scp -r sources <user>@<ip>:/srv/env/geo-api
```

## Environnement de développement

```bash
# démarre l'application dans un conteneurs Docker
# en mode `development`
# accessible à http://localhost:PORT
docker-compose -f ./docker-compose.localhost.yml up --build
```

### Environnement de test

Pour tester l'application en local dans un environnement de production

Pré-requis:

- une installation locale active de https://github.com/jwilder/nginx-proxy
- un certificat ssl auto-signé
- [instructions](https://medium.com/@francoisromain/set-a-local-web-development-environment-with-custom-urls-and-https-3fbe91d2eaf0)

```bash
# démarre l'application dans un container Docker
# en mode `production`
# accessible à https://api.camino.local
docker-compose -f ./docker-compose.local.yml up --build
```

## Environnement de production

Pré-requis:

- une installation active de https://github.com/jwilder/nginx-proxy
- [instructions](https://medium.com/@francoisromain/host-multiple-websites-with-https-inside-docker-containers-on-a-single-server-18467484ab95)

```bash
# démarre l'application dans un container Docker
# en mode `production`
# accessible à http://api.camino.beta.gouv.fr
docker-compose -f ./docker-compose.yml up -d --build
```
