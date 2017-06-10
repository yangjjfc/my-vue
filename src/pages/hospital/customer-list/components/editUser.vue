<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="eidt-user" title="编辑联系人" @ok="ok" @cancel="cancel">
            <el-form slot="content" ref="edits" label-width="100px" class="demo-dynamic" :model="msgx">
                <el-form-item label="医院名称" >
                    <p v-text="msgx.customerName"></p>
                </el-form-item>
                <el-form-item label="联系人" prop="linkman" 
                :rules="[{ required: true, message: '请输入联系人', trigger: 'blur' }]">
                    <el-input placeholder="联系人" v-model="msgx.linkman"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone" :rules="[
              { required: true, message: '请输入联系电话', trigger: 'blur' },
              { pattern:/^1\d{10}$/, message: '请输入正确的联系电话', trigger: 'blur,change'}]">
                    <el-input placeholder="联系电话" v-model="msgx.phone"></el-input>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>

<script>
const URls = {
    'modCustomerlinkman': 'scm.supplier.modCustomerlinkman'
};
import dailog from '@/components/Dailog';
export default {
    name: 'editUser',
    props: ['showx', 'msg'],
    data () {
        return {
            myshow: this.showx,
            msgx: this.msg
        };
    },
    computed: {

    },
    methods: {
        ok () {
            this.$refs.edits.validate((valid) => {
                if (!valid) {
                    return false;
                } else {
                    this.Http.post(URls.modCustomerlinkman, {
                        params: {
                            customerNo: this.msgx.customerNo,
                            linkman: this.msgx.linkman,
                            phone: this.msgx.phone,
                            supplierNo: this.msg.supplierNo
                        }
                    }).then((re) => {
                        if (re.data) {
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$emit('refsh');
                        }
                    });
                    this.myshow = false;
                    this.$refs.edits.resetFields();
                }
            });
        },
        cancel () {
            this.$refs.edits.resetFields();
        }
    },
    watch: {
        showx (val, oldval) {
            this.myshow = this.showx;
        },
        myshow (val, oldval) {
            if (oldval && !val) {
                this.$emit('update:showx', false);
            }
        },
        msg () {
            console.log('1');
            this.msgx = this.msg;
        }
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
