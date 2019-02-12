const intersect = require('@turf/intersect').default
const geojsonRbush = require('geojson-rbush').default
const tree = geojsonRbush()

console.info('chargement des communes...')

const sourceCommunes = require('./sources/communes-100m.geojson').features

console.info('insertion dans l\'index')
sourceCommunes.forEach(c => tree.insert(c))

console.info('prêt')

function communesFind(geojson) {
  if (!geojson.properties) {
    geojson.properties = {}
  }

  const feature = {
    type: 'FeatureCollection',
    features: [geojson],
  }

  // Recherche le périmètre dans l'index bbox
  const { features: matchingCommunes } = tree.search(geojson)

  // Filtre les communes trouvées par l'index et compare le périmètre
  const communes = matchingCommunes.filter(
    commune => intersect(geojson, commune)
  )

  return communes
}

module.exports = communesFind
