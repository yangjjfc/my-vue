<template>
    <section>
        <!--工具条-->
        <Row>
            <Col span="24" class="toolbar">
            <Form inline>
                <Form-item label="状态 : " :label-width="70">
                    <Select v-model="from.result.value" placeholder="请选择" class="w100 ">
                        <Option v-for="item in from.result.options" :label="item.label" :value="item.value" :key="item.value"></Option>
                    </Select>
                </Form-item>
                <Form-item>
                    <Input placeholder="客户名称" v-model="from.keywords" class="w300"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="getList({pageIndex:1})">查询</Button>
                </Form-item>
                <Form-item>
                    <Button @click="reset">重置 </Button>
                </Form-item>
            </Form>
            </Col>
            <Col span="24">
            <Table border :columns="columns" :data="data1" style="width:100% !important"></Table>
            </Col>
            <Col span="24" class="toolbar">
            <pagination :total="total" :pageSize="pageSize" @getList="getList"></pagination>
            </Col>
            {{count}}
        </Row>
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
        date: {
          startTime: '',
          endTime: ''
        },
        keywords: ''
      },
      columns: [{
        title: '序号',
        key: 'num',
        width: 80,
        align: 'center'
      },
      {
        title: '客户名称',
        key: 'customerName'
      },
      {
        title: '注册证',
        key: 'registNum'
      }, {
        title: '操作'
      }],
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
      this.getList({ pageIndex: '1' })
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
.toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0px;
    .ivu-form-item {
        margin-bottom: 0;
    }
}

.w100 {
    width: 100px !important;
}

.w120 {
    width: 120px !important;
}

.w140 {
    width: 140px !important;
}

.w160 {
    width: 160px !important;
}

.w180 {
    width: 180px !important;
}

.w200 {
    width: 200px !important;
}

.w220 {
    width: 220px !important;
}

.w240 {
    width: 240px !important;
}

.w260 {
    width: 260px !important;
}

.w280 {
    width: 280px !important;
}

.inline {
    display: inline-block;
}

.ivu-form-inline {

    .ivu-form-item {
        margin-right: 0px !important;
    }
}
</style>
