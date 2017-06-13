import RegionPicker from './initAddress';

export { RegionPicker };
export default function install (Vue, { region, vueVersion }) {
    RegionPicker.region = region;
    RegionPicker.vueVersion = vueVersion || 1;
    Vue.component(RegionPicker.name, RegionPicker);
}
