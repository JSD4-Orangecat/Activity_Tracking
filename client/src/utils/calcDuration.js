export function calcDuration(inputs) {
    const toMilliseconds = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
    };

    let difference = Math.abs(toMilliseconds(inputs.timeEnd) - toMilliseconds(inputs.timeStart));

    if (toMilliseconds(inputs.timeEnd) < toMilliseconds(inputs.timeStart)) {
        difference = 86400000 - difference;
    }

    let hh = Math.floor(difference / 1000 / 60 / 60);
    let mm = Math.floor((difference / 1000 / 60) % 60);

    let hour = hh > 0 ? hh + " h" : "";
    let min = mm > 0 ? mm + " m" : "";

    if (hh === 0 && mm === 0) {
        min = "0 m";
    }

    let calculateDuration = `${hour} ${min}`;
    return { ...inputs, duration: calculateDuration };
}