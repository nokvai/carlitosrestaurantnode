 
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
 
  
    var executeProc = function(req, res) {
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

    var executeProc = function(req, res) {
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

    var executeProc2 = function(req, res) {
        sql.on('error', err => {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        });
        sql.connect(dbConfig).then(pool => {
            return pool.request()
            .input('OrderId', sql.VarChar, req.body.OrderId)
            .execute('sp_delete_ordertransaction').then(function(result, returnvalue) { 
                res.send(result); 
            });
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    } 

    app.get("/api/sales/resetcounts", function(req, res) {
        var query = `SELECT * FROM ResetCount WHERE POS = '${req.query.pos}'`;
        executeQuery(query, res);
    });
   
    app.get("/api/sales/sumallpayments/", function(req, res) {
    
        var query = `SELECT SUM(PaymentAmount) AS PaymentSUM FROM Payments WHERE IsVoid <> 1 AND IsReturned <> 1 AND IsCancel <> 1 AND IsRefund <> 1 AND POS = '${req.query.pos}' AND ResetCount = ${parseInt(req.query.resetcount)} AND DateModified BETWEEN '${req.query.startdate}' AND '${req.query.enddate}'`;
        executeQuery(query, res);
    });
 
    app.get("/api/sales/orders", function(req, res) {
        var query = `SELECT * FROM view_orderpayments WHERE IsVoid <> 1 AND IsReturned <> 1 AND IsCancel <> 1 AND IsRefund <> 1 AND POS = '${req.query.pos}' AND ResetCount = ${parseInt(req.query.resetcount)} AND IsPaid = 1 AND PaidDate BETWEEN '${req.query.startdate}' AND '${req.query.enddate}' ORDER BY PaidDate ASC`;
        executeQuery(query, res);
    });
 
    app.get("/api/sales/payment/:orderid", function(req, res) {
        var query = `SELECT PaymentAmount FROM Payments WHERE OrderId = ${parseInt(req.params.orderid)}`;
        executeQuery(query, res);
    });
      
    // delete 3 tables
    app.post("/api/sales/order/delete", function(req, res) {
        executeProc2(req, res);
    });

    app.get("/api/items/list", function(req, res) {  
        var query = `SELECT * FROM view_item WHERE ItemId IN (${req.query.itemids}) ORDER BY ItemName ASC`;
        executeQuery(query, res);
        // if (req.query.itemids != "") {
        //     var query = `SELECT * FROM view_item WHERE ItemId IN (${req.query.itemids}) ORDER BY ItemName ASC`;
        //     executeQuery(query, res);
        // } else {
        //     var query = `SELECT * FROM view_item ORDER BY ItemName ASC`;
        //     executeQuery(query, res);
        // } 
    });
  
    app.get("/api/salescount/", function(req, res) {
        var query = `select SUM(CNT) AS Count FROM view_salescount WHERE IsVoid <> 1 AND IsReturned <> 1 AND IsCancel <> 1 AND IsRefund <> 1 AND POS = '${req.query.pos}' AND ResetCount = ${parseInt(req.query.resetcount)} AND PaidDate BETWEEN '${req.query.startdate}' AND '${req.query.enddate}' AND ItemId = ${req.query.itemid}`;
        executeQuery(query, res);
    });

    app.get("/api/items/category", function(req, res) {
        var query = `select ItemCategoryName FROM ItemCategory ORDER BY ItemCategoryName ASC`;
        executeQuery(query, res);
    });

    app.get("/api/items/list/bycategory", function(req, res) {  
        var query = `SELECT * FROM view_item WHERE ItemCategoryName IN (${req.query.category}) ORDER BY ItemName ASC`;
        executeQuery(query, res);
    });
  
  };