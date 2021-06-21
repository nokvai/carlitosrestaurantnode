module.exports = function(app, bParser, axios, dbConfig, sql) {
    var jsonParser = bParser.json(); 

    var executeQuery = function(req, res) {             
      // sql.connect(dbConfig, function (err) {
      //     if (err) {   
      //         console.log("Error while connecting database :- " + err);
      //         res.send(err);
      //     }
      //     else { 
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
 
    app.get("/api/item", function(req, res){
      var query = "SELECT ItemId, Barcode, ItemName, ItemDescription, ItemCost, ItemPrice, ItemStockCount, ItemReturnCount, ItemPhoto, ItemCategoryName, SupplierName, RestaurantId, IsAvailable, DateModified FROM view_item ORDER BY ItemName ASC"; 
      executeQuery(query, res);
    });

     
    app.get("/api/item/:itemid/", function(req, res) {
      var query = "SELECT ItemId, Barcode, ItemName, ItemDescription, ItemCost, ItemPrice, ItemStockCount, ItemReturnCount, ItemPhoto, ItemCategoryName, SupplierName, RestaurantId, IsAvailable, DateModified FROM view_item WHERE ItemId = " + req.params.itemid;
      executeQuery(query, res);
    });

    app.get("/api/item/searchitemcategoryname/:itemcategoryname/", function(req, res) {
        var query = "SELECT ItemId, Barcode, ItemName, ItemDescription, ItemCost, ItemPrice, ItemStockCount, ItemReturnCount, ItemPhoto, ItemCategoryName, SupplierName, RestaurantId, IsAvailable, DateModified FROM view_item WHERE ItemCategoryName = '" + req.params.itemcategoryname + "'";
        executeQuery(query, res);
      });

 
  };