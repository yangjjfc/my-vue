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
                        <el-button type="primary" @click="getList(1)">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset">重置 </el-button>
                    </el-form-item>
                    <el-form-item class="right">
                        <el-button type="primary" @click="addUser">添加客户</el-button>
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
                                    <a @click="editUser(scope.row)" class="right">编辑</a>
                                    <p class="ellipsis">
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
                            <el-button size="mini" type="warning" @click="relieve(scope.row)">解除关系</el-button>
                            <el-button size="mini" type="danger" @click="open">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar">
                <pagination :total="total" :pageSize="pageSize"  @change="getList"></pagination>
            </el-col>
            <el-col :span="24">
                <editUser :showx.sync="showEdit" :msg="editUserMsg" @refresh="getList"></editUser>
            </el-col>  
            <el-col :span="24">
                <addUser :showx.sync="showaddUser"  @refresh="getList"></addUser>
            </el-col> 
            <el-col :span="24">
                <relieve :showx.sync="showrelieveUser" :msg="relieveUserMsg" @refresh="getList"></relieve>
            </el-col> 
        </el-row>
    </section>
</template>
<script>
import pagination from '@/components/pagination';
import editUser from './components/editUser'; // 编辑
import addUser from './components/addUser';  // 添加客户
import relieve from './components/relieve'; // 解除客户
export default {
    name: 'customer-list',
    data () {
        return {
            showEdit: false, // 显示编辑用户
            editUserMsg: null, // 编辑用户数据
            showaddUser: false, // 显示添加用户
            showrelieveUser: false, // 显示解除用户
            relieveUserMsg: null, // 显示解除用户数据
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
        // 获取列表
        getList (pageIndex = this.pageIndex, pageSize = this.pageSize) {
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
                }).then((re) => {
                    this.pageIndex = re.data.pageIndex;
                    this.pageSize = re.data.pageSize;
                    this.total = re.data.total;
                    this.tableDate = re.data.rows;
                });
        },
        open () {

        },
        // 编辑用户
        editUser (msg) {
            this.showEdit = true;
            this.editUserMsg = {...msg};
        },
        // 添加用户
        addUser () {
            this.showaddUser = true;
        },
        // 解除用户
        relieve (msg) {
            this.showrelieveUser = true;
            this.relieveUserMsg = {...msg, relieve: ''};// es7对象扩展
        },
        reset () {
            this.pageIndex = 1;
            this.from.keywords = '';
            this.from.result.value = -1;
            this.getList(1);
        }
    },
    mounted () {
        this.getList();
    },
    components: {
        pagination,
        editUser,
        addUser,
        relieve
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
                width: 67%;
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
        background: url(../../..//assets/images/u414.png) no-repeat;
    }
    .zhu2 {
        background: url(../../..//assets/images/u416.png) no-repeat;
    }
    .zhu3 {
        background: url(../../..//assets/images/u418.png) no-repeat;
    }
    .zhu4 {
        background: url(../../..//assets/images/u420.png) no-repeat;
    }
    .zhu5 {
        background: url(../../..//assets/images/u422.png) no-repeat;
    }
}
</style>
