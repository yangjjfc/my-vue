//添加客户
<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="eidt-user" title="添加客户" hide="true">
            <el-row slot="content">
                <el-col :span="24">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-input placeholder="添加客户" class="w300" v-model="keywords"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="view(1)">筛选</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="24">
                    <el-table :data="msgx" border style="width: 100%">
                        <el-table-column label="客户">
                            <template scope="scope">
                                <ul class="customerName_content">
                                    <li>
                                        <img src="http://dfs.test.cloudyigou.com/dfs/s2/M00/25/39/rB4r9Vk3mwWAdctcAAFf5pjzdHU212_100x100.jpg" class="img_logo" />
                                    </li>
                                    <li>
                                        <p class="ellipsis">{{scope.row.enterpriseName}}</p>
                                    </li>
                                </ul>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="80" align="center">
                            <template scope="scope">
                                <ul class="customerName_content">
                                    <span class="Success" v-if="scope.row.finsh">已申请</span>
                                    <el-button size="mini" v-else type="text" @click="applyFor(scope.row,scope.$index)">申请</el-button>
                                </ul>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="24" class="toolbar">
                 <pagination :total="total" :pageSize="pageSize" :pageIndex="pageIndex" @change="view"></pagination>
                </el-col>
            </el-row>
        </dailog>
    </section>
</template>   

<script>
const URL = {
    'queryChoosedCustomers': 'scm.supplier.queryChoosedCustomers',
    'applyCustomer': 'scm.supplier.applyCustomer'
};
import dailog from '@/components/Dailog';
import {mapState} from 'vuex';
import pagination from '@/components/pagination';
export default {
    name: 'addUser',
    props: ['showx'],
    data () {
        return {
            myshow: this.showx, // 是否显示弹框
            msgx: null, // 数据
            keywords: '',
            pageIndex: 1,
            pageSize: 10,
            total: 20
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        // 确认
        getData (pageIndex = this.pageIndex, pageSize = this.pageSize) {
            return this.Http.post(URL.queryChoosedCustomers, {
                params: {
                    keywords: this.keywords,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }
            });
        },
        // 查询
        view (x, y) {
            this.getData(x, y).then((re) => {
                this.pageIndex = re.data.pageIndex;
                this.pageSize = re.data.pageSize;
                this.total = re.data.total;
                if (re.data.rows) {
                    this.msgx = re.data.rows;
                }
            });
        },

        // 重置bug,模拟异步解决
        reset () {
            this.keywords = '';
            this.view(1);
        },
        // 申请
        applyFor ({enterpriseNo}, index) {
            this.Http.post(URL.applyCustomer, {
                params: {
                    customerNo: enterpriseNo,
                    supplierNo: this.userInfo.enterpriseNo
                }
            }).then((re) => {
                if (re.data) {
                    this.msgx[index].finsh = true;
                    this.$emit('refresh', 1, 20);
                }
            });
        }
    },
    watch: {
        showx (val, oldval) {
            if (val) {
                this.getData().then((re) => {
                    this.pageIndex = re.data.pageIndex;
                    this.pageSize = re.data.pageSize;
                    this.total = re.data.total;
                    if (re.data.rows) {
                        this.msgx = re.data.rows.map((item) => {
                            item.finsh = false;
                            return item;
                        });
                    }
                    this.myshow = this.showx;
                });
            }
        },
        myshow (val, oldval) {
            if (oldval && !val) {
                this.$emit('update:showx', false);
            }
        }
    },
    components: {
        dailog,
        pagination
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-form-item {
    margin-bottom: 22px;
}
</style>
