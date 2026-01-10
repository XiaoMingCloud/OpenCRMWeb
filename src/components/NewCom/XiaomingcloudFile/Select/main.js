import XiaomingcloudFileVue from './main.vue'

const XiaomingcloudFile = {}

XiaomingcloudFile.install = (Vue) => {
  const XiaomingcloudFileConstructor = Vue.extend(XiaomingcloudFileVue)
  const instance = new XiaomingcloudFileConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)


  Vue.prototype.$XiaomingcloudFile = instance
}

export default XiaomingcloudFile
