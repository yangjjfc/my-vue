//编辑用户电话和联系人
<template>
    <section>
        <dailog size="tiny" :show.sync="myshow"  title="解除关系" @ok="ok" >
            <el-form slot="content" ref="edits" label-width="100px" class="demo-dynamic" :model="msgx">
                <el-form-item label="客户名称" >
                    <p v-text="msgx.customerName"></p>
                </el-form-item>
                <el-form-item label="解除原因" prop="relieve"   
                :rules="[{ required: true, message: '请输入解除原因', trigger: 'blur' }]">
                    <el-input type="textarea" v-model="msgx.relieve"  :rows="4"></el-input>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>

<script>
const URL = {
    'replyCustomer': 'scm.supplier.replyCustomer'
};
import dailog from '@/components/Dailog';
export default {
    name: 'relieve',
    props: ['showx', 'msg'],
    data () {
        return {
            myshow: false, // 是否显示弹框
            msgx: {
                customerName: '',
                relieve: ''
            }// 数据
        };
    },
    methods: {
        // 确认
        ok () {
            this.$refs.edits.validate((valid) => {
                if (!valid) {
                    return false;
                } else {
                    this.Http.post(URL.replyCustomer, {
                        params: {
                            customerNo: this.msg.customerNo,
                            reason: this.msgx.relieve,
                            status: 3,
                            supplierNo: this.msg.supplierNo
                        }
                    }).then((re) => {
                        if (re.code === 'SUCCESS') {
                            this.$notify({
                                title: '成功',
                                message: '解除成功',
                                type: 'success'
                            });
                            this.$emit('refresh');
                            this.myshow = false;
                        }
                    });
                }
            });
        }
    },
    watch: {
        myshow (val, oldval) {
            if (oldval && !val) {
                this.$emit('update:showx', false);
            }
        }
    },
    beforeMount () {
        this.msgx = this.msg;
        this.myshow = this.showx;
    },
    components: {
        dailog
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-form-item {
    margin-bottom: 22px;
}
</style>
