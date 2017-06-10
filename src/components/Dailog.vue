<template>
    <section>
        <el-dialog :title="title" :visible.sync="shows" :size="size" :custom-class="classx" :close-on-click-modal="close" :close-on-press-escape="close">
            <slot name='content'></slot>
            <span slot="footer" class="dialog-footer">
                <el-button @click.sync="cancel">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'table',
    data () {
        return {
            shows: this.show,
            close: false
        };
    },
    props: ['show', 'title', 'size', 'classx'],
    computed: {
    },
    methods: {
        ok () {
            this.$emit('ok');
        },
        cancel () {
            this.shows = false;
            this.$emit('update:show', false);
            this.$emit('cancel');
        }
    },
    watch: {
        show (val, oldval) {
            this.shows = this.show;
        }
    },
    mounted () {
    },
    components: {
    }
};

</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
