<template>
    <section>
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item label="状态 : ">
                        <el-select v-model="from.result.value" placeholder="请选择">
                            <el-option v-for="item in from.result.options" :label="item.label" :value="item.value" :key="item.value" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-input placeholder="客户名称" v-model="from.keywords" class="w300"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList({pageIndex:1})">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
             <el-table ref="multipleTable"
    :data="tableDate"
    border
    tooltip-effect="dark"
    style="width: 100%"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="客户名称"
      width="120" prop="customerName">
      
    </el-table-column>
    <el-table-column
      prop="registNum"
      label="注册证"
      width="120">
    </el-table-column>
    <el-table-column
      prop="factoryNum"
      label="生产厂家"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
     
      label="操作"
      show-overflow-tooltip>
      <template scope="scope">
        <el-button @click="open" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
            </el-col>
            <el-col :span="24" class="toolbar">
                <pagination :total="total" :pageSize="pageSize" :pageIndex="pageIndex"  @getList="getList"></pagination>
            </el-col>
        </el-row>
    </section>
</template>

<script>
import pagination from '@/components/pagination'
export default {
  name: 'table',
  data () {
    return {
      users: [],
      total: 0,
      pageSize: 20,
      pageIndex: 1,
      from: {
        result: {
          options: [ {
            value: -1,
            label: '全部'
          },
          {
            value: 3,
            label: '待审核'
          },
          {
            value: 1,
            label: '已通过'
          },
          {
            value: 4,
            label: '被拒绝'
          },
          {
            value: 6,
            label: '被解除'
          }],
          value: -1
        },
        keywords: ''
      },
      tableDate: []
    }
  },
  computed: {

  },
  methods: {

    getList: function ({pageIndex = this.pageIndex, pageSize = this.pageSize}) {
      let self = this
      this.Http.post('scm.supplier.queryCustomers',
        {
          'params': {
            'keywords': this.from.keywords,
            'orderBy': 'desc',
            'orderField': 'apply_time',
            'status': this.from.result.value,
            'pageIndex': pageIndex,
            'pageSize': pageSize
          }
        }).then(function (re) {
          console.log(re)
          self.pageIndex = re.data.pageIndex
          console.log(self.pageIndex)
          self.pageSize = re.data.pageSize
          self.total = re.data.total
          self.tableDate = re.data.rows
        //   .map((item, index) => {
        //     return {
        //       customerName: item.customerName + '<br/>' + item.applyTime
        //     }
        //   })
        })
    },
    reset () {
      this.pageIndex = 1
      this.from.keywords = ''
      this.from.result.value = -1
      this.getList({pageIndex: '1'})
    },
    open () {
      this.$alert('<h1>这是一段内容</h1>', '标题名称', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
        // 时间
    changeTime: function (val) {
    }

  },
  mounted () {
    this.getList({})
  },
  components: {
    pagination
  }
}

</script>

<style scoped lang="scss">


.inline {
    display: inline-block;
}

.ivu-form-inline {

    .ivu-form-item {
        margin-right: 0px !important;
    }
}
</style>
