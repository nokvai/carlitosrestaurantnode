module.exports = function(app, bParser, axios, dbConfig, sql) {
    var jsonParser = bParser.json();
    app.get("/getbody", (req, res) => {
      res.end("hello this is get api ser");
      //res.send(JSON.stringify(req.body));
    });
  
    app.post("/getTokenPost", jsonParser, (req, res) => {
      var url = process.env.BL_URL + "/oauth2/token/";
  
      axios
        .get(url, {
          params: {
            grant_type: req.query.grant_type,
            client_secret: req.query.client_secret,
            client_id: req.query.client_id,
            username: req.query.username,
            password: req.query.password
          }
        })
        .then(response => {
          res.send(response.data);
          // console.log(response);
        })
        .catch(error => {
          // console.log(response);
          res.send(error);
        });
    });
  
    // {"CustomerId": 1, "FirstName":"My Name"}
    app.put("/putbody/:id", jsonParser, (req, res) => {
      //req.body.CustomerId;
    });
  
    app.delete("/deletebody/:id", function(req, res) {
      //req.params.id
    });


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
                  sql.close();
                  }
              });
          }
      });           
    }



    //GET ALL ACTIVE USERS FOR PATHWAYS
    app.get("/api/restaurants", function(req, res){
      var query = "select * from Restaurant";
      //console.log(query);
    executeQuery(query, res);
    });

    //GET ONE USER
    app.get("/api/restaurants/:restaurantid/", function(req, res){
    var query = "select * from Restaurant where RestaurantId = " + req.params.restaurantid;
    executeQuery(query, res);
    });

    // //POST API
    //  app.post("/api/user ", function(req , res){
    //                 var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password”);
    //                 executeQuery (res, query);
    // });

    // //PUT API
    //  app.put("/api/user/:id", function(req , res){
    //                 var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
    //                 executeQuery (res, query);
    // });

    // // DELETE API
    //  app.delete("/api/user /:id", function(req , res){
    //                 var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
    //                 executeQuery (res, query);
    // });


  };