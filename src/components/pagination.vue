/**分页插件*/
<template>
    <el-pagination
      @size-change="changeSize"
      @current-change="changePage"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</template>
<script>
    export default {
      name: 'pagination',
      data () {
        return {
          size: this.pageSize
        }
      },
        // 需要传的参数
      props: ['total', 'pageSize', 'pageIndex'],
      methods: {
        changePage (page) {
          console.log(page)
          this.$emit('getList', {pageIndex: page, pageSize: this.size})
        },
        changeSize (size) {
          this.size = size
          this.$emit('getList', {pageIndex: '1', pageSize: size})
        }
      }
    }
</script>
