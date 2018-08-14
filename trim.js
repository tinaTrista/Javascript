/**
 * isKong 判断字符串是否为空
 * @param {string} test 测试字符串
 * @author lisa
 * @returns {boolean} true 为空
 */
function isKong (test) {
    const str = test.trim();
    if (str.length === 0) {
        return true;
    }
}
isKong('  ');
