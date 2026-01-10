// 各模块logo 和logo颜色
export default {
  methods: {

    /**
     * logo
     * @param {*} status
     */
    getXrIcon(type) {
      return {
        leads: 'xiaomingcloud open-leads',
        customer: 'xiaomingcloud open-customer',
        contacts: 'xiaomingcloud open-contacts',
        product: 'xiaomingcloud open-product',
        business: 'xiaomingcloud open-business',
        contract: 'xiaomingcloud open-contract',
        receivables: 'xiaomingcloud open-receivables',
        invoice: 'xiaomingcloud open-invoice',
        log: 'xiaomingcloud open-log',
        examine: 'xiaomingcloud open-approve',
        task: 'xiaomingcloud open-o-task',
        record: 'xiaomingcloud open-record'
      }[type]
    },

    /**
     * logo 颜色
     * @param {*} status
     */
    getXrIconColor(type) {
      return {
        leads: '#704afd',
        customer: '#487DFF',
        contacts: '#27BA4A',
        product: '#26d4da',
        business: '#FB9323',
        contract: '#FD5B4A',
        receivables: '#FFB940',
        invoice: '#1cbaf5',
        log: '#5864FF',
        approve: '#9376FF',
        task: '#D376FF',
        record: '#19B5F6'
      }[type]
    }
  }
}
