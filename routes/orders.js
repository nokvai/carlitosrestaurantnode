 
module.exports = function(app, bParser, axios, dbConfig, sql) {
    var jsonParser = bParser.json();
     
    // var executeQuery = function(req, res) {             
    //     sql.connect(dbConfig, function (err) {
    //         if (err) {   
    //             console.log("Error while connecting database :- " + err);
    //             res.send(err);
    //         }
    //         else {
                
    //             var request = new sql.Request();
            
    //             request.query(req, function (err, response) {
    //                 if (err) {
    //                     console.log("Error while querying database :- " + err);
    //                     res.send(err);
    //                 } else { 
    //                     res.send(response);  
    //                     sql.close();   
    //                 }
    //             });
    //         }
    //     });
    // }

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


    var executeProc = function(req, res) {  
        //res.send(req.query);    
        //res.send(req.params);
        //res.send(req.body);
         
        // sql.connect(dbConfig, function (err) {
        //     if (err) {   
        //         console.log("Error while connecting database :- " + err);
        //         res.send(err);
        //     } else { 
        //         try {
        //             var request = new sql.Request();  
        //             request.input('Notes', sql.VarChar, req.body.Notes);
        //             request.input('CustomerName', sql.VarChar, req.body.CustomerName);
        //             request.input('ContactNumber', sql.VarChar, req.body.ContactNumber);
        //             request.input('TableNumber', sql.VarChar, req.body.TableNumber);
        //             request.input('TableColor', sql.VarChar, req.body.TableColor);
        //             request.input('OrderNumber', sql.Int, req.body.OrderNumber);
        //             request.input('NumberOfPerson', sql.Int, req.body.NumberOfPerson); 
        //             request.input('OrderTypeId', sql.Int, req.body.OrderTypeId);
        //             request.input('OrderStatusId', sql.Int, req.body.OrderStatusId);
        //             request.input('OrderTakenBy', sql.VarChar, req.body.OrderTakenBy);
        //             //request.input('OrderDateTime', sql.DateTime2, req.body.OrderDateTime); -- AUTOMATIC
        //             request.input('PrepareTime', sql.Int, req.body.PrepareTime);
        //             request.input('IsPaid', sql.Bit, req.body.IsPaid); 
        //             request.input('RestaurantId', sql.Int, req.body.RestaurantId);
        //             request.input('OutletId', sql.Int, req.body.OutletId);
        //             request.input('StaffId', sql.Int, req.body.StaffId); 
        //             request.multiple = true; 
        //             request.execute('sp_insert_orders').then(function(result, returnvalue) { 
        //                 res.send(result); 
        //             });
        //         } catch (error) {
        //             res.send(error);
        //         }
        //     } 
        // }); 

        sql.on('error', err => {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        });
        sql.connect(dbConfig).then(pool => {
            return pool.request()
            .input('Notes', sql.VarChar, req.body.Notes)
            .input('CustomerName', sql.VarChar, req.body.CustomerName)
            .input('ContactNumber', sql.VarChar, req.body.ContactNumber)
            .input('TableNumber', sql.VarChar, req.body.TableNumber)
            .input('TableColor', sql.VarChar, req.body.TableColor)
            .input('OrderNumber', sql.Int, req.body.OrderNumber)
            .input('NumberOfPerson', sql.Int, req.body.NumberOfPerson)
            .input('OrderTypeId', sql.Int, req.body.OrderTypeId)
            .input('OrderStatusId', sql.Int, req.body.OrderStatusId)
            .input('OrderTakenBy', sql.VarChar, req.body.OrderTakenBy)
            //.input('OrderDateTime', sql.DateTime2, req.body.OrderDateTime) -- AUTOMATIC
            .input('PrepareTime', sql.Int, req.body.PrepareTime)
            .input('IsPaid', sql.Bit, req.body.IsPaid)
            .input('RestaurantId', sql.Int, req.body.RestaurantId)
            .input('OutletId', sql.Int, req.body.OutletId)
            .input('StaffId', sql.Int, req.body.StaffId)
            .execute('sp_insert_orders').then(function(result, returnvalue) { 
                res.send(result); 
            });
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    }


    var executeProc2 = function(req, res) {   
        sql.on('error', err => {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        });
        sql.connect(dbConfig).then(pool => {
            return pool.request()
            .input('OrderId', sql.VarChar, req.body.OrderId)
            .input('Notes', sql.VarChar, req.body.Notes)
            .input('CustomerName', sql.VarChar, req.body.CustomerName)
            .input('ContactNumber', sql.VarChar, req.body.ContactNumber)
            .input('TableNumber', sql.VarChar, req.body.TableNumber)
            .input('TableColor', sql.VarChar, req.body.TableColor)
            .input('OrderNumber', sql.Int, req.body.OrderNumber)
            .input('NumberOfPerson', sql.Int, req.body.NumberOfPerson)
            .input('OrderTypeId', sql.Int, req.body.OrderTypeId)
            //.input('OrderStatusId', sql.Int, req.body.OrderStatusId)
            .input('OrderTakenBy', sql.VarChar, req.body.OrderTakenBy)
            //.input('OrderDateTime', sql.DateTime2, req.body.OrderDateTime) -- AUTOMATIC
            //.input('PrepareTime', sql.Int, req.body.PrepareTime)
            //.input('IsPaid', sql.Bit, req.body.IsPaid)
            //.input('RestaurantId', sql.Int, req.body.RestaurantId)
            .input('OutletId', sql.Int, req.body.OutletId)
            //.input('StaffId', sql.Int, req.body.StaffId)
            .execute('sp_void_order').then(function(result, returnvalue) { 
                res.send(result); 
            });
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    } 

    var executeProc3 = function(req, res) {
        sql.on('error', err => {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        });
        sql.connect(dbConfig).then(pool => {
            return pool.request()
            .input('OrderId', sql.VarChar, req.body.OrderId)
            .execute('sp_void_delete_orderitems').then(function(result, returnvalue) { 
                res.send(result); 
            });
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    } 

    app.post("/api/order/add", jsonParser, (req, res) => { 
        executeProc(req, res);
    });

    app.post("/api/void/order/update", jsonParser, (req, res) => { 
        executeProc2(req, res);
    });

    app.post("/api/void/removeall/orderitems", jsonParser, (req, res) => { 
        executeProc3(req, res);
    });
    

    app.get("/api/void/order/orderitems/:orderid/", function(req, res) {
        var query = "SELECT * FROM view_orderitems WHERE OrderId = " + req.params.orderid;
        executeQuery(query, res);
    });

    app.get("/api/void/order/:orderid/", function(req, res) {
        var query = "SELECT * FROM view_orders WHERE OrderId = " + req.params.orderid;
        executeQuery(query, res);
    });

 
  };
