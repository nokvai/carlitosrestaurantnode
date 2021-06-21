module.exports = function(app, bParser, axios, dbConfig, sql) {
    var jsonParser = bParser.json();
  
    var executeProc = function(req, res) { 
        sql.on('error', err => {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        });
        sql.connect(dbConfig).then(pool => {
            return pool.request()
                .input('OrderId', sql.Int, req.body.OrderId)
                .input('ItemId', sql.Int, req.body.ItemId)
                .input('ItemCost', sql.Decimal, req.body.ItemCost)
                .input('ItemPrice', sql.Decimal, req.body.ItemPrice)
                .input('Quantity', sql.Int, req.body.Quantity)
                .execute('sp_insert_orderitems')
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.send(err);
        });
    }
 
    app.post("/api/orderitem/add", jsonParser, (req, res) => { 
      executeProc(req, res);
    });
  
  };
