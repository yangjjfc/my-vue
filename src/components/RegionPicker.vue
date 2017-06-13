<template>
    <section>
        <!--工具条-->
        <el-row>
            <el-col :span="24">
                <FileUpload :files="files" :max='3' classx="cert" ></FileUpload>
            </el-col> 
            <el-col :span="24">
                <Region-picker></Region-picker>
            </el-col> 
        </el-row>
    </section>
</template>
<script>
import FileUpload from '@/components/FileUpload';
import RegionPicker from '@/components/RegionPicker';
export default {
    data () {
        return {
            files: ['s2/M00/25/3D/rB4r9Vk-TUqAC75HAA096mkXPAU869.bmp', 's2/M00/25/3D/rB4r9Vk-TUqAC75HAA096mkXPAU869.bmp']
        };
    },
    components: {
        FileUpload,
        RegionPicker
    }
};

</script>


<style lang="scss">

</style>
