//添加客户
<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="staff-add-user"  title="添加客户" @ok="quire">
            <el-form slot="content" :rules="rules" ref="forms" label-width="100px" class="demo-dynamic" :model="msgx">
                <el-form-item label="登录账号" prop="loginAccount">
                   <el-input placeholder="登录账号"  v-model="msgx.loginAccount" size="small"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" >
                    <el-input placeholder="密码" type="password" v-model="msgx.password" size="small"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repassword" >
                    <el-input placeholder="重复密码" type="password" v-model="msgx.repassword" size="small"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userName" >
                    <el-input placeholder="真实姓名" v-model="msgx.userName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobilePhone" >
                    <el-input placeholder="手机号码" v-model="msgx.mobilePhone" size="small"></el-input>
                </el-form-item>
                <el-form-item label="订单专员" prop="isSms" >
                    <el-checkbox  name="type" size="small" v-model="msgx.orderSpecialist"></el-checkbox>
                    <span class="tips">授权的客户下单时将会发送短信通知</span>
                </el-form-item>
                 <el-form-item label="电子邮箱" prop="email" >
                    <el-input placeholder="电子邮箱" v-model="msgx.email" size="small"></el-input>
                </el-form-item>
                 <el-form-item label="身份证号码" prop="idcard" >
                    <el-input placeholder="身份证号码" v-model="msgx.idcard" size="small"></el-input>
                </el-form-item>
                 <el-form-item label="身份证照片" prop="idcardCertImg" >
                    <template scope="scope">
                        <el-input placeholder="身份证照片" v-model="msgx.idcardCertImg" size="small" v-show="false"></el-input>
                        <file-upload :files="files" :max="max" classx="staff-adduser-img" @getUrl="getUrl"></file-upload>
                        <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                    </template>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>   

