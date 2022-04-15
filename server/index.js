const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3");
const fileUpload = require('express-fileupload');
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 1919;
const fs = require('fs');
const path = require("path");
const { parse } = require("path");
require('dotenv').config();
path.join(__dirname, './Images')
app.use("/Images", express.static(path.join(__dirname, '/Images')));
app.use(express.static('public'))
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(cookieParser())
// const dealy = 1000*60*60*24
// app.use(sessions({
//   secret:"Su[pposed",
//   name:"nfpc Session",
//   cookie:{maxAge:dealy}
// }))


const db = new sqlite3.Database(process.env.Database, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to db");
});
let userMail

app.post('/Login', function (req, res) {
  db.get('SELECT * FROM userdetails where Email_Id=? AND password=?;', [req.body.Email_Id,req.body.password], function(err, rows){
    
    try{
      if(rows.Email_Id == req.body.Email_Id && rows.password==req.body.password){
         userMail=rows.Email_Id;
        res.send(true)
        const d = new Date()
        const hrs = d.getHours()
        
        const mins= d.getMinutes()
        const millsec = d.getSeconds()
        const dt = d.getDate()
        const mnth = d.getMonth()
        const yer = d.getFullYear()
        const logoutLogger = `UPDATE userdetails SET Logout_Time=?  Where Logout_Time IS NULL AND Login_Time IS NOT NULL `
        db.run(logoutLogger,[`${dt}/${mnth+1}/${yer} ${hrs}:${mins}:${millsec}`],()=>{
        })
        const updateLogger = `UPDATE userdetails SET Login_Time=?  Where Email_Id=?` 
        db.run(updateLogger,[`${dt}/${mnth+1}/${yer} ${hrs}:${mins}:${millsec}`,userMail],()=>{
        })
        const updateloggerlogout = `UPDATE userdetails SET Logout_Time=? Where Email_Id=?`
        db.run(updateloggerlogout,[,userMail],()=>{
        })
        return
      }
    }catch(err){
      res.send(false)
      console.log(err)
    }
  })
})
// const checkSignIn = (req,res,next)=>{
//   console.log(req.session)
//   if(req.session.userName){
//     console.log(req.session)
//     try{
//       next()
//     }catch(err){
//       console.log(err)
//     }
//   }
//   else{
//     console.log("User does not exist")
//     next()
//     return

//   }
// }

app.get('/logout',function(req,res){
  const d = new Date()
  const hrs = d.getHours()
  const mins= d.getMinutes()
  const millsec = d.getMilliseconds()
  const dt = d.getDate()
        const mnth = d.getMonth()
        const yer = d.getFullYear()
  if(userMail){
    const updateLogger = `UPDATE userdetails SET Logout_Time=? Where Email_Id=?`
    db.run(updateLogger,[`${hrs}:${mins}:${millsec} ${dt}-${mnth}-${yer}`,userMail],()=>{
      console.log("updated")
    })
    res.send(true)
}

 userMail=""
})

app.post("/changepassword",(req,res) =>{
  let data=[req.body.Email_Id,req.body.password,req.body.Newpassword,req.body.reenternewpassword]
  console.log(data)
  db.get(`SELECT * FROM userdetails where Email_Id=? and password=?`, [req.body.Email_Id,req.body.password], function(err, rows) {
    try{
    if(rows.Email_Id == req.body.Email_Id && rows.password==req.body.password){
      if(req.body.Newpassword==req.body.reenternewpassword)
    db.run(`UPDATE userdetails SET password = ? WHERE Email_Id = ?`,[req.body.Newpassword,req.body.Email_Id],function(err, urows){
      console.log("password is changed")
      res.send(true)
    })
    else {
      console.log("password is not changed") 
      res.send(false)
    }
  }
  else {
    console.log("password is not changed")
    res.send(false)
  }  
} 
catch(err){
  console.log('invalid crendentials')
  res.send(false)
}
  })
  
  });
  
  
  



