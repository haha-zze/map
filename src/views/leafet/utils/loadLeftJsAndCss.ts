import {loadCss, loadJs} from "@/utils/loadJsAndCss"

const loadCssJs = () => {
  return new Promise<void>((resolve, reject) => {
    Promise.all([
      loadCss('https://unpkg.com/leaflet@1.9.3/dist/leaflet.css'),
      loadJs('https://unpkg.com/leaflet@1.9.3/dist/leaflet.js'),
    ])
      .then(() => {
        resolve(L)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// const loadCssJs = () => {
//   return new Promise<void>((resolve, reject) => {
//     Promise.all([
//       loadCss('/src/views/leafet/assets/leaflet.css'),
//       loadJs('/src/views/leafet/assets/leaflet.js'),
//     ])
//       .then(() => {
//         resolve()
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

export  {
  loadCssJs
}
