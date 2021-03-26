var mysql = require('mysql')

let options = {
    host: "localhost",
    user: "root",
    password: "3q3q3q123",
    database: "millionquestions"
  }

let con = mysql.createConnection(options);

con.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log("连接成功");
    }
})

function sqlQuery(strSql,arr){
    return new Promise(function(resolve,reject){
        con.query(strSql,arr,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

module.exports = sqlQuery;