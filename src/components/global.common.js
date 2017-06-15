/**
 * 金额格式化
 * @param {*str} n
 */
export const parseMone = (n) => {
    let _str = '';
    if (isNaN(n)) {
        return;
    }
    let re = /^[0-9]*[1-9][0-9]*$/; // 判断是不是整数
    if (re.test(n) || n == 0) { //eslint-disable-line
        _str = parseNum(n) + '.00';
    } else {
        let k = '.' + n.toString().split('.')[1]; // 截取小数
        if (k.length <= 2) {
            k += '0';
        }
        k = k.substr(0, 3);
        let h = JSON.parse(n.toString().split('.')[0]);
        _str = parseNum(h) + k;
    }
    return _str;
};
/**
 * 每3位加个','
 * @param {*} num
 */
export const parseNum = (num) => {
    let list = new String(num).split('').reverse(); // eslint-disable-line no-new-wrappers
    for (var i = 0; i < list.length; i++) {
        if (i % 4 === 3) {
            list.splice(i, 0, ',');
        }
    }
    return list.reverse().join('');
};
/**
 *
 * @param {*文件上传支持的类型} item
 */
export const getFileType = (item) => {
    // 判断是否是图片
    let strFilter = ['jpeg', 'gif', 'jpg', 'png', 'bmp', 'pic'];
    let strPostfix;
    if (!item) {
        return null;
    }
    if (item.indexOf('.') > -1) {
        strPostfix = item.split('.').pop().toLowerCase();
        if (~strFilter.indexOf(strPostfix)) {
            return 'image';
        } else if (~['pdf'].indexOf(strPostfix)) {
            return 'pdf';
        } else {
            return 'false'; // 不支持的文件类型
        }
    }
    return null;
};
/**
 *
 * @param {*改变图片大小} src
 * @param {*} size
 */
export const changeImgSize = (src, size = '100x100') => {
    let i = src.lastIndexOf('.');
    return (src = src.substring(0, i) + '_' + size + src.substring(i));
};

/**
 * 密码加密处理
 */
import CryptoJS from '@/assets/js/aes/aes-min.min.js';
import SHA256 from '@/assets/js/sha256/sha256.min.js';
export const encryption = (password, clientid, token) => {
    let _encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(SHA256(password)), CryptoJS.enc.Utf8.parse(clientid), {
        iv: CryptoJS.enc.Utf8.parse(token),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Iso10126
    });
    return CryptoJS.enc.Base64.stringify(_encrypted.ciphertext);
};
