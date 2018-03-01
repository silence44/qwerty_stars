/**
 * Created by denys on 01.03.18.
 */

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

function main() {
    var maxSteps = 10;

    var grid = createEmptyGrid(3, 4);

    var cars = createNewCars(2);

    var riders = [];

    riders[0] = createNewRider(0, 0, 2, 3, 2, 9);
    riders[1] = createNewRider(1, 2, 1, 0, 0, 9);
    riders[2] = createNewRider(2, 0, 2, 2, 0, 9);

    console.log(cars)
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
main();