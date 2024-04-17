exports.hasFlag = function hasFlag(number, flag) {
    return (number & flag) === flag;
}
