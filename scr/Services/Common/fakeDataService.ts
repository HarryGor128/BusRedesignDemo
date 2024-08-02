const fakeDataService = {
    randomNumber(
        range: { min: number; max: number } = { min: 0, max: 100 },
        toFixed: number = 0,
    ) {
        const random = Math.random() * (range.max - range.min + 1) + range.min;

        return Number(random.toFixed(toFixed));
    },

    randomLengthList(data: any, filterKey?: string): any[] {
        let dataList: any[] = [];
        const listLength = this.randomNumber();

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

    randomEngLetterGen(length: number = 1) {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * letters.length);
            result += letters.charAt(randomIndex);
        }

        return result;
    },
};

export default fakeDataService;
