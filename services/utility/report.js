const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const fs = require('fs');

exports.generateCsv = function (data, env) {

    var path = env + '-list.csv';

    var filePath = './public/' + path;

    fs.stat(filePath, function (err, stats) {

        console.log("path ", filePath);

        console.log(stats);//here we got all information of file in stats variable

        if (stats) {

            fs.unlink(filePath, function (err) {

                if (err) return console.log(err);

                console.log('file deleted successfully');

            });

        }

        const csvWriter = createCsvWriter({

            path: './public/' + path,

            header: [

                { id: 'name', title: 'NAME' },

            ]

        });

        var records = [];

        data.forEach((data) => {

            records.push({ name: data });

        })

        csvWriter.writeRecords(records) // returns a promise

            .then(() => {

                console.log('...Done');

            });

    });

    return path;

}