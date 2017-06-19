//添加客户
<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="" title="员工权限配置" @ok="quire">
            <el-tree slot="content" :data="data2" show-checkbox node-key="id" :default-expand-all="true"  :default-checked-keys="defaultChecked" :props="defaultProps">
            </el-tree>
        </dailog>
    </section>
</template>   

<script>
'use strict';
const URL = {
    RIGHTS_LIST: 'ypt.open.right.findUserRights' // 所有可选权限
};
import dailog from '@/components/Dailog';
import { mapGetters } from 'vuex';
import { encryption, Validate } from '@/components/global.common';
export default {
    name: 'staff-permission',
    props: {
        showx: { // 显示
            type: Boolean,
            require: true
        },
        useMsg: {}
    },
    data () {
        return {
            myshow: false, // 是否显示弹框
            data2: {

            },
            defaultProps: {
                children: 'children',
                label: 'text'
            },
            defaultChecked: []
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
        // 确认
        quire () {

        },
        // 确认
        async getData () {
            await this.Http.post(URL.RIGHTS_LIST, {
                userNo: this.useMsg.userNo,
                appCode: 'YSCM',
                appRole: 'Supplier'
            }).then((re) => {
                if (re.data && re.data.length > 0) {
                    this.data2 = re.data;
                    this.formatChecked(this.data2);
                }
            });
        },
        formatChecked (data) {
            let checked = [];
            let listChecked = (data) => {
                for (let item of data) {
                    if (item.checked && item.isLeaf) {
                        checked.push(item.id);
                    }
                    if (!item.isLeaf) {
                        listChecked(item.children);
                    }
                }
            };
            listChecked(data);
            this.defaultChecked = checked;
            console.log(this.defaultChecked);
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
        this.getData().then(() => {
            this.myshow = this.showx;
        });
    },
    components: {
        dailog
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
