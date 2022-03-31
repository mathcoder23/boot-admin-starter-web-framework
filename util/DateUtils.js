if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
let format = (date, fmt) => {
    let ret;
    let opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
        ;
    }
    ;
    return fmt;
}
let dateFormat = (date) => {
    if ('number' === typeof date) {
        date = new Date(date)
    } else if (null === date) {
        return '-'
    }
    return format(date, 'YYYY-mm-dd')
}
let datetimeFormat = (date) => {
    if ('number' === typeof date) {
        date = new Date(date)
    } else if (null === date) {
        return '-'
    }
    let dt = format(date, 'YYYY-mm-dd HH:MM:SS')
    if ('1970-01-01 08:00:00' === dt) {
        return '-'
    }
    return dt
}
let datetimeFormat2 = (date) => {
    if ('number' === typeof date) {
        date = new Date(date)
    }
    let dt = format(date, 'YYYY/mm/dd HH:MM:SS')
    if ('1970-01-01 08:00:00' === dt) {
        return '-'
    }
    return dt
}
let getMonthFirstByDate = (date) => {
    date.setDate(1);
    return getDayStartByDate(date);
}
let getMonthEndByDate = (date) => {
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    return date;
}
let getMonthEndDayEndByDate = (date) => {
    return getDayEndByDate(getMonthEndByDate(date))
}
let getDayStartByDate = (date) => {
    date.setHours(0, 0, 0, 0)
    return date;
}
let getDayEndByDate = (date) => {
    date.setHours(23, 59, 59, 0)
    return date;
}
export const DateUtils = {
    getMonthFirstByDate: getMonthFirstByDate,
    getMonthEndByDate: getMonthEndByDate,
    getMonthEndDayEndByDate: getMonthEndDayEndByDate,
    dateFormat: dateFormat,
    datetimeFormat2: datetimeFormat2,
    datetimeFormat: datetimeFormat,
    format: format,
    getDayEndByDate: getDayEndByDate,
    getDayStartByDate: getDayStartByDate
}
