<template>
    <Modal
        v-model="$modal1"
        :width="$width"
        :title="$title"
        :closable="false" 
        :mask-closable="false"
        :loading="true"
        @on-ok="ok"
        :styles="{top: '100px'}"
        @on-cancel="cancel">
        <slot name='content1'></slot>
    </Modal>
</template>
<script>
    export default {
      name: 'Dailog',
      data () {
        return {
        }
      },
      props: ['$modal1', '$width', '$title'],
      methods: {
        ok () {
          this.$emit('ok')
        },
        cancel () {
          this.$emit('cancel')
        }
      }
    }
</script>
