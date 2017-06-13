<template>
    <div>
       <adderss
       :regions="region1"
       :vueVersion="vueVersion"
  :province="region.province"
  :city="region.city"
  :district="region.district"
  >
</adderss>
    </div>
</template>
<script type="text/javascript">
import adderss from '@/components/address/address';
import REGION_DATA from 'china-area-data';
export default {
    data () {
        return {
            region: {
                province: '广东', // you can set initial value or not.
                city: 440100, // by code or name.
                district: ''
            },
            region1: REGION_DATA,
            vueVersion: 2

        };
    },
    methods: {
        change (msg) {
            this.region = msg;
        }

    },
    computed () {
    },
    components: {
        adderss
    }
};
</script>
