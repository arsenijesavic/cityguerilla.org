exports.onClientEntry = (a) => {
  console.log('when')
  window.___emitter.on(`onDelayedLoadPageResources`, () => {
    console.log('1')
  })
  window.___emitter.on(`onPostLoadPageResources`, () => {
    console.log('2')
  })
}


exports.onInitialClientRender = () => {
  console.log("ReactDOM.render has executed")
}