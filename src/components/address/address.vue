<template>
    <div class="region-picker">
        <label class="province">
            <slot name="province"></slot>

            <el-select v-model="value_provinces" :placeholder="placeholder.province" class="province-select" 
           :required="required" :disabled="disabled"
            @change="change('provinceSelected', $event.target.value)"
           >
                <el-option v-for="item in provinces" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
            </el-select>










            <!--<select class="province-select" :value="provinceSelected" @change="change('provinceSelected', $event.target.value)" :required="required" :disabled="disabled">
                <option value="" v-text="placeholder.province"></option>
                <option v-for="item in provinces" :value="item" v-text="item[1]"></option>
            </select>-->
        </label>
        <label class="city" v-show="!auto || cities.length">
             <el-select v-model="value_city"  class="city-select" 
            @change="change('citySelected', $event.target.value)" :required="required && cities.length > 0" :disabled="disabled">
                <el-option v-for="item in cities" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
            </el-select>









            <slot name="city"></slot>
            <!--<select class="city-select" :value="citySelected" @change="change('citySelected', $event.target.value)" :required="required && cities.length > 0" :disabled="disabled">
                <option value="" v-text="placeholder.city"></option>
                <option v-for="item in cities" :value="item" v-text="item[1]"></option>
            </select>-->
        </label>
        <label class="district" v-if="!twoSelect" v-show="!auto || districts.length">
            <slot name="district"></slot>

 <el-select v-model="value_district"  class="district-select" 
            @change="change('districtSelected', $event.target.value)" :required="required && districts.length > 0" :disabled="disabled">
                <el-option v-for="item in districts" :key="item.label" :label="item.label" :value="item.value">
                </el-option>
            </el-select>


            <!--<select class="district-select" :value="districtSelected" @change="change('districtSelected', $event.target.value)" :required="required && districts.length > 0" :disabled="disabled">
                <option value="" v-text="placeholder.district"></option>
                <option v-for="item in districts" :value="item" v-text="item[1]"></option>
            </select>-->
        </label>
    </div>
</template>
<script>
export default {
    name: 'adderss',
    data () {
        return {
            current: {
                province: '',
                city: '',
                district: ''

            },
            value_provinces: '',
            value_city: '',
            value_district: ''
        };
    },
    watch: {
        province () {
            this.current.province = '';
        },
        city () {
            this.current.city = '';
        },
        district () {
            this.current.district = '';
        }
    },
    props: {
        province: {},
        city: {},
        regions: {}, //
        vueVersion: {}, //
        district: {},
        twoSelect: Boolean,
        auto: Boolean,
        completed: Boolean,
        required: Boolean,
        disabled: Boolean,
        rootCode: {
            default: '86'
        },
        placeholder: {
            type: Object,
            default () {
                return {
                    province: '请选择',
                    city: '请选择',
                    district: '请选择'
                };
            }
        }
    },
    methods: {
        change (field, value) {
            console.log(field, value);
            this[field] = value.split(',');
            if (this.completed) {
                this.$emit('onchange', {
                    province: this.provinceSelected,
                    city: this.citySelected,
                    district: this.districtSelected
                });
            } else {
                this.$emit('onchange', {
                    province: this.provinceSelected[1],
                    city: this.citySelected[1],
                    district: this.districtSelected[1]
                });
            }
        },
        _filter (pid) {
            console.log(pid);
            const result = [];
            const items = this.regions[pid];
            for (let code in items) {
                result.push([parseInt(code, 10), items[code]]);
            }
            return result;
        },
        // data model: [code, name]
        _searchIndex (items, model, by) {
            if (!model) return -1;
            // by name
            if (by === 1) {
                for (let key in items) {
                    if (items[key][by].indexOf(model) > -1) {
                        return key;
                    }
                }
                // by code
            } else {
                for (let key in items) {
                    if (items[key][by] === model) {
                        return key;
                    }
                }
            }
        },
        _selected (pid, model) {
            const items = this._filter(pid);
            let index = -1;
            if (typeof model === 'string') {
                index = this._searchIndex(items, model, 1);
            } else if (typeof model === 'number') {
                index = this._searchIndex(items, Number(model), 0);
            } else if (Array.isArray(model)) {
                index = this._searchIndex(items, Number(model[0]), 0);
            }
            return items[index] || [];
        }
    },
    computed: {
        provinces () {
            return this._filter(this.rootCode).map((item, index) => ({
                value: item[0],
                label: item[1]
            }));
        },
        cities () {
            return this._filter(this.provinceSelected[0]).map((item, index) => ({
                value: item[0],
                label: item[1]
            }));
        },
        districts () {
            return this._filter(this.citySelected[0]).map((item, index) => ({
                value: item[0],
                label: item[1]
            }));
        },
        isVueNext () {
            return true;
        },
        provinceSelected: {
            get () {
                return this._selected(this.rootCode, this.current.province || this.province);
            },
            set (value) {
                if (!this.isVueNext) {
                    this.province = this.completed ? value : value[1];
                } else {
                    this.current.province = value;
                }
            }
        },
        citySelected: {
            get () {
                return this._selected(this.provinceSelected[0], this.current.city || this.city);
            },
            set (value4) {
                if (!this.isVueNext) {
                    this.city = this.completed ? value4 : value4[1];
                } else {
                    this.current.city = value;
                }
            }
        },
        districtSelected: {
            get () {
                return this._selected(this.citySelected[0], this.current.district || this.district);
            },
            set (value5) {
                if (!this.isVueNext) {
                    this.district = this.completed ? value5 : value5[1];
                } else {
                    this.current.district = value;
                }
            }
        }
    }
};
</script>
