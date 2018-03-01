
function main() {
    var fileData;

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
            outputData = [];

        console.log(rowsArr);

        for (var i = 0; i < rowsArr.length; i++) {
            outputData.push(rowsArr[i].split(' '))

        }
       
        console.log(outputData)
    })
}

main();