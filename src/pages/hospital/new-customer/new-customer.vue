

<template>
    <section>
        <!--工具条-->
        <el-row>
            <el-col :span="24">
                <File-upload :files="files" :max='3' classx="cert" ></File-upload>
            </el-col> 
            <el-col :span="24">
                <Region-picker></Region-picker>
            </el-col> 
             <el-col :span="24">
                <date-picker ></date-picker>
            </el-col> 
        </el-row>
    </section>
</template>
<script>
import FileUpload from '@/components/FileUpload';
import datePicker from '@/components/datePicker';
import RegionPicker from '@/components/address/RegionPicker';
export default {
    data () {
        return {
            files: ['s2/M00/25/3D/rB4r9Vk-TUqAC75HAA096mkXPAU869.bmp', 's2/M00/25/3D/rB4r9Vk-TUqAC75HAA096mkXPAU869.bmp'],
            disabledDate: ''

        };
    },
    methods: {
        changeTime1 (val) {
           // this.disabledDate = this.$refs.dates.value.getTime();
        }
    },
    components: {
        FileUpload,
        RegionPicker,
        datePicker
    }
};

</script>


<style lang="scss">

</style>
