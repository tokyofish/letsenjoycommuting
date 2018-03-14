var globalTimeFlag = false;
var allPassenger = 0;
function countUpTimer(targetId) {
    if (globalTimeFlag) return;
    globalTimeFlag = true;
    $('#today-title').addClass('fadeOut');
    var hour = 5;
    var minute = 0;
    setTimeout(recursiveTimer, 100, targetId, hour, minute);
}
function recursiveTimer(targetId, hour, minute) {
    minute++;
    if (minute > 59) {
        hour++;
        minute = 0;
        $('#today-train').append($('<br clear="left">'));
    }
    if (hour > 11) {
        console.log(allPassenger);
        return;
    }
    if (isTrainTime(hour, minute)) {
        setTrain(hour, minute);
    }
    $('#' + targetId).html(hour + ':' + (minute < 10 ? '0' + minute : minute));
    setTimeout(recursiveTimer, 100, targetId, hour, minute);
}
function setTrain(hour, minute) {
    var name = 'train_' + hour + minute;
    var percent = calculateRate(hour, minute);
    allPassenger += percent;
    var width = 0;
    if (percent < 50) {
        width = 3;
    } else if (percent < 100) {
        width = 7;
    } else {
        width = 12;
    }
    var div = $('<div></div>').attr({
        id: name,
        style: 'display: inline',
    })
    var img = $('<img>').attr({
        src: assets_path('img/train.png'),
        width: width + '%',
        style: 'float: left',
    });
    var span = $('<span></span>').attr({
        style: 'float: left; font-size: ' + 40 * width / 12 + '%; margin-left: -3em;',
    });
    span.html(percent + '%');
    div.append(img);
    div.append(span);
    $('#today-train').append(div);
}
function isTrainTime(hour, minute) {
    return Object.keys(departureFromMusashiUrawa['at' + hour]).includes('at' + minute);
}
function assets_path(filePath) {
    return 'assets/' + filePath;
}
function calculateRate(hour, minute) {
    var passenger = passengerFromBeginning[departureFromMusashiUrawa['at' + hour]['at' + minute]['from']][hour];
    return parseInt((passenger / Object.keys(departureFromMusashiUrawa['at' + hour]).length) / 540 * 100);
}
var departureFromMusashiUrawa = {
    "at5": {
        "at2": { "minute": 2, "from": "Omiya" },
        "at10": { "minute": 10, "from": "Sashiogi" },
        "at22": { "minute": 22, "from": "Kawagoe" },
        "at30": { "minute": 30, "from": "Sashiogi" },
        "at38": { "minute": 38, "from": "Sashiogi" },
        "at48": { "minute": 48, "from": "Sashiogi" },
        "at56": { "minute": 56, "from": "Kawagoe" },
    },
    "at6": {
        "at2": { "minute": 2, "from": "Omiya" },
        "at8": { "minute": 8, "from": "MinamiFuruya" },
        "at14": { "minute": 14, "from": "Omiya" },
        "at19": { "minute": 19, "from": "Kawagoe", rapid: true },
        "at22": { "minute": 22, "from": "Sashiogi" },
        "at28": { "minute": 28, "from": "Omiya" },
        "at34": { "minute": 34, "from": "Sashiogi" },
        "at38": { "minute": 38, "from": "Kawagoe" },
        "at41": { "minute": 41, "from": "MusashiUrawa" },
        "at44": { "minute": 44, "from": "Omiya" },
        "at50": { "minute": 50, "from": "Kawagoe", rapid: true },
        "at52": { "minute": 52, "from": "Sashiogi" },
        "at56": { "minute": 56, "from": "Omiya" },
    },
    "at7": {
        "at1": { "minute": 1, "from": "MusashiUrawa" },
        "at7": { "minute": 7, "from": "Kawagoe", rapid: true },
        "at8": { "minute": 8, "from": "Sashiogi" },
        "at13": { "minute": 13, "from": "Omiya" },
        "at18": { "minute": 18, "from": "Kawagoe", rapid: true },
        "at20": { "minute": 20, "from": "MusashiUrawa" },
        "at24": { "minute": 24, "from": "Sashiogi" },
        "at27": { "minute": 27, "from": "Omiya" },
        "at33": { "minute": 33, "from": "Kawagoe", rapid: true },
        "at35": { "minute": 35, "from": "MusashiUrawa" },
        "at38": { "minute": 38, "from": "Sashiogi" },
        "at41": { "minute": 41, "from": "Omiya" },
        "at44": { "minute": 44, "from": "MusashiUrawa" },
        "at50": { "minute": 50, "from": "Kawagoe", rapid: true },
        "at52": { "minute": 52, "from": "Sashiogi" },
        "at56": { "minute": 56, "from": "Omiya" },
    },
    "at8": {
        "at0": { "minute": 0, "from": "MusashiUrawa" },
        "at5": { "minute": 5, "from": "Kawagoe", rapid: true },
        "at6": { "minute": 6, "from": "Sashiogi" },
        "at10": { "minute": 10, "from": "MusashiUrawa" },
        "at14": { "minute": 14, "from": "Omiya" },
        "at19": { "minute": 19, "from": "Kawagoe", rapid: true },
        "at22": { "minute": 22, "from": "Sashiogi" },
        "at26": { "minute": 26, "from": "Omiya" },
        "at29": { "minute": 29, "from": "MusashiUrawa" },
        "at35": { "minute": 35, "from": "Kawagoe", rapid: true },
        "at37": { "minute": 37, "from": "Omiya" },
        "at49": { "minute": 49, "from": "Kawagoe", rapid: true },
        "at50": { "minute": 50, "from": "Omiya" },
        "at56": { "minute": 56, "from": "MusashiUrawa" },
    },
    "at9": {
        "at3": { "minute": 3, "from": "Kawagoe", rapid: true },
        "at4": { "minute": 4, "from": "Omiya" },
        "at12": { "minute": 12, "from": "Omiya" },
        "at22": { "minute": 22, "from": "Kawagoe", rapid: true },
        "at23": { "minute": 23, "from": "MusashiUrawa" },
        "at32": { "minute": 32, "from": "Omiya" },
        "at42": { "minute": 42, "from": "Kawagoe", rapid: true },
        "at43": { "minute": 43, "from": "Omiya" },
        "at51": { "minute": 51, "from": "Omiya" },
    },
    "at10": {
        "at2": { "minute": 2, "from": "Kawagoe", rapid: true },
        "at4": { "minute": 4, "from": "Omiya" },
        "at13": { "minute": 13, "from": "Omiya" },
        "at23": { "minute": 23, "from": "Kawagoe", semiRapid: true },
        "at25": { "minute": 25, "from": "Omiya" },
        "at32": { "minute": 32, "from": "Omiya" },
        "at41": { "minute": 41, "from": "Kawagoe", semiRapid: true },
        "at42": { "minute": 42, "from": "Omiya" },
        "at51": { "minute": 51, "from": "Omiya" },
    },
    "at11": {
        "at1": { "minute": 1, "from": "Kawagoe", semiRapid: true },
        "at2": { "minute": 2, "from": "Omiya" },
        "at12": { "minute": 12, "from": "Omiya" },
        "at21": { "minute": 21, "from": "Kawagoe", semiRapid: true },
        "at22": { "minute": 22, "from": "Omiya" },
        "at29": { "minute": 29, "from": "Omiya" },
        "at41": { "minute": 41, "from": "Kawagoe", semiRapid: true },
        "at42": { "minute": 42, "from": "Omiya" },
        "at51": { "minute": 51, "from": "Omiya" },
    },
};
// Refer to http://www.jreast.co.jp/passenger/index.html
var passengerFromBeginning = {
    "MusashiUrawa": {
        5: 234,
        6: 704,
        7: 4695,
        8: 4695,
        9: 704,
        10: 234,
        11: 234,
    },
    "Omiya": {
        5: 1145,
        6: 3437,
        7: 22916,
        8: 22916,
        9: 3437,
        10: 1145,
        11: 1145,
    },
    "Sashiogi": {
        5: 1115,
        6: 3345,
        7: 22303,
        8: 22303,
        9: 3345,
        10: 1115,
        11: 1115,
    },
    "MinamiFuruya": {
        5: 1162,
        6: 3488,
        7: 23254,
        8: 23254,
        9: 3488,
        10: 1162,
        11: 1162,
    },
    "Kawagoe": {
        5: 1412,
        6: 4237,
        7: 28249,
        8: 28249,
        9: 4237,
        10: 1412,
        11: 1412,
    },
};
