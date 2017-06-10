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
                    <el-table-column prop="customerName" label="客户名称" width="350">
                        <template scope="scope">
                            <ul class="customerName_content">
                                <li>
                                    <img src="http://dfs.test.cloudyigou.com/dfs/s2/M00/25/39/rB4r9Vk3mwWAdctcAAFf5pjzdHU212_100x100.jpg" class="img_logo" />
                                </li>
                                <li>
                                    <p class="ellipsis">{{scope.row.customerName}}</p>
                                    <a @click="open" class="right">编辑</a>
                                    <p>
                                        <i class="iconfont icon-dianhua1 Warning"></i>{{scope.row.linkman}}/{{scope.row.phone}}</p>
                                </li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column label="注册证" width="110" align="center">
                        <template scope="scope">
                            <div class="certs">
                                <a v-if="scope.row.registNum>0">
                                    <i class="zhu1">{{scope.row.registNum}}</i>
                                </a>
                                <i class="zhu1" v-else>{{scope.row.registNum}}</i>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="生产厂家" width="110" align="center">
                        <template scope="scope">
                            <div class="certs">
                                <a v-if="scope.row.factoryNum>0">
                                    <i class="zhu2">{{scope.row.factoryNum}}</i>
                                </a>
                                <i class="zhu1" v-else>{{scope.row.factoryNum}}</i>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="授权书" width="110" align="center">
                        <template scope="scope">
                            <div class="certs">
                                <a v-if="scope.row.authorizeNum>0">
                                    <i class="zhu3">{{scope.row.authorizeNum}}</i>
                                </a>
                                <i class="zhu1" v-else>{{scope.row.authorizeNum}}</i>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="承诺书" width="110" align="center">
                        <template scope="scope">
                            <div class="certs">
                                <a v-if="scope.row.commitNum>0">
                                    <i class="zhu4">{{scope.row.commitNum}}</i>
                                </a>
                                <i class="zhu1" v-else>{{scope.row.commitNum}}</i>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="业务员" width="110" align="center">
                        <template scope="scope">
                            <div class="certs">
                                <a v-if="scope.row.entrustNum>0">
                                    <i class="zhu5">{{scope.row.entrustNum}}</i>
                                </a>
                                <i class="zhu1" v-else>{{scope.row.entrustNum}}</i>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="productNum" label="产品数量" width="110" align="center">
                    </el-table-column>
                    <el-table-column prop="applyTime" label="添加时间" width="130" align="center">
                    </el-table-column>
                    <el-table-column label="状态" width="110" align="center">
                        <template scope="scope">
                            <span class="Warning" v-if="scope.row.status=='3'">待审核</span>
                            <span class="Success" v-else-if="scope.row.status=='1'">已通过</span>
                            <span class="Gray" v-else-if="scope.row.status=='4'">被拒绝</span>
                            <span class="Danger" v-else-if="scope.row.status=='6'">被解除</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="250">
                        <template scope="scope">
                            <el-button size="mini" type="primary" @click="open">添加产品</el-button>
                            <el-button size="mini" type="primary" @click="open">价格设置</el-button>
                            <el-button size="mini" type="warning" @click="open">解除关系</el-button>
                            <el-button size="mini" type="danger" @click="open">删除</el-button>
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
import pagination from '@/components/pagination';
import dailog from '@/components/Dailog';
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
        };
    },
    computed: {
    },
    methods: {
        getList: function ({ pageIndex = this.pageIndex, pageSize = this.pageSize }) {
            let self = this;
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
                    self.pageIndex = re.data.pageIndex;
                    self.pageSize = re.data.pageSize;
                    self.total = re.data.total;
                    self.tableDate = re.data.rows;
                    // .map((item, index) => {
                    //   let s = ``
                    //   return {
                    //     customerName: s
                    //   }
                    // })
                });
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
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        setTimeout(() => {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                            }, 300);
                        }, 3000);
                    } else {
                        done();
                    }
                }
            }).then(action => {
                this.$message({
                    type: 'info',
                    message: 'action: ' + action
                });
            });
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        reset () {
            this.pageIndex = 1;
            this.from.keywords = '';
            this.from.result.value = -1;
            this.getList({ pageIndex: '1' });
        },
        ok () {
            this.handleSubmit('formValidate');
        }

    },
    mounted () {
        this.getList({});
    },
    components: {
        pagination,
        dailog
    }
};

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

.certs {
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    width: 100%;
    i {
        display: inline-block;
        width: 55px;
        min-height: 40px;
        background-repeat: no-repeat;
        background-size: 100%;
        padding-top: 15px;
        font-style: normal;
        text-indent: 1em;
        box-sizing: border-box;
    }
    .zhu1 {
        background: url(../..//assets/images/u414.png) no-repeat;
    }
    .zhu2 {
        background: url(../..//assets/images/u416.png) no-repeat;
    }
    .zhu3 {
        background: url(../..//assets/images/u418.png) no-repeat;
    }
    .zhu4 {
        background: url(../..//assets/images/u420.png) no-repeat;
    }
    .zhu5 {
        background: url(../..//assets/images/u422.png) no-repeat;
    }
}
</style>
