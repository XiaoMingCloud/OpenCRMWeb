import XiaomingcloudImportVue from './index.vue'

const XiaomingcloudImport = {}

XiaomingcloudImport.install = (Vue) => {
  const XiaomingcloudCRMImportConstructor = Vue.extend(XiaomingcloudImportVue)
  const instance = new XiaomingcloudCRMImportConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)

  Vue.prototype.$XiaomingcloudImport = instance
}

export default XiaomingcloudImport
