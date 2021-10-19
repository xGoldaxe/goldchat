export function verifyDate({ day, mounth, year }) {
    const date = new Date();

    if (day.length > 2 || parseInt(day) > 31 || (parseInt(day) < 1 && day.length == 2)) {
        throw 'Bad format : DD / MM / YYYY';
    } else if (mounth.length > 2 || parseInt(mounth) > 12 || (parseInt(mounth) < 1 && mounth.length == 2)) {
        throw 'Bad format : DD / MM / YYYY';
    } else if (year.length > 4) {
        throw 'Bad format : DD / MM / YYYY';
    }
    return date;
}

export function verifyDateToday({ day, mounth, year }) {
    var date = verifyDate({day, mounth, year});
    if (parseInt(year) > date.getFullYear()) {
        throw 'Please take a past date';
    } else if (parseInt(year) == date.getFullYear()) {
        if (parseInt(mounth) > date.getMonth()) {
            throw 'Please take a past date';
        } else if (parseInt(mounth) == date.getMonth()) {
            if (parseInt(day) > date.getDay()) {
                throw 'Please take a past date';
            }
        }
    }
    return date;
}

export function verifyDateAge({ day, mounth, year }, age) {
    var message = `You must be ${age} years old`;
    var date = verifyDateToday({day, mounth, year});
    if (parseInt(year) > date.getFullYear() - age) {
        throw message;
    }
    if (parseInt(year) == date.getFullYear() - age) {
        if (parseInt(mounth) > date.getMonth()) {
            throw message;
        } else if (parseInt(mounth) == date.getMonth()) {
            if (parseInt(day) > date.getDay()) {
                throw message;
            }
        }
    }
}

export function verifyDateFull({ day, mounth, year }) {
    if (!(day.length == 2, mounth.length == 2, year.length == 4)) {
        return (false);
    }
    return (true);
}

export function verifyDateEmpty({ day, mounth, year }) {
    if (!(day.length == 0, mounth.length == 0, year.length == 0)) {
        return (false);
    }
    return (true);
}