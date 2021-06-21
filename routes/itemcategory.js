module.exports = function(app, bParser, axios, dbConfig, sql) {
    var jsonParser = bParser.json();
  
    var executeQuery = function(req, res) {     

      // sql.connect(dbConfig, function (err) {
      //     if (err) {   
      //         console.log("Error while connecting database :- " + err);
      //         res.send(err);
      //     } else { 
      //         var request = new sql.Request(); 
      //         request.query(req, function (err, response) {
      //             if (err) {
      //               console.log("Error while querying database :- " + err);
      //               res.send(err);
      //             } else { 
      //               res.send(response);   
      //             }
      //         });
      //     }
      // });  
        sql.on('error', err => {
          console.log("Error while connecting database :- " + err);
          res.send(err);
        });
        sql.connect(dbConfig).then(pool => {
            return pool.request().query(req)
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
         
    }

 
    app.get("/api/itemcategory", function(req, res){
      var query = "SELECT ItemCategoryId, ItemCategoryName, ItemCategoryDescription, ItemCategoryPhoto FROM ItemCategory ORDER BY ItemCategoryName ASC";
      
      executeQuery(query, res);
    });

 
    app.get("/api/itemcategory/:itemcategoryid/", function(req, res) {
      var query = "SELECT ItemCategoryId, ItemCategoryName, ItemCategoryDescription, ItemCategoryPhoto FROM ItemCategory WHERE ItemCategoryId = " + req.params.itemcategoryid;
      executeQuery(query, res);
    });
     
    // function executeQuery1(req, res) {
    //     try {
    //       sql.connect(dbConfig)
    //             .then(function () {
    //                 // Function to retrieve all the data - Start
    //                 new sql.Request()
    //                     .query(req)
    //                     .then(function (dbData) {
    //                         if (dbData == null || dbData.length === 0)
    //                             return;
    //                       //  console.dir('All the courses');
    //                        // console.dir(dbData);
    //                        res.send(dbData); 
    //                     })
    //                     .catch(function (error) {
    //                       console.log("Error while querying database :- " + error);
    //                     });
    
    //                 // Function to retrieve all the data - End
    
    //                 // To retrieve specicfic data - Start
    //                 // var value = 1;
    //                 // new sqlInstance.Request()
    //                 //     .input("param", sqlInstance.Int, value)
    //                 //     .query("select * from Course where CourseID = @param")
    //                 //     .then(function (dbData) {
    //                 //         if (dbData == null || dbData.length === 0)
    //                 //             return;
    //                 //         console.dir('Course with ID = 1');
    //                 //         console.dir(dbData);
    //                 //     })
    //                 //     .catch(function (error) {
    //                 //         console.dir(error);
    //                 //     });
    //                 // To retrieve specicfic data - End
    
    //             }).catch(function (error) {
    //               console.log("Error while connecting database :- " + error);
    //                 res.send(error);
    //             });
    //     } catch (error) {
    //         console.log("error: " + error);
          
    //     }
    // }
    
  };