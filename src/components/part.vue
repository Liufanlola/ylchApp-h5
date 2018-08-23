<template>
  <div class="part-container">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="part-content clearfix swiper-slide" v-for="list in newLists" v-bind:key="list.interfaceUrl">
                <div class="module-title">
                    <ul>
                        <li v-for="item in list.chinaName" v-bind:key="item">{{ item }}</li>
                    </ul>
                </div>
                <div class="module-value">
                    <ul>
                        <li v-for="item in list.value" v-bind:key="item[0]">
                            <span v-for="value in item" v-bind:key='value'>{{ value }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev" v-show="newLists.length>1"></div>
        <div class="swiper-button-next" v-show="newLists.length>1"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'part',
  data () {
    return {
      cInterface: 'http://192.168.20.32:8080/iFinCarCredit',
      initParams: {name: '李明', card: '230802197109091315', tel: '15204548188', userName: 'quanxiaoyi', Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzUwODAyNjUsInVzZXJuYW1lIjoicXVhbnhpYW95aSJ9.MlFsSQ2RBZaYN10nBXqVpiYU4aOj23mK3I-SoMVgAXU'},
      lists: [
        // 风险分析报告
        [
          {
            value: []
          }
        ]
        // // 归属地解析
        // [
        //   {
        //     value: []
        //   }
        // ],
        // // 号码使用情况
        // [
        //   {
        //     value: []
        //   }
        // ],
        // // 近六个月运营数据分析
        // [
        //   {
        //     value: []
        //   }
        // ],
        // // 信贷逾期详情
        // [
        //   {
        //     value: []
        //   }
        // ],
        // // 多平台借贷负债检测
        // [
        //   {
        //     value: []
        //   }
        // ],
        // // 多平台借贷申请检测
        // [
        //   {
        //     value: []
        //   }
        // ],
        // // 法院信息详情
        // [
        //   {
        //     value: []
        //   }
        // ],
        // // 客户行为检测
        // [
        //   {
        //     value: []
        //   }
        // ],
        // // 高频联系人信息
        // [
        //   {
        //     value: []
        //   }
        // ]
      ]
    }
  },
  props: {
    interfaceUrl: {
      type: String,
      required: true
    },
    englishName: {
      type: Array,
      required: true
    },
    chinaName: {
      type: Array,
      required: true
    }
  },
  computed: {
    params: function () {
      return this.$route.query
    },
    symbolIndex: function () {
      return this.$store.state.symbol
    },
    show: function () {
      return this.$store.state.moduleTitle[this.symbolIndex].show
    },
    newLists: function () {
      return this.lists
    }
  },
  created () {
    const that = this
    let param = new FormData()
    param.append('userName', this.initParams.userName)
    param.append('name', this.initParams.name)
    param.append('tel', this.initParams.tel)
    param.append('card', this.initParams.card)
    param.append('Authorization', this.initParams.Authorization)
    if (this.show) {
      console.log('走这里' + that.interfaceUrl)
      axios.post('/api' + that.interfaceUrl, param, {
      }).then(res => {
        console.log(res)
        this.getModuleValue(res.data.data, that.englishName, that.chinaName)
      }).catch(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  },
  methods: {
    getModuleValue (obj, EName, CName) {
      // console.log(obj)
      const that = this
      // 判断返回数据的类型
      let newListArr = []
      if (obj.constructor === Object) {
        newListArr.push(obj)
      } else {
        // 数组类型
        newListArr = obj
      }
      newListArr.forEach((item) => {
        let newListObj = {}
        newListObj.chinaName = CName
        newListObj.value = that.changeObjToArr(item, EName)
        that.lists.push(newListObj)
      })
      that.lists.splice(0, 1)
      console.log(that.lists)
    },
    // 将对象转换成数组
    changeObjToArr (obj, EName) {
      let list = []
      EName.forEach((item) => {
        if (obj[item] === null || obj[item] === '') {
          list.push('无数据'.split(' '))
        } else if (typeof obj[item] === 'number') {
          list.push(obj[item].toString())
        } else if (obj[item].indexOf(',') !== -1 && typeof obj[item] === 'string') {
          list.push(obj[item].split(','))
        } else {
          list.push(obj[item].split(','))
        }
      })
      return list
    }
  }
}
</script>
<style lang="less" scoped>
.part-container{
  box-shadow: 0px 0px 10px #e7ebea;
  padding: 20/75rem;
}
.part-content{
    li{
        font-size:24/75rem;
        line-height: 47/75rem;
        display:block;
    }
    .module-title{
        float: left;
    }
    .module-value{
        float: right;
        li{
            text-align: right;
        }
        span{
            display:block;
        }
    }
}
</style>
