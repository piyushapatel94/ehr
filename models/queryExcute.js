var oracledb = require('oracledb');
oracledb.autoCommit = true;


exports.dbconfig = (sqlQuery,params) => {
    return new Promise((resolve, reject) => {

        console.log(sqlQuery,params)
        oracledb.getConnection({
            user          : "EHRBCSTAGE",
        password      : "test123test",
        connectString : "exa03-scan.rajasthan.gov.in:1521/BMSTAGE"
        },
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                sqlQuery,params, // bind value for :id
                function(err, result) {
                    if (err) {
                        return resolve({code:400,
                            result:err
                            })
                       // console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    console.log(result)
                    return resolve({code:201,
                        result:result.rows,
                        rowsAffected:result.rowsAffected
                        })
                    doRelease(connection);
                });
        });
     
     })
}
function doRelease(connection) {
        connection.close(
            function(err) {
                if (err)
                    console.error(err.message);
            });
   
}


// exports.dbconfigForUpdate = (sqlQuery,params) => {
//     return new Promise((resolve, reject) => {

//         console.log(sqlQuery,params)
//         oracledb.getConnection({
//             user: "root",
//             password: "root",
//             connectString: "10.68.198.75:1522/xe"
//         },
//         function(err, connection) {
//             if (err) {
//                 console.error(err.message);
//                 return;
//             }
//             connection.execute(
//                 sqlQuery,params, // bind value for :id
//                 function(err, result) {
//                     if (err) {
//                         return reject({code:400,
//                             result:err
//                             })
//                        // console.error(err.message);
//                         doRelease(connection);
//                         return;
//                     }
//                     console.log(result)
//                     return resolve({code:201,
//                         result:result.rowsAffected
//                         })
//                     doRelease(connection);
//                 });
//         });
     
//      })
// }

// function doRelease(connection) {
//         connection.close(
//             function(err) {
//                 if (err)
//                     console.error(err.message);
//             });
   
// }
