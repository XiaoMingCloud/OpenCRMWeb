import XiaomingcloudPreviewFileVue from './index.vue'

const XiaomingcloudPreviewFile = {}

XiaomingcloudPreviewFile.install = (Vue) => {
  const XiaomingcloudPreviewFileConstructor = Vue.extend(XiaomingcloudPreviewFileVue)
  const instance = new XiaomingcloudPreviewFileConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
  Vue.prototype.$XiaomingcloudPreviewFile = instance
}

export default XiaomingcloudPreviewFile
