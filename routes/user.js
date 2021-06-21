module.exports = function(app, bParser, axios, dbConfig, sql) {
    var jsonParser = bParser.json();
    
    //Function to connect to database and execute query
    var executeQuery = function(req, res) {             
      sql.connect(dbConfig, function (err) {
          if (err) {   
              console.log("Error while connecting database :- " + err);
              res.send(err);
          }
          else {
              // create Request object
              var request = new sql.Request();
              // query to the database
              request.query(req, function (err, response) {
                  if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                  } else {
                  // console.log(response);
                  res.send(response); 
                  
                  }
              });
          }
      });     
      sql.close();      
    }

    //GET ALL ACTIVE USERS FOR PATHWAYS
    app.get("/api/users", function(req, res){
      var query = "select UserLoginId, UserName, RoleName, RoleLevel, StaffName, DateModified from view_userlogin";
      //console.log(query);
    executeQuery(query, res);
    });

    //GET ONE USER
    app.get("/api/users/:userloginid/", function(req, res) {
      var query = "select UserLoginId, UserName, RoleName, RoleLevel, StaffName, DateModified from view_userlogin where UserLoginId = " + req.params.userloginid;
      executeQuery(query, res);
    });
    
  };