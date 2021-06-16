import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })

Vue.mixin({
    methods: {
        async callApi(method, url, dataObj){
            try{
                let Data = await this.$axios({
                    method: method,
                    url,url,
                    data:dataObj
                })
                return Data
            } catch (e) {
                return e.response
            }
        }
    },
})
