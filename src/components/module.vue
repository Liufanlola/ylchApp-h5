 <template>
     <div class="container" id="report">
         <header><span></span><em>报告分析</em></header>
         <section class="content">
            <div class="module-list" v-for="(item,index) in moduleTitle" v-bind:key="item.name">
                <div class="module-list-head" @click="handleClick(index)"><h1>{{ item.name }}</h1><span v-bind:class="{ arrowdown:item.show, arrowleft:!item.show }"></span></div>
                <transition
                  name="showModuleList"
                  @before-enter="handleBeforeEnter"
                  @enter="handleEnter"
                  @after-enter="handleAfterEnter"
                  @before-leave="handleBeforeLeave"
                  @leave="handleLeave"
                  @after-leave="handleAfterLeave"
                  :css="false"
                  >
                <part
                  class="part-list"
                  v-if="$store.state.moduleTitle[index].show"
                  v-bind:interfaceUrl='item.interfaceUrl'
                  v-bind:chinaName="item.chinaName"
                  v-bind:englishName="item.englishName"
                  >
                </part>
                </transition>
            </div>
         </section>
     </div>
 </template>
<script>
import part from './part'
import Velocity from 'velocity-animate'
import Vuex from './vuex'
export default {
  name: 'report',
  data () {
    return {
      moduleTitle: [{name: '风险分析报告', show: true, symbol: 0, interfaceUrl: '/app/searchReport', englishName: ['decision', 'applicant', 'idcard', 'phone', 'concern'], chinaName: ['扫描意见', '姓名', '身份证号码', '手机号', '命中风险项目']},
        {name: '归属地解析', show: false, symbol: 1, interfaceUrl: '/app/getCellCore', englishName: ['cardAddress', 'phoneAddress', 'residence', 'opendate'], chinaName: ['身份证所属地', '手机所属地', '登记居住地址', '入网时间']},
        {name: '号码使用情况', show: false, symbol: 2, interfaceUrl: '/app/getNumberUse', englishName: ['activeregion', 'silence', 'billaverage', 'phoneNum', 'tagslabel'], chinaName: ['活跃地区', '手机静默次数', '平均月消费', '一个月内通话号码总个数', '标签 ']},
        {name: '近六个月运营数据分析', show: false, symbol: 3, interfaceUrl: '/app/dataAnalysis', englishName: ['month', 'calltime', 'consume'], chinaName: ['月份', '通话次数', '月实际消费']},
        {name: '信贷逾期详情', show: false, symbol: 4, interfaceUrl: '/app/nameOverdue', englishName: ['itemName', 'riskLevel', 'overdueTime', 'overduedayRange', 'overdueAmount'], chinaName: ['检查项目', '风险等级', '逾期时间', '逾期天数', '逾期金额']},
        {name: '多平台借贷负债检测', show: false, symbol: 5, interfaceUrl: '/app/platBorrow', englishName: ['itemName', 'riskLevel', 'platformCount', 'platformDetail', 'count', 'detail', 'dimension'], chinaName: ['检查项目名', '风险等级', '多头借贷', '借贷详情', '维度命中多头个数', '维度命中多头详情', '维度显示名']},
        {name: '多平台借贷申请检测', show: false, symbol: 6, interfaceUrl: '/app/platForm', englishName: ['itemName', 'riskLevel', 'platformCount', 'platformDetail', 'count', 'detail', 'dimension'], chinaName: ['检查项目名', '风险等级', '多头借贷', '借贷详情', '维度命中多头个数', '维度命中多头详情', '维度显示名']},
        {name: '法院信息详情', show: false, symbol: 7, interfaceUrl: '/app/courtInfo', englishName: ['name', 'gender', 'age', 'province', 'fraudType', 'executionNumber', 'filingTime', 'discreditDetail', 'executionBase', 'executionDepartment'], chinaName: ['姓名', '性别', '年龄', '省份', '风险类型', '执行标准', '立案时间', '失信被执行人行为具体详情', '执行依据文号', '做出依据执行单位']},
        {name: '客户行为检测', show: false, symbol: 8, interfaceUrl: '/app/FreqDetail', englishName: ['itemName', 'riskLevel', 'detail', 'data'], chinaName: ['检查项目名', '风险等级', '命中详情', '命中明细']},
        {name: '高频联系人信息', show: false, symbol: 9, interfaceUrl: '/app/queryDhbHighFrequency', englishName: ['fromattel', 'fanchatelloc', 'tagstable', 'tagslabeltimes', 'callouttimes', 'callintimes', 'calltimes', 'calllength'], chinaName: ['通话号码', '号码归属地', '标记', '号码标记次数', '主叫次数', '被叫次数', '联系次数', '通话总时长']}
      ]
    }
  },
  store: Vuex,
  components: {part},
  methods: {
    handleClick: function (index) {
      this.$store.state.moduleTitle[index].show = !this.$store.state.moduleTitle[index].show
      this.$store.state.symbol = index
    },
    handleBeforeEnter: function (el) {
      el.style.display = 'none'
    },
    handleEnter: function (el, done) {
      Velocity(el, 'stop')
      Velocity(el, 'slideDown', {
        duration: 500,
        display: 'block',
        complete: done
      })
    },
    handleAfterEnter: function (el) {
    },
    handleBeforeLeave: function (el) {
    },
    handleLeave: function (el, done) {
      Velocity(el, 'stop')
      Velocity(el, 'slideUp', {
        duration: 500,
        display: 'block',
        complete: done
      })
    },
    handleAfterLeave: function (el) {
    }
  }
}
</script>
<style lang="less" scoped>
header{
    text-align: center;
    em{
        font-size: 34/75rem;
        font-weight: bolder;
    }
}
.content{
    padding: 30/75rem;
    border-top:1px solid #e8e8e8;
}
.module-list-head{
    h1{
        font-size: 24/75rem;
        color: #000;
        font-weight: bold;
        line-height: 88/75rem;
        display:inline-block;
    }
    h1:before{
        content: ';';
        // width:4/75rem;
        height: 24/75rem;
        background-color: #04bed3;
        color: transparent;
        margin-right: 8/75rem;
    }
    span{
        display:inline-block;
        width:14/75rem;
        height: 15/75rem;
    }
    .arrowdown{
        background: url(../image/arrow-down.png) left center no-repeat;
        background-size:100%;
        margin-left:15/75rem;
    }
    .arrowleft{
        background: url(../image/arrow-left.png) left center no-repeat;
        background-size:100%;
        margin-left:15/75rem;
    }
}
</style>
