module.exports = function(app, bParser, axios, dbConfig, sql) {
    var jsonParser = bParser.json(); 

    var executeQuery = function(req, res) {
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
 
    app.get("/api/kitchen/searchorders/:orderid", function(req, res) {
      var query = `SELECT * FROM view_orders WHERE OrderStatus <> 'Served' AND OrderId = ${req.params.orderid} ORDER BY OrderDateTime ASC`; 
      executeQuery(query, res);
    });

    
    app.get("/api/kitchen/searchordertype/:ordertype/", function(req, res) {
        var query = `SELECT * FROM view_orders WHERE OrderStatus <> 'Served' AND OrderType = '${req.params.ordertype}' ORDER BY OrderDateTime ASC`; 
        executeQuery(query, res);
    });


    app.get("/api/kitchen/searchorderitems/:orderid/", function(req, res) {
        var query = `SELECT * FROM view_orderitems WHERE OrderId = ${req.params.orderid}`; 
        executeQuery(query, res);
    });


    app.post("/api/kitchen/orderstatus/served/:orderid/", jsonParser, (req, res) => {
        var query = `UPDATE Orders SET OrderStatusId = 4 WHERE OrderId = ${req.params.orderid}`; 
        executeQuery(query, res);
      });

    // app.get("/api/item/:itemid/", function(req, res) {
    //   var query = "SELECT ItemId, Barcode, ItemName, ItemDescription, ItemCost, ItemPrice, ItemStockCount, ItemReturnCount, ItemPhoto, ItemCategoryName, SupplierName, RestaurantId, IsAvailable, DateModified FROM view_item WHERE ItemId = " + req.params.itemid;
    //   executeQuery(query, res);
    // });

    // app.get("/api/item/searchitemcategoryname/:itemcategoryname/", function(req, res) {
    //     var query = "SELECT ItemId, Barcode, ItemName, ItemDescription, ItemCost, ItemPrice, ItemStockCount, ItemReturnCount, ItemPhoto, ItemCategoryName, SupplierName, RestaurantId, IsAvailable, DateModified FROM view_item WHERE ItemCategoryName = '" + req.params.itemcategoryname + "'";
    //     executeQuery(query, res);
    // });

 
  };