<template>
    <section>
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-input placeholder="真实姓名/登录账号/手机号码" v-model="from.keywords" class="w300" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList(1)"  size="small">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset"  size="small">重置</el-button>
                    </el-form-item>
                    <el-form-item class="right">
                        <el-button type="primary" @click="addUser"  size="small">添加客户</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="tableDate" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                     <el-table-column prop="userName" label="真实姓名" min-width="150" align="center" >
                    </el-table-column>
                     <el-table-column prop="loginAccount" label="登录账号" min-width="150" align="center" >
                    </el-table-column>
                     <el-table-column prop="mobilePhone" label="手机号码" min-width="120" align="center" >
                    </el-table-column>
                     <el-table-column prop="orderSpecialist" label="订单专员" width="100" align="center" >
                    </el-table-column>
                     <el-table-column  label="授权客户数" width="100" align="center" >
                          <template scope="scope">
                            <el-button size="mini" type="text" v-if="scope.row.status != '3'">{{scope.row.authorityNum}}</el-button>  
                            <span v-else>{{scope.row.authorityNum}}</span>   
                        </template>
                    </el-table-column>
                     <el-table-column  label="状态" width="80" align="center" >
                          <template scope="scope">
                              <span v-html="scope.row.statusx"></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  width="570">
                        <template scope="scope">
                            <el-button size="mini" type="primary" @click="open" v-if="scope.row.status !='3'">编辑</el-button>
                            <el-button size="mini" type="success" @click="open" v-if="scope.row.status=='2'">启用</el-button>
                            <el-button size="mini" type="warning" @click="open" v-if="scope.row.status=='1'">禁用</el-button>
                            <el-button size="mini" type="danger" @click="open" v-if="scope.row.status !='3'">删除</el-button>
                            <el-button size="mini" type="primary" @click="open" v-if="scope.row.status !='3'">权限</el-button>
                            <el-button size="mini" type="primary" @click="open" v-if="scope.row.status !='3'&&scope.row.orderSpecialist !='1'">取消订单专员</el-button>
                            <el-button size="mini" type="primary" @click="open" v-if="scope.row.status !='3'&&scope.row.orderSpecialist !='0'">设置订单专员</el-button>
                            <el-button size="mini" type="primary" @click="relieve(scope.row)" v-if="scope.row.status !='3'">授权客户</el-button>
                            <el-button size="mini" type="primary" @click="open">授权供应商</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar">
                <pagination :total="total" :pageSize="pageSize"  @change="getList"></pagination>
            </el-col>
            <!--<el-col :span="24" v-if="showEdit">
                <editUser :showx.sync="showEdit" :msg="editUserMsg" @refresh="getList"></editUser>
            </el-col>  -->
            <el-col :span="24" v-if="showaddUser">
                    <addUser  :showx.sync="showaddUser"  @refresh="getList"></addUser>
            </el-col> 
            <!--<el-col :span="24"  v-if="showrelieveUser">
                <relieve :showx.sync="showrelieveUser" :msg="relieveUserMsg" @refresh="getList"></relieve>
            </el-col> -->
        </el-row>
    </section>
</template>
<script>
import pagination from '@/components/pagination';
// import editUser from './components/editUser'; // 编辑
import addUser from './mods/addUser';  // 添加客户
// import relieve from './components/relieve'; // 解除客户
const URL = {
    PEOPLE_LIST: 'scm.enterprise.queryStaffList'// 查询员工列表
};
export default {
    name: 'staff',
    data () {
        return {
            showEdit: false, // 显示编辑用户
            editUserMsg: null, // 编辑用户数据
            showaddUser: false, // 显示添加用户
            showrelieveUser: false, // 显示解除用户
            relieveUserMsg: null, // 显示解除用户数据
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            from: {
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
            this.Http.post(URL.PEOPLE_LIST,
                {
                    'params': {
                        'keywords': this.from.keywords,
                        'pageIndex': pageIndex,
                        'pageSize': pageSize
                    }
                }).then((re) => {
                    this.pageIndex = re.data.pageIndex;
                    this.pageSize = re.data.pageSize;
                    this.total = re.data.total;
                    if (re.data.rows.length > 0) {
                        this.tableDate = re.data.rows.map((item, index) => {
                            item.index = index + 1 + (pageIndex - 1) * pageSize;
                            switch (item.status) {
                            case '1':
                                item.statusx = '<span class="green">已启用</span>';
                                break;
                            case '2':
                                item.statusx = '<span class="red">已禁用</span>';
                                break;
                            case '3':
                                item.statusx = '<span class="gray">已删除</span>';
                                break;
                            default:
                                break;
                            }
                            item.orderSpecialist = item.orderSpecialist === '1' ? '是' : '否';
                            return item;
                        });
                    } else {
                        this.tableDate = [];
                    }
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
        // 重置
        reset () {
            this.pageIndex = 1;
            this.from.keywords = '';
            this.getList(1);
        }

    },
    mounted () {
        this.getList();
    },
    components: {
        pagination,
        // editUser,
        addUser
        // relieve
    }
};

</script>

<style lang="scss">

</style>