// below is for upload model
app.post('/uploadfile', (req, res) => {
  const modelname=req.body.value
  const folder = `./modelfiles/${modelname}`
if (!fs.existsSync(folder)){
    fs.mkdirSync(folder, { recursive: true });
}
  if (!req.files) {
    console.log("failed");
      return res.status(500).send({ msg: "file is not found" })
     
  }
  const File=req.files.file;
  let Path=`${__dirname}/${folder}/${File.name}`
  let date = new Date().getDate() +  "/" +    (new Date().getMonth() + 1) +    "/" +    new Date().getFullYear()
 // Use the mv() method to place the file somewhere on your server
  File.mv(`${Path}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "error" });
      }else{
        db.all(`insert into Modelstatuslist(Model,Version,Last_Update,Status,File_Path) values(?,?,?,"Inactive",?)`,[req.body.value,req.body.version,date,`${Path}`],
         function(err,uploadata) {
           if(uploadata){
  db.run(`insert into System_Threshold (Scratches,Foreign_Particles,Discoloration,Model)values(?,?,?,?)` ,["0%","0%","0%",modelname])
            res.send(true)}
            else{
              res.send(false)
            }
  
          })
          // res.send(false)
      // return res.send({ file: File.name, path: `/${File}`, ty: File.type });
       
      }
      // res.send(false)
  });
})


 



app.post("/updatestatus" , (req,res) =>{
   db.serialize(function(){
   db.all(`UPDATE Modelstatuslist  SET Status = ? WHERE Status = ? `,["Inactive","Active"])
   db.all(`UPDATE Modelstatuslist  SET Status = ? WHERE Sl_No = ? `,["Active",req.body.Sl_No],["Active"],function(err,statusrows){
     res.send(statusrows)
   }
   )}
   );
    
    });

    app.post("/modeldata" , (req,res) =>{
       db.serialize(function(){
       db.all(`SELECT * from Modelstatuslist WHERE Model=?`,[req.body.Model],function(err,modelrows){
         res.send(modelrows)
       }
       )}
       );
        
        });
        app.post("/modelclicked" , (req,res) =>{
          db.serialize(function(){
          db.all(`SELECT * from System_Threshold WHERE Model=?`,[req.body.Modelc],function(err,modelc){
            res.send(modelc)
          }
          )}
          );
           
           });
 
app.post("/defectlogdaydata",(req, res) => {
  let dlfilters = [];
  let dlbottletypes = []
 let {from,to,limit,skip} = req.body
 

  for (const [dlkey, dlvalue] of Object.entries(req.body.filterConditions)) {
    if (dlvalue) {
      dlfilters.push(dlkey);
    } 
  }
  // if(dlfilters.includes("typeA")){
  //   dlbottletypes.push("typeA")
  // }else{
  //   dlbottletypes.push("")
  // }
  // if(dlfilters.includes("typeB")){
  //   dlbottletypes.push("typeB")
  // }else{
  //   dlbottletypes.push("")
  // }
   if(dlfilters.includes("Discoloration")){
    dlbottletypes.push("Discoloration")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Scratches")){
    dlbottletypes.push("Scratches")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Foreign Particles")){
    dlbottletypes.push('Foreign Particles')
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Others")){
    dlbottletypes.push('Others')
  }else{
    dlbottletypes.push("")
  }

  let sqlString = `SELECT SNO,Time_Stamp,Defect,Defect_Type,Image,Score1,Mark_False_Positive FROM Defect_Log WHERE  Time_Stamp BETWEEN ? AND ? AND Defect_Type IN (?,?,?,?) LIMIT ? OFFSET  ?;`
  db.all(sqlString,[`${from}`,`${to+1}`,...dlbottletypes,`${limit}`,`${skip}`],(err,drows)=>{
    if(err){
      console.log(err)
    }
    res.send(drows) 
  })
  console.log(dlbottletypes) 
})
  
// defectlog table rendering
app.post('/defectfilternextpage', (req,res) => {
  let dlfilters = [];
  let dlbottletypes = []
 let {from,to,limit,skip} = req.body
 

  for (const [dlkey, dlvalue] of Object.entries(req.body.filterConditions)) {
    if (dlvalue) {
      dlfilters.push(dlkey);
    } 
  }
  // if(dlfilters.includes("typeA")){
  //   dlbottletypes.push("typeA")
  // }else{
  //   dlbottletypes.push("")
  // }
  // if(dlfilters.includes("typeB")){
  //   dlbottletypes.push("typeB")
  // }else{
  //   dlbottletypes.push("")
  // }
   if(dlfilters.includes("Discoloration")){
    dlbottletypes.push("Discoloration")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Scratches")){
    dlbottletypes.push("Scratches")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Foreign Particles")){
    dlbottletypes.push('Foreign Particles')
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Others")){
    dlbottletypes.push('Others')
  }else{
    dlbottletypes.push("")
  }
  let sqlString = `SELECT SNO,Time_Stamp,Defect,Defect_Type,Image,Score1,Mark_False_Positive FROM Defect_Log WHERE  Time_Stamp BETWEEN ? AND ? AND Defect_Type IN (?,?,?,?) LIMIT ? OFFSET  ?;`
  db.all(sqlString,[`${from}`,`${to+1}`,...dlbottletypes,`${limit}`,`${skip}`],(err, dlnrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(dlnrows);
  })


});

app.post('/defectfilterpreviouspage', (req,res) => {
  let dlfilters = [];
  let dlbottletypes = []
 let {from,to,limit,skip} = req.body
 
console.log(`${skip}`)
  for (const [dlkey, dlvalue] of Object.entries(req.body.filterConditions)) {
    if (dlvalue) {
      dlfilters.push(dlkey);
    } 
  }
  // if(dlfilters.includes("typeA")){
  //   dlbottletypes.push("typeA")
  // }else{
  //   dlbottletypes.push("")
  // }
  // if(dlfilters.includes("typeB")){
  //   dlbottletypes.push("typeB") 
  // }else{
  //   dlbottletypes.push("")
  // }
   if(dlfilters.includes("Discoloration")){
    dlbottletypes.push("Discoloration")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Scratches")){
    dlbottletypes.push("Scratches")
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Foreign Particles")){
    dlbottletypes.push('Foreign Particles')
  }else{
    dlbottletypes.push("")
  }
  if(dlfilters.includes("Others")){
    dlbottletypes.push('Others')
  }else{
    dlbottletypes.push("")
  }
 
  let sqlString = `SELECT SNO,Time_Stamp,Defect,Defect_Type,Image,Score1,Mark_False_Positive FROM Defect_Log WHERE  Time_Stamp BETWEEN ? AND ? AND Defect_Type IN (?,?,?,?) LIMIT ? OFFSET  ?;`
  db.all(sqlString,[`${from}`,`${to+1}`,...dlbottletypes,`${limit}`,`${skip}`],(err, dlfrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(dlfrows);
    console.log(dlfrows )
  })

});
// end
app.post('/historyfilter', (req,res) => {
  let value = (req.body.skip);
  // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
  db.all(`select * from History_Log where Time_Stamp BETWEEN ? AND ? ORDER BY Sl_No DESC LIMIT ? OFFSET?  `,[req.body.from,req.body.to+1,req.body.limit,value],(err, hfrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(hfrows); 
  })

});

app.post('/historyfilternextpage', (req,res) => {
  let value = (req.body.skip);
  // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
  db.all(`select * from History_Log where Time_Stamp BETWEEN ? AND ? ORDER BY Sl_No DESC LIMIT ? OFFSET  ?`,[req.body.from,req.body.to,req.body.limit,value],(err, hfnrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(hfnrows);
  })

});

app.post('/historyfilterpreviouspage', (req,res) => {
  let value = (req.body.skip);
  // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
  db.all(`select * from History_Log where Time_Stamp BETWEEN ? AND ? ORDER BY Sl_No DESC LIMIT ? OFFSET  ?`,[req.body.from,req.body.to,req.body.limit,value],(err, hfrows) => {
   
    if (err) {
      throw err;
    }
    
    res.send(hfrows);
  })

});


  app.post('/historydaydata', (req,res) => {
    let value = (req.body.skip);
    // let filterdata = `select * from historylog where Sl_No BETWEEN ? AND ?`;
   db.all(`select * from History_Log where Time_Stamp BETWEEN ? AND ? ORDER BY Sl_No DESC LIMIT ? OFFSET ?  `,[req.body.from,req.body.to+1,req.body.limit,value],(err, hdrows) => {
      
     //db.all(`select * from historylog (MULTISET (SELECT SKIP ? FIRST ?) where Time_Stamp BETWEEN ? AND ?  `,[req.body.skip,req.body.limit,req.body.from,req.body.to],(err, hdrows) => {
      if (err) {
        throw err;
      }
      
      res.send(hdrows);
    })

  });
  //end 
// edit data in system thershold in below
app.post('/edit' , function(req,res){
  let data = [req.body.store.Scratches + "%",req.body.store.ForeignParticles + "%",req.body.store.Discoloration + "%" ,req.body.Sl_No];
  let sql = `UPDATE System_Threshold SET Scratches = ?, Foreign_Particles=?, Discoloration=? WHERE Sl_No = ?`;

    db.all(sql, data, function(err,edit){
    if (err) {
      return console.error(err.message);
    }
    if(edit)
    {return console.log(edit);}
  
  });
  });
  
  // edit data in system thershold in above
  // amar---update
  // defectlog table rendering
app.post("/defectlog", (req, res) => {
  const sql3 = `Select * from Defect_Log where Time_Stamp between ? and ?`;
  db.all(sql3,[String(req.body.from),String(req.body.to)], (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.send(rows);

  });
});
// defectlog table rendering
// app.get('/fetchImage/:file(*)', (req, res) => {
//   let file = req.params.file;
//   let fileLocation = path.join('../Images/', file);
//   //res.send({image: fileLocation});
//   res.sendFile(`${fileLocation}`)
// })


app.post("/markfalsepositiveto1",(req,res) =>{
  let data = [1,req.body.SNO];//removed Sl_No
  let sql = `UPDATE Defect_Log SET Mark_False_Positive = ? WHERE SNO = ?`;

    db.run(sql, data, function(err,edit){
    if (err) {
      return console.error(err.message);
    }
   res.send(edit) ;
  
  });
});
app.post("/markfalsepositiveto0",(req,res) =>{
  let data = [0,req.body.SNO];//removed Sl_No
  let sql = `UPDATE Defect_Log SET Mark_False_Positive = ? WHERE SNO = ?`;

    db.run(sql, data, function(err,edit){
    if (err) {
      return console.error(err.message);
    }
    res.send(edit);
  
  });
});


  //amar

// system threshold table renedering
app.get('/table',  (req, res) => {
db.get(`SELECT Model from Modelstatuslist WHERE Status=?`,["Active"],(err,model) => {
  if(model){
  let sql = `SELECT * from System_Threshold WHERE Model=?`;
  // let Sno = ; 
 let modelname=model.Model
  // first row only
  db.all(sql, modelname ,(err, rows) => {
    if (err) {
      throw err;
    }
  res.send(rows);
  });
}
else {
  throw err;
}
});
  });
// system threshold table renedering


//model status table rendering
app.get('/status',  (req, res) => {
  let sql = `SELECT * from Modelstatuslist ORDER BY Status=?  DESC`;
  
  // first row only
  db.all(sql,["Active"], (err, rowm) => {
    if (err) {
      
      throw err;
    }
  
    res.send(rowm);
    
  });
  });
  
app.post('/tableseevlues',(req,res) => {
   let sql = `SELECT * from System_Threshold WHERE Model=?`;
   db.all(sql, req.body.model ,(err, rows) => {
     if (err) { throw err;}
     else{res.send(rows); 
  }})
    ;})


//model status table rendering

app.get("/data", async (req, res) => {
  let filters = [];
  let bottletypes = []
  const chartData =[]
 const x = new Date()
  let givenDate = `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()-1}`
  let nextDate =`${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`
  // 

  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      filters.push(key);
    } 
  }
  if(filters.includes("typeA")){
    bottletypes.push("typeA")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("typeB")){
    bottletypes.push("typeB")
  }else{
    bottletypes.push("")
  }
   if(filters.includes("Discoloration")){
    bottletypes.push("Discoloration")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Scratches")){
    bottletypes.push("Scratches")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Foreign Particles")){
    bottletypes.push('Foreign Particles')
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Others")){
    bottletypes.push('Others')
  }else{
    bottletypes.push("")
  }

  let sqlString1 = `SELECT date(Time_Stamp),SUM(count) as TotalCount FROM (SELECT Time_Stamp, Defect_Type,COUNT(*) as count FROM Defect_Log WHERE Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?,?)  GROUP BY Defect_Type,Time_Stamp) GROUP BY date(Time_Stamp);`
await  db.all(sqlString1,[`${givenDate}`,`${nextDate}`,"typeA","typeB","Discoloration","Foreign Particles","Scratches","Others"],async(err,rows)=>{
    if(err){
      console.log(err)
      return
    }
    await chartData.push(rows)
  })
  
  let sqlString = `SELECT Defect_Type,COUNT(*) as count FROM Defect_Log WHERE Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?,?)  GROUP BY Defect_Type;`

  await db.all(sqlString,[`${givenDate}`,`${nextDate}`,"typeA","typeB","Discoloration","Foreign Particles","Scratches","Others"],async(err,rows)=>{

    if(err){

      console.log(err)
    }
   await chartData.push(rows)
   
  })
   let barDataQuary = `   SELECT Defect_Type,Bottle_Type,COUNT(*) as count FROM Defect_Log Where Time_Stamp BETWEEN ? AND ? AND Bottle_Type IN(?,?) AND Defect_type IN(?,?,?,?)  GROUP BY Defect_Type,Bottle_Type;`
   await db.all( barDataQuary,[`${givenDate}`,`${nextDate}`,"typeA","typeB","Discoloration","Foreign Particles","Scratches","Others"],async(err,rows)=>{
    if(err){
      console.log(err)
    }
    await chartData.push(rows)
    res.send(chartData)
  })

});

app.post("/data/filter",async (req, res) => {
  let filters = [];
  let bottletypes = []
  const chartData =[]
 let {fromDate,toDate} = req.body


  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      filters.push(key);
    } 
  }
  // if(filters.includes("typeA")){
  //   bottletypes.push("typeA")
  // }else{
  //   bottletypes.push("")
  // }
  
   if(filters.includes("Discoloration")){
    bottletypes.push("Discoloration")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Scratches")){
    bottletypes.push("Scratches")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Foreign Particles")){
    bottletypes.push('Foreign Particles')
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Others")){
    bottletypes.push("Others")
  }else{
    bottletypes.push("")
  }
  console.log(fromDate)
  console.log(toDate)
  console.log(bottletypes)
  console.log("req rec")
  
  let sqlString1 = `SELECT date(Time_Stamp) as TimeStamp ,SUM(count) as TotalCount FROM (SELECT Time_Stamp, Defect_Type,COUNT(*) as count FROM Defect_Log WHERE Time_Stamp BETWEEN ? AND ? AND Defect_Type IN (?,?,?,?)  GROUP BY Defect_Type,Time_Stamp) GROUP BY date(Time_Stamp);`
let  sqlString= `SELECT Defect_Type,COUNT(*) as count FROM Defect_Log WHERE Time_Stamp BETWEEN ? AND ? AND Defect_Type IN (?,?,?,?)  GROUP BY Defect_Type;`
let barDataQuary = `SELECT Defect_Type,COUNT(*) as count FROM Defect_Log Where Time_Stamp BETWEEN ? AND ? AND Defect_type IN(?,?,?,?)  GROUP BY Defect_Type;`

db.serialize(()=>{ 
  let queryResult=[]
     db.all(sqlString,[`${fromDate}`,`${toDate+1}`,...bottletypes],async (err,rows)=>{

      if(err){
  
        console.log(err)
      }
    queryResult.push([...rows])
    }).all(sqlString1,[`${fromDate}`,`${toDate+1}`,...bottletypes],async (err,rows)=>{

      if(err){
  
        console.log(err)
      }
      
    queryResult.push([...rows])
    }).all( barDataQuary,[`${fromDate}`,`${toDate+1}`,...bottletypes],async (err,rows)=>{

      if(err){
  
        console.log(err)
      }
    queryResult.push([...rows])
    res.send(queryResult)
console.log(queryResult)
    })

}) 
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})
app.use('/', express.static(getDir() + process.env.Build_Folder));



app.get('/*', function(req, res) {

    res.sendFile(getDir() + (process.env.Build_Folder+'/index.html'));

});




//Using a function to set default app path

function getDir() {

    if (process.pkg) {

        return path.resolve(process.execPath + "/..");

    } else {

        return path.join(require.main ? require.main.path : process.cwd());

    }
  }