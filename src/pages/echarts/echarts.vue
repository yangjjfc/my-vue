<template>
  <section>
    <el-row class="chart-container">
      <el-tabs type="border-card" @tab-click="openCahrt">
        <el-tab-pane label="销售趋势" >
          <el-col :span="24">
            <div class="charts_top" ref="charts_sell"></div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="订单趋势" >
           <el-col :span="24">
              <div class="charts_top" ref="charts_order"></div>
            </el-col>
        </el-tab-pane>
        <el-col :span="8">
          <div class="c_border">
            <h3>产品</h3>
            <el-col :span="24">
              <div class="charts_buttom" ref="charts_product"></div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="c_border">
            <h3>产品</h3>
            <el-col :span="24">
              <div class="charts_buttom" ref="charts_hospital"></div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="c_border">
            <h3>产品</h3>
            <el-col :span="24">
              <div class="charts_buttom" ref="charts_cert"></div>
            </el-col>
          </div>
        </el-col>
      </el-tabs>
  
    </el-row>
  </section>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      charts_top: null,
      charts_product: null,
      charts_hospital: null,
      charts_cert: null,
      URL: {
        ORDERBYSUPPLIER: 'scm.homePage.orderBySupplier', // 订单趋势图
        SUPPLIERHOMEPAGE: 'scm.homePage.supplierHomePage' // 产品图
      },
      data: []
    }
  },
  methods: {
    charts_line () {
      this.Http.post(this.URL.ORDERBYSUPPLIER, { params: {} }).then((msg) => {
        this.chartLine_sell = echarts.init(this.$refs.charts_sell)

        let msgs = Array.from(msg.data.lists)
        this.data.month = []
        this.data.atotal = []
        this.data.num = []
        for (let v of msgs) {
          this.data.month.push(v.month)
          this.data.atotal.push(v.atotal)
          this.data.num.push(v.num)
        }
        this.setChart_line(this.chartLine_sell, this.data.month, this.data.atotal, '销售趋势')
      })
    },
    openCahrt () {
      setTimeout(() => {
        this.chartLine_order = echarts.init(this.$refs.charts_order)

        this.setChart_line(this.chartLine_order, this.data.month, this.data.num, '订单趋势')
      }, 1000)
    },
    charts_pie () {
      this.Http.post(this.URL.SUPPLIERHOMEPAGE, { params: {} }).then((msg) => {
        this.charts_product = echarts.init(this.$refs.charts_product)
        this.charts_hospital = echarts.init(this.$refs.charts_hospital)
        this.charts_cert = echarts.init(this.$refs.charts_cert)
        let chartsProductName = msg.data.product.chartData.map((item, i) => {
          return item.name
        })
        let chartsHospitalName = msg.data.cert.chartData.map((item, i) => {
          return item.name
        })
        let chartsCertName = msg.data.customer.chartData.map((item, i) => {
          return item.name
        })
        this.setChart_pie(this.charts_product, chartsProductName, msg.data.product.chartData, '产品')
        this.setChart_pie(this.charts_hospital, chartsHospitalName, msg.data.cert.chartData, '医院')
        this.setChart_pie(this.charts_cert, chartsCertName, msg.data.customer.chartData, '证件')
      })
    },

    setChart_pie (target, name, value, type) {
      target.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: name
        },
        series: [
          {
            name: type,
            type: 'pie',
            radius: '45%',
            center: ['50%', '60%'],
            data: value,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    setChart_line (target, name, value, type) {
      target.setOption({
        title: {
          text: '销售趋势'
        },
        tooltip: {
          trigger: 'axis'
            // formatter: function (params) {
            //   console.log(params)
            //   return params.value
            // }
        },
        legend: {
          data: [type]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: name
        },
        yAxis: {
          type: 'value',
          name: '金额(元)'
        },
        series: [
          {
            name: type,
            type: 'line',
            stack: '总量',
            data: value
          }
        ]
      })
    }
  },
  mounted () {
    this.charts_line()
    this.charts_pie()
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.chart-container {
  width: 100%;
  .charts_top {
    width: 100%;
    height: 600px
  }
  .c_border {
    height: 440px;
    margin: 10px;

    border: 1px #ccc solid;
    h3 {
      border-bottom: 1px #ccc solid;
      height: 55px;
      line-height: 55px;
      text-indent: 2em;
    }
    .charts_buttom {
      padding: 10px;
      height: 400px;
    }
  }
}
</style>
