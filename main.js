
function Rider() {
    this.fromX = 0;
    this.fromY = 0;

    this.toX = 0;
    this.toY = 0;

    this.fromStep = 0;
    this.toStep = 0;

    return this;
}

function Car() {
     this.x = 0;
     this.y = 0;
     this.booked = false;
     this.bookedBy = null;


     return this;
}

function main(inputData) {
    var maxSteps = inputData[0][5];
    var bonus = inputData[0][4];
    var grid = createEmptyGrid(inputData[0][0], inputData[0][1]);

    var cars = createNewCars(inputData[0][2]);

    var riders = [];

    for(var i = 1; i < inputData.length; i++) {
        var inputRow = inputData[i];
        riders[i - 1] = createNewRider(
            inputRow[0],
            inputRow[1],
            inputRow[2],
            inputRow[3],
            inputRow[4],
            inputRow[5]
        );
    }

    console.log(riders);
}

function createNewCars(amount) {
    var cars = new Array(amount);

    for (var i = 0; i < cars.length; i++) {
        cars[i] = new Car();
    }

    return cars;
}

function createNewRider(fromX, fromY, toX, toY, fromStep, toStep) {
    var rider = new Rider();
    rider.fromX = fromX;
    rider.fromY = fromY;
    rider.toX = toX;
    rider.toY = toY;
    rider.fromStep = fromStep;
    rider.toStep = toStep;

    return rider;
}

function createEmptyGrid(rows, cols) {
    var grid = new Array(rows);

    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(cols)
    }

    return grid;
}

function getFileDataByUrl () {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "inputData/a_example.in");
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.send();

    });
}

getFileDataByUrl().then(function(response) {
    var rowsArr = response.split('\n'),
        inputData = [];

    console.log(rowsArr);

    for (var i = 0; i < rowsArr.length; i++) {
        inputData.push(rowsArr[i].split(' '))

    }

    main(inputData);
});