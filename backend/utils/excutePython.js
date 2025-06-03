// // const {spawn} = require("child_process");
// // require("colors")
// // const executePython = async (script, args) => {
// //     const arguments = args.map(arg => arg.toString());
    
// //     // console.log("heeeloo3" + arguments);
// //     const py = spawn("python", [script, ...arguments]);
// //     // console.log("heeeloo4");

// //     const result = await new Promise((resolve, reject) => {
// //         let output = "";


// //         // Get output from python script
// //         py.stdout.on('data', (data) => {
// //             output += data;
// //         });

// //         // Handle erros
// //         py.stderr.on("data", (data) => {
// //             console.error(`[python] Error occured: ${data}`);
// //             reject(`Error occured in ${script}`);
// //         });

// //         py.on("exit", (code) => {

// //             console.log(`Child process exited with code ${code}`);
// //             // try {
// //             //     const parsedOutput = JSON.parse(output);
// //             //     resolve(parsedOutput);
// //             //     console.log(`Python Script is Successfully Executed`);
// //             //   } catch (parseError) {
// //             //     console.error(`Error parsing JSON: ${parseError}`);
// //             //     reject(`Error parsing JSON in ${script}`);
// //             //   }
// //             resolve(output)
// //             console.log(`Python Script is Successfully Executed`.bgWhite.bold);
// //         });
// //     });

// //     return result;
// // }

// // module.exports = executePython;


// const { spawn } = require("child_process");
// const fs = require('fs');
// const path = require('path');
// require("colors");

// const executePython = async (script, args) => {

//     const py = spawn("python", [script, args]);

//     const result = await new Promise((resolve, reject) => {
//         let output = "";

//         // Get output from python script
//         py.stdout.on('data', (data) => {
//             output += data;
//         });

//         // Handle errors
//         py.stderr.on("data", (data) => {
//             console.error(`[python] Error occurred: ${data}`);
//             reject(`Error occurred in ${script}`);
//         });

//         py.on("exit", (code) => {
//             console.log(`Child process exited with code ${code}`);
//             if (code === 0) {
//                 resolve(output);
//                 console.log(`Python Script is Successfully Executed`.bgWhite.bold);
//             } else {
//                 reject(`Python script exited with code ${code}`.bgRed);
//             }
//         });
//     });


//     return result;
// }

// module.exports = executePython;


const { spawn } = require("child_process");
require("colors");

const executePython = async (script, args) => {
    const arguments = args.map(arg => arg.toString());
    const py = spawn("python", [script, ...arguments]);

    const result = await new Promise((resolve, reject) => {
        let output = "";

        // Get output from python script
        py.stdout.on('data', (data) => {
            output += data;
        });

        // Handle errors
        py.stderr.on("data", (data) => {
            console.error(`[python] Error occurred: ${data}`.red);
            reject(`Error occurred in ${script}`);
        });

        py.on("exit", (code) => {
            console.log(`Child process exited with code ${code}`);
            if (code === 0) {
                resolve(output);
                console.log(`Python Script is Successfully Executed`.bgWhite.bold);
            } else {
                reject(`Python script exited with code ${code}`.bgRed.bold);
            }
        });
    });

    return result;
}

module.exports = executePython;

