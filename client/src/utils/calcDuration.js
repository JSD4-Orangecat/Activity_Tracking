export function calcDuration(inputs) {
    const tStart = inputs.timeStart;
    const tEnd = inputs.timeEnd;

    const toMilliseconds = (time) => Number(time.split(":")[0]) * 60 * 60 * 1000 + Number(time.split(":")[1]) * 60 * 1000;

    let difference = Math.abs(toMilliseconds(tEnd) - toMilliseconds(tStart));

    if (toMilliseconds(tEnd) < toMilliseconds(tStart)) {
        difference = 86400000 - difference;
    }

    let msec = difference;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    let displayHour = hh + " h";
    let displayMin = mm + " m";

    let hour;
    let min;

    if (hh === 0) {
        hour = "";
        min = displayMin;
    } else if (mm === 0) {
        hour = displayHour;
        min = "";
    } else if (hh > 0 && mm > 0) {
        hour = displayHour;
        min = displayMin;
    } else {
        hour = "0 h";
        min = "0 m";
    }

    let calculateDuration = `${hour} ${min}`;
    return { ...inputs, duration: calculateDuration };
}