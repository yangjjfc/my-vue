//基本的dailog弹框组件
<template>
    <section>
        <el-dialog :title="title" :visible.sync="shows" :size="size" :custom-class="classx" :close-on-click-modal="close" :close-on-press-escape="close" :before-close="cancel">
            <slot name='content'></slot>
            <span slot="footer" class="dialog-footer" >
                <el-button @click.sync="cancel">关闭</el-button>
                <el-button type="primary" @click="ok" v-if="!hide">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'table',
    data () {
        return {
            shows: this.show, // 是否显示dailog
            close: false   // 禁用某些操作
        };
    },
    props: ['show', 'title', 'size', 'classx', 'hide'],
    methods: {
        // 确认事件
        ok () {
            this.$emit('ok');
        },
        // 取消事件
        cancel () {
            this.shows = false;
            this.$emit('update:show', false); // 更新父组件shows
            this.$emit('reset');
        }
    },
    watch: {
        show (val, oldval) {
            this.shows = this.show; // 监听show的变化
        }
    }
};

</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
