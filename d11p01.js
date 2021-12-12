const input = `
5665114554
4882665427
6185582113
7762852744
7255621841
8842753123
8225372176
7212865827
7758751157
1828544563
`;

let octopuses = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));

const rc = octopuses.length;
const cc = octopuses[0].length;

let flashes = 0;

const makeStep = (octopuses) => {
    let _octopuses = Array.apply(null, { length: rc }).map(() => Array.apply(null, { length: cc }).map(() => 0));
    for (let ri = 0; ri < rc; ri++) {
        for (let ci = 0; ci < cc; ci++) {
            _octopuses[ri][ci] = octopuses[ri][ci] + 1;
        }
    }
    return _octopuses;
};

const isValid = (ri, ci) => {
    return ri >= 0 && ri < rc && ci >= 0 && ci < cc;
};

const updateLevels = (octopuses) => {
    let _octopuses = Array.apply(null, { length: rc }).map(() => Array.apply(null, { length: cc }).map(() => 0));
    let doUpdate = false;

    const incrementValue = (ri, ci) => {
        if (!isValid(ri, ci)) return;
        if (octopuses[ri][ci] < 10) {
            _octopuses[ri][ci] += 1;
        }
    };

    for (let ri = 0; ri < rc; ri++) {
        for (let ci = 0; ci < cc; ci++) {
            if (octopuses[ri][ci] === 10) {
                octopuses[ri][ci] = 100;
                incrementValue(ri - 1, ci - 1);
                incrementValue(ri - 1, ci);
                incrementValue(ri - 1, ci + 1);
                incrementValue(ri, ci + 1);
                incrementValue(ri + 1, ci + 1);
                incrementValue(ri + 1, ci);
                incrementValue(ri + 1, ci - 1);
                incrementValue(ri, ci - 1);
                flashes++;
            }
        }
    }

    for (let ri = 0; ri < rc; ri++) {
        for (let ci = 0; ci < cc; ci++) {
            _octopuses[ri][ci] = octopuses[ri][ci] + _octopuses[ri][ci];
            if (_octopuses[ri][ci] >= 10 && _octopuses[ri][ci] < 100) {
                _octopuses[ri][ci] = 10;
                doUpdate = true;
            }
        }
    }

    return [_octopuses, doUpdate];
};

for (let step = 0; step < 100; step++) {
    octopuses = makeStep(octopuses);
    let doUpdate = true;
    while (doUpdate) {
        [octopuses, doUpdate] = updateLevels(octopuses);
    }
    for (let ri = 0; ri < rc; ri++) {
        for (let ci = 0; ci < cc; ci++) {
            if (octopuses[ri][ci] >= 100) {
                octopuses[ri][ci] = 0;
            }
        }
    }
}

console.log({ flashes });
