import { DateTime } from 'luxon';

import DateFormat from './DateFormat';

const dateConverter = {
    today() {
        return DateTime.now().toFormat(DateFormat.YYYYMMDD);
    },

    now() {
        return DateTime.now().toFormat(DateFormat.YYYYMMddHHmm);
    },

    nowFileName() {
        return DateTime.now().toFormat(DateFormat.FileName);
    },

    nowDateObj() {
        return DateTime.now();
    },

    nowUnixTime() {
        return Math.round(DateTime.now().toSeconds());
    },

    dateStringToUnixTime(dateString: string, format: DateFormat) {
        return Math.round(DateTime.fromFormat(dateString, format).toSeconds());
    },

    unixTimeToDateString(
        unixTime: number,
        format: DateFormat = DateFormat.YYYYMMDD,
    ) {
        return DateTime.fromSeconds(unixTime).toFormat(format);
    },

    getAge(date: string | number, format: DateFormat = DateFormat.YYYYMMDD) {
        let birthDate;

        // Check if input is a number (Unix time) or a string (date string)
        if (typeof date === 'number') {
            // Unix time is in seconds
            birthDate = DateTime.fromSeconds(date);
        } else {
            birthDate = DateTime.fromFormat(date, format);
        }

        let now = DateTime.now();
        let age = now.diff(birthDate, 'years').years;

        // Round down the age
        let roundedAge = Math.floor(age);

        return roundedAge;
    },

    dateStringToDateObj(
        dataString: string,
        format: DateFormat = DateFormat.YYYYMMDD,
    ) {
        return DateTime.fromFormat(dataString, format);
    },

    unixTimeToDateObj(date: number) {
        return DateTime.fromSeconds(date);
    },

    dateObjToUnixTime(date: DateTime<true>) {
        return Math.round(date.toSeconds());
    },

    dateObjToDateString(
        date: DateTime<true>,
        format: DateFormat = DateFormat.YYYYMMDD,
    ) {
        return date.toFormat(format);
    },

    unixTimeDurationInDay(unixTime: number) {
        return Math.round(
            this.nowDateObj()
                .until(this.unixTimeToDateObj(unixTime))
                .toDuration('days').days,
        );
    },

    chatRoomDateFormat(unixTime: number) {
        const timeDuration = this.unixTimeDurationInDay(unixTime);

        if (timeDuration < 365) {
            return DateFormat.YYYYMMddHHmm;
        }

        return DateFormat.MMDDHHmm;
    },
};

export default dateConverter;
