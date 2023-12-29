import {loadCss, loadJs} from "@/utils/loadJsAndCss";

const loadCssJs = () => {
  return new Promise<void>((resolve, reject) => {
    Promise.all([
      loadCss('https://minedata.cn/nce-static/support/demo/js-api/zh/css/demo.css'),
      loadCss('https://minedata.cn/minemapapi/v2.1.1/minemap.css'),
      loadJs('https://minedata.cn/minemapapi/v2.1.1/minemap.js'),
    ])
      .then(() => {
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  })
}

export  {
  loadCssJs
}
