
'use strict'
import Vue from 'vue'
export default function treeToArray(data, expandAll, parent = null, level = null, formatter) {
  let tmp = []
  Array.from(data).forEach(function(record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }

    if (formatter) {
      formatter(record)
    }
    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record)
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level, formatter)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}
