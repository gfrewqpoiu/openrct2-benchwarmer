/// <reference path="openrct2.d.ts" />

function buildOnTile(surface, path) {
  return surface &&
    surface.hasOwnership &&
    path &&
    !path.isQueue &&
    path.slopeDirection === null
}

export default function Add(bench=null, bin=null) {
  const paths = []

  // Iterate every tile in the map
  for (let y = 0; y < map.size.y; y++) {
    for (let x = 0; x < map.size.x; x++) {
      const { elements } = map.getTile(x, y)
      const surface = elements.filter(element => element.type === "surface")[0]
      const path = elements.filter(element => element.type === "footpath")[0]

      if (buildOnTile(surface, path)) {
        paths.push({ path: path, x: x, y: y })
      }
    }
  }

  if (bench !== null && bin !== null) {
    paths.forEach((path, index) => {
      if (path.x % 2 === path.y % 2) {
        path.path.addition = bench
        park.cash -= 5
      } else {
        path.path.addition = bin
        park.cash -= 3
      }
    })
  }
}
