<template>
  <section>
    <!--工具条-->
    <el-row>
      <el-col :span="24" class="toolbar">
      <el-form :inline="true">
        <el-form-item label="状态 : " label-width="70">
          <el-select v-model="from.result.value" placeholder="请选择" class="w100 ">
            <el-option v-for="item in from.result.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="客户名称" v-model="from.keywords" class="w300"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList({pageIndex:1})">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置 </el-button>
        </el-form-item>
      </el-form>
      </el-col>
      <el-col :span="24">
      <el-table :data="tableDate" border style="width: 100%">
        <el-table-column fixed prop="customerName" label="客户名称" width="350">
          <template scope="scope">
            <ul class="customerName_content">
              <li>
                <img src="http://dfs.test.cloudyigou.com/dfs/s2/M00/25/39/rB4r9Vk3mwWAdctcAAFf5pjzdHU212_100x100.jpg" class="img_logo" />
              </li>
              <li>
                <p class="ellipsis">{{scope.row.customerName}}</p>
                <a @click="open" class="right">编辑</a>
                <p>
                  <i class="iconfont icon-dianhua1"></i>{{scope.row.linkman}}/{{scope.row.phone}}</p>
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column prop="registNum" label="注册证" width="110">
        </el-table-column>
        <el-table-column prop="factoryNum" label="生产厂家" width="110">
        </el-table-column>
        <el-table-column prop="authorizeNum" label="授权书" width="110">
        </el-table-column>
        <el-table-column prop="commitNum" label="承诺书" width="110">
        </el-table-column>
        <el-table-column prop="entrustNum" label="业务员" width="110">
        </el-table-column>
        <el-table-column prop="productNum" label="产品数量" width="110">
        </el-table-column>
        <el-table-column prop="applyTime" label="添加时间" width="130">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="110">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template scope="scope">
            <el-button size="small" @click="open">编辑</el-button>
            <el-button size="small" type="danger" @click="open">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </el-col>
      <el-col :span="24" class="toolbar">
      <pagination :total="total" :pageSize="pageSize" @getList="getList"></pagination>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import pagination from '@/components/pagination'
import dailog from '@/components/Dailog'
export default {
  name: 'table',
  data () {
    return {
      modal1: false,
      users: [],
      total: 0,
      pageSize: 20,
      pageIndex: 1,
      from: {
        result: {
          options: [{
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
    getList: function ({ pageIndex = this.pageIndex, pageSize = this.pageSize }) {
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
          // .map((item, index) => {
          //   let s = ``
          //   return {
          //     customerName: s
          //   }
          // })
        })
    },
    open () {
      this.$msgbox({
        title: '消息',
        message: (<div>
          <el-form class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item><el-form-item>
              <el-button type="primary" >查询</el-button>
            </el-form-item>
          </el-form>

        </div>),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'
            setTimeout(() => {
              done()
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
            }, 3000)
          } else {
            done()
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        })
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!')
        } else {
          this.$Message.error('表单验证失败!')
        }
      })
    },
    reset () {
      this.pageIndex = 1
      this.from.keywords = ''
      this.from.result.value = -1
      this.getList({ pageIndex: '1' })
    },
    ok () {
      this.handleSubmit('formValidate')
    }

  },
  mounted () {
    this.getList({})
  },
  components: {
    pagination,
    dailog
  }
}

</script>

<style lang="scss">
.img_logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0px 0px 2px #ccc;
  display: block
}

.customerName_content {

  li {
    &:nth-of-type(1) {
      float: left;
      margin-right: 5px;
    }
    &:nth-of-type(2) {
      position: relative;
      top: 5px;
      p {
        width: 75%;
      }
    } 
  }
}

.ivu-form-inline {
  .ivu-form-item {
    margin-right: 0px !important;
  }
}
</style>
