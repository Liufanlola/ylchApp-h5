<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="part-content clearfix swiper-slide" v-for="list in lists" v-bind:key="list.interfaceUrl">
                <div class="module-title">
                    <ul>
                        <li v-for="item in list.chinaName" v-bind:key="item">{{ item }}</li>
                    </ul>
                </div>
                <div class="module-value">
                    <ul>
                        <li v-for="item in list.value" v-bind:key="item">
                            <span>{{ item }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev" v-show="lists.length>1"></div>
        <div class="swiper-button-next" v-show="lists.length>1"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'carousel',
  data () {
    return {
      lists: [
        {
          interfaceUrl: '/app/getNumberUse',
          englishName: ['activeregion', 'silence', 'billaverage', 'phoneNum', 'tagslabel'],
          chinaName: ['活跃地区1', '手机静默次数1', '平均月消费1', '一个月内通话号码总个数1', '标签1'],
          value: ['10', '20', '30', '40', '50']
        },
        {
          interfaceUrl: '/app/getNumberUse',
          englishName: ['activeregion', 'silence', 'billaverage', 'phoneNum', 'tagslabel'],
          chinaName: ['活跃地区', '手机静默次数', '平均月消费', '一个月内通话号码总个数', '标签'],
          value: ['10', '20', '30', '40', '50']
        }
      ]
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
  }
}
</script>
<style lang="less" scoped>
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