<script>
const URL = {
    ADD: 'ypt.open.user.createUserForWeb', // 查询员工列表
    EXISTEMAIL: 'ypt.open.user.isExistEmailForWeb', // 判断邮箱是否存在
    ISEXIST: 'ypt.open.user.isExistMobileForWeb', // 判断手机号是否存在
    isExistUserByLoginAccountForWeb: 'ypt.open.user.isExistUserByLoginAccountForWeb'
};
import dailog from '@/components/Dailog';
import fileUpload from '@/components/FileUpload';
import { mapGetters } from 'vuex';
import {encryption} from '@/components/global.common';
export default {
    name: 'staff-addUser',
    props: {
        showx: {
            type: String
        },
        type: {
            type: Number
        }
    },
    data () {
        let validateloginAccount = async (rule, value, callback) => {
            if (this.send_status) {
                await this.Http.post(URL.isExistUserByLoginAccountForWeb, {
                    loginAccount: this.msgx.loginAccount
                }).then((re) => {
                    if (re.data) {
                        this.loginAccount_state = false;
                        callback(new Error('用户名已存在'));
                    } else {
                        this.loginAccount_state = true;
                        callback();
                    }
                });
            } else if (!this.loginAccount_state) {
                callback(new Error('用户名已存在'));
            } else {
                this.loginAccount_state = true;
                callback();
            }
        };
        let validatePassword = (rule, value, callback) => {
            if (value.length <= 20 && value.length >= 6) {
                this.$refs.forms.validateField('repassword');
                callback();
            }
        };
        let validateRePassword = (rule, value, callback) => {
            if (value.length && value !== this.msgx.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
         // 手机
        let validatePhone = async (rule, value, callback) => {
            if (this.send_status && value.length > 0) {
                await this.Http.post(URL.ISEXIST, {
                    params: this.msgx.mobilePhone
                }).then((re) => {
                    if (re.data) {
                        this.phone_state = false;
                        callback(new Error('该手机号已占用'));
                    } else {
                        this.phone_state = true;
                        callback();
                    }
                });
            } else if (!this.phone_state) {
                callback(new Error('该手机号已占用'));
            } else {
                this.phone_state = true;
                callback();
            }
        };
        // 邮箱
        let validateEmail = async (rule, value, callback) => {
            if (this.send_status && value.length > 0) {
                await this.Http.post(URL.EXISTEMAIL, {
                    params: this.msgx.email
                }).then((re) => {
                    if (re.data) {
                        this.malis_state = false;
                        callback(new Error('该邮箱已占用'));
                    } else {
                        this.malis_state = true;
                        callback();
                    }
                });
            } else if (!this.malis_state) { // 提交时验证处理
                callback(new Error('该邮箱已占用'));
            } else {
                this.malis_state = true;
                callback();
            }
        };
        return {
            myshow: false, // 是否显示弹框
            malis_state: true,
            phone_state: true,
            loginAccount_state: true,
            send_status: true,
            msgx: {
                loginAccount: '',
                password: '',
                repassword: '',
                userName: '',
                email: '',
                idcard: '',
                mobilePhone: '',
                idcardCertImg: '',
                orderSpecialist: false
            }, // 数据
            files: [],
            max: 2,
            rules: {
                loginAccount: [
                    { required: true, message: '请输入登录账号', trigger: 'blur,change' },
                    { pattern: /^\S{6,20}$/, message: '仅支持数字、字母、下划线“_”，长度6-20位', trigger: 'blur,change' },
                    { validator: validateloginAccount, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { pattern: /^\S{6,20}$/, message: '新密码长度在6-20个字符之间', trigger: 'blur,change' },
                    { validator: validatePassword, trigger: 'blur,change' }
                ],
                repassword: [
                    { required: true, message: '请输入重复密码', trigger: 'blur' },
                    { validator: validateRePassword, trigger: 'blur,change' }
                ],
                userName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                      { pattern: /^\S{0,30}$/, message: '真实姓名不能超过30个字符', trigger: 'blur,change' }
                ],
                mobilePhone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                      { pattern: /^1[34578]\d{9}$/, message: '手机号码格式有误,不能超过11个字符', trigger: 'blur,change' },
                      { validator: validatePhone, trigger: 'blur' }
                ],
                email: [
                     { pattern: /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{5,50}$/, message: '电子邮箱格式不正确,长度5-50字符之间', trigger: 'blur,change' },
                     { validator: validateEmail, trigger: 'blur' }
                ],
                idcard: [
                     { pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '身份证号码格式不正确,长度18个字符', trigger: 'blur,change' }
                ]
            }
        };
    },
    computed: {
        ...mapGetters([
            'userno',
            'token',
            'clientid'
        ])
    },
    methods: {
        quire () {
            this.send_status = false;
            this.$refs.forms.validate((valid) => {
                this.send_status = true;
                if (!valid) {
                    return false;
                } else {
                    this.Http.post(URL.ADD, {
                        params: {
                            userName: this.msgx.userName,
                            mobilePhone: this.msgx.mobilePhone,
                            email: this.msgx.email,
                            idcard: this.msgx.idcard,
                            isSms: 1,
                            idcardCertImg: this.msgx.certList,
                            appCode: 'YSCM',
                            loginAccount: this.msgx.loginAccount,
                            password: encryption(this.msgx.password, this.clientid, this.token),
                            orderSpecialist: this.msgx.orderSpecialist ? '0' : '1'
                        }
                    }).then((re) => {
                        if (re.data) {
                            this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success'
                            });
                            this.myshow = false;
                            this.$emit('refresh');
                        }
                    });
                }
            });
        },
        // 确认
        async getData (pageIndex = this.pageIndex, pageSize = this.pageSize) {
            return await this.Http.post(URL.ADD, {
                params: {
                    keywords: this.keywords,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }
            });
        },
        // 查询
        async view (x, y) {
            return await this.getData(x, y).then((re) => {
                this.pageIndex = re.data.pageIndex;
                this.pageSize = re.data.pageSize;
                this.total = re.data.total;
                if (re.data.rows) {
                    this.msgx = re.data.rows.map((item) => {
                        item.finsh = false;
                        return item;
                    });
                }
            });
        },
        getUrl (data) {
            this.msgx.certList = data;
            if (data.length > 0) {
                this.msgx.idcardCertImg = '123';
            } else {
                this.msgx.idcardCertImg = '';
            }
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
        this.myshow = this.showx;
    },
    components: {
        dailog,
        fileUpload
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.demo-dynamic{
    width: 80%
}
.staff-adduser-img{
    height: 100px;
}
</style>
