<template>

    <div class="block" v-if="fulltime">
        <el-date-picker v-model="value_sta" 
        :type="type" placeholder="开始日期" 
        :picker-options="pickerOptions_sta" 
        :readonly="readonly" :editable="editable" 
        @change="dateChangeTime_sta"
        ref="startTime" size="small" :class="classx">
        </el-date-picker>
        <slot name="between"></slot>
        <el-date-picker v-model="value_end" 
        :type="type" placeholder="结束日期" 
        :picker-options="pickerOptions_end" 
        :readonly="readonly" :editable="editable" 
        @change="dateChangeTime_end"
         ref="endTime" size="small" :class="classx">
        </el-date-picker>
  </div>
</template>
<script>
// return time.getTime() < Date.now() - 8.64e7; 只能选今天之后的时间
export default {
    name: 'datePicker',
    data () {
        return {
            pickerOptions_sta: {}, // 开始时间
            pickerOptions_end: {}, // 结束时间
            value_sta: '', // 开始值
            value_end: '', // 结束值
            disabledDate_sta: '', // 开始禁用区域
            disabledDate_end: '' // 结束禁用区域
        };
    },
    props: {
        placeholder: {},
        readonly: { // 只读
            type: Boolean,
            default () {
                return false;
            }
        },
        editable: { // 是否可编辑
            type: Boolean,
            default () {
                return false;
            }
        },
        type: { // 日期类型
            type: String,
            default () {
                return 'date';
            }
        },
        fulltime: { // 开始结束都有
            type: Boolean,
            default () {
                return true;
            }
        },
        classx: String // 自定义class
    },

    watch: {
        // 开始禁用区域
        disabledDate_sta (val) {
            this.pickerOptions_sta = {
                disabledDate (time) {
                    return time.getTime() > val;
                }
            };
        },
        // 结束禁用区域
        disabledDate_end (val) {
            this.pickerOptions_end = {
                disabledDate (time) {
                    return time.getTime() < val;
                }
            };
        }
    },
    methods: {
        // 开始
        dateChangeTime_sta (val) {
            this.disabledDate_end = this.$refs.startTime.value;
            this.$emit('changeTime_sta', val);
        },
        // 结束
        dateChangeTime_end (val) {
            this.disabledDate_sta = this.$refs.endTime.value;
            this.$emit('changeTime_end', val);
        }
    }
};
</script>
