
function Rider() {
    this.id = 0;
    this.fromX = 0;
    this.fromY = 0;

    this.toX = 0;
    this.toY = 0;

    this.fromStep = 0;
    this.toStep = 0;

    this.bookedBy = null;

    return this;
}

function Car(id) {
     this.id = id;
     this.x = 0;
     this.y = 0;
     this.bookedBy = null;
     this.bookedStepsLeft = 0;

     this.assignedRiders = [];

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
            i - 1,
            inputRow[0],
            inputRow[1],
            inputRow[2],
            inputRow[3],
            inputRow[4],
            inputRow[5]
        );
    }


    for(var step = 0; step < maxSteps; step++) {

        riders = sortRidersByPriority(riders, cars);

        for(var j = 0; j < riders.length; j++) {
            var rider = riders[j];
            if (rider.bookedBy !== null) {
                continue;
            }

            var closestCar = findClosestCar(cars, riders);

            if (closestCar === null) {
                continue;
            }
            assignCarToRider(closestCar, rider);
        }

        reduceBookedStepForCars(cars, riders)
    }


    console.log(collectResult(cars))
}

function sortRidersByPriority(riders, cars) {
    return riders.sort(function (rider) {
        var closestCar = findClosestCar(cars, [rider]);

        if (closestCar) {
            return rider.fromStep - calcDistanceFrom(closestCar, rider)
        }

        return 0

    });
}
function collectResult(cars) {
    return cars.map(function (car) {
        if (!car.assignedRiders.length) {
            return "0";
        }
        var ridesString = car.assignedRiders.join(" ");

        var ridesAmountString = car.assignedRiders.length;

        return ridesAmountString + " " + ridesString;
    }).join("\n");
}

function reduceBookedStepForCars(cars, riders) {
    for (var i = 0; i < cars.length; i++) {
        var car = cars[i];
        if (car.bookedBy === null) {
            continue;
        }

        car.bookedStepsLeft = car.bookedStepsLeft - 1;

        if (car.bookedStepsLeft === 0) {
           car.x = riders[car.bookedBy].toX;
           car.y = riders[car.bookedBy].toY;
           car.bookedBy = null;
        }
    }
}
function assignCarToRider(car, rider) {
    car.assignedRiders.push(rider.id);
    car.bookedBy = rider.id;
    rider.bookedBy = car.id;
    var a = calcDistanceFrom(car, rider);
    var b = calcDistanceRide(rider);
    car.bookedStepsLeft =  a + b;
}


function findClosestCar(cars, rider){

    var filteredCars = cars.filter(function (car) {
        return car.bookedBy === null
    });

    if (!filteredCars.length) {
        return null
    }

    return filteredCars.sort(function (previousValue, currentValue) {
        return calcDistanceFrom(previousValue, rider) - calcDistanceFrom(currentValue, rider)
    })[0];

}

function calcDistanceFrom(car, rider) {
    return Math.abs(car.x - rider.fromX) + Math.abs(car.y - rider.fromY);
}

function calcDistanceRide(rider) {
    return Math.abs(rider.fromX - rider.toX) + Math.abs(rider.fromY - rider.toY);
}


function createNewCars(amount) {
    var cars = new Array(amount);

    for (var i = 0; i < amount; i++) {
        cars[i] = new Car(i);
    }

    return cars;
}

function createNewRider(id, fromX, fromY, toX, toY, fromStep, toStep) {
    var rider = new Rider();
    rider.id = id;
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