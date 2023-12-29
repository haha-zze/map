import axios from 'axios'

const loadJs = (src:string):Promise<HTMLScriptElement> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    document.body.appendChild(script)

    script.onload = () => {
      resolve(script)
    }
    script.onerror = err => {
      console.log(`loadJsFail: ${err}`)
      reject()
    }
  })
}

const loadCss = (src:string):Promise<HTMLStyleElement> => {
  return new Promise((resolve, reject) => {
    axios.get(src).then(res => {
      const css = document.createElement('style')
      css.type = 'text/css'
      css.innerHTML = res.data
      document.head.appendChild(css)
      resolve(css)
    }).catch(err => {
      console.log(`loadCssFail: ${err}`)
      reject()
    })
  })
}



export {
  loadJs,
  loadCss,
}
