const average = (list) => {
    const emptyObject = {};
    for (const property in list[0]) {
        emptyObject[property] = 0;
    }

    const elementsSum = list.reduce((prev, curr) => {
        for (const property in prev) {
            prev[property] += curr[property];
        }
        return prev;
    }, emptyObject);

    const elementsAvg = {};
    for (const property in elementsSum) {
        elementsAvg[property] = elementsSum[property] / list.length;
    }
    return elementsAvg;
};

const first = (list) => {
    return list[0];
};

const last = (list) => {
    return list[list.length - 1];
};

const approximationFunctions = [
    {name: "average", function: average},
    {name: "first element", function: first},
    {name: "last element", function: last}
];

export default approximationFunctions;
