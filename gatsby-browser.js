exports.onClientEntry = (pluginOptions = {}) => {
  //const options = { ...defaultOptions, ...pluginOptions }

  window.___emitter.on(`onDelayedLoadPageResources`, () => {
    console.log('onDelayedLoadPageResources')
  })
  window.___emitter.on(`onPostLoadPageResources`, () => {
    console.log('onPostLoadPageResources')
  })

  const styles = ``
  // const node = document.createElement(`style`)
  // node.id = `nprogress-styles`
  // node.innerHTML = styles
  // document.head.appendChild(node)
}
