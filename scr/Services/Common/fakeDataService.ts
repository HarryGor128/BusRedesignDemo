import BusStopName from '../../Constant/BusStopName';

const fakeDataService = {
    randomNumber(
        range: { min: number; max: number } = { min: 0, max: 100 },
        toFixed: number = 0,
    ): number {
        const random = Math.random() * (range.max - range.min + 1) + range.min;

        return Number(random.toFixed(toFixed));
    },

    randomLengthObjectList(
        data: any,
        maxLength: number = 500,
        filterKey?: string,
    ): any[] {
        let dataList: any[] = [];
        const listLength = this.randomNumber({ min: 1, max: maxLength });

        for (let i = 0; i < listLength; i++) {
            const newData = new data();

            if (
                filterKey &&
                dataList.find((item) => item[filterKey] === newData[filterKey])
            ) {
                continue;
            }

            dataList.push(newData);
        }

        return dataList;
    },

    randomLengthValueList(data: Function, noOverlap?: boolean): any[] {
        let dataList: any[] = [];
        const listLength = this.randomNumber();

        for (let i = 0; i < listLength; i++) {
            const newData = data();

            if (noOverlap && dataList.find((item) => item === newData)) {
                continue;
            }

            dataList.push(newData);
        }

        return dataList;
    },

    randomEngLetterGen(
        length: number = 1,
        letterCase: 'both' | 'upper' | 'lower' = 'both',
    ): string {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';

        let letters = '';
        switch (letterCase) {
            case 'upper':
                letters = upper;
                break;
            case 'lower':
                letters = lower;
                break;
            default:
                letters = upper + lower;
                break;
        }

        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            result += letters.charAt(randomIndex);
        }

        return result;
    },

    randomTrueFalse(): boolean {
        return Math.random() >= 0.5;
    },

    randomBusRouteName(): string {
        return this.randomTrueFalse()
            ? this.randomEngLetterGen(1, 'upper') +
                  this.randomNumber({ min: 1, max: 999 }).toString()
            : this.randomNumber({ min: 1, max: 999 }).toString();
    },

    randomBusStopName(): string {
        const index = this.randomNumber({
            min: 0,
            max: BusStopName.length - 2,
        });

        const name = BusStopName[index];

        return name;
    },
};

export default fakeDataService;
