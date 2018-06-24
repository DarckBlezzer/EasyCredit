const   express     = require('express'),
        app         = express(),
        server      = require('http').createServer(app),
        io          = require('socket.io')(server), // websocket para comunicacion de actualizacion de solicitudes
        port        = 3000, // puerto de escucha server
        mysql       = require('mysql'), // puerto en el cual correra el server.
        bodyParser  = require('body-parser'), // body paarser para el body del express
        clientsIO   = {}, // objeto para contener a los clientes con sus ids
        mysqlPool   = mysql.createPool({ // mysql pool para hacer queryies
            connectionLimit : 10,
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'easycredit'
          });

// configuracion express
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use(function (req, res, next) { // permitir access origin a cualquier url
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
// end


// Paths Express
// consulta para verificar si esta el usuario o no en el sistema, y regresar la informacion del usuario
app.post('/api/user', function (req, res) {
    const user = req.body.user;
    
    mysqlPool.getConnection(function (err, connection) {
        if (err) throw err;
        
        connection.query(`SELECT id FROM user WHERE name = '${user}'`, function (error, results, fields) {
            connection.release(); // And done with the connection.
            if (error) throw error; // Handle error after the release.
            
            if(results.length > 0){ // existe usuario
                getDataUser(user,results[0].id,res)
                // enviar todos los datos relacionados con el usuario
            }else{  // no existe usuario
                // crear usuario y enviar los datos
                createuser(user,res)
            }
        });
    });
});

// Obtener plazos en el sistema
app.get('/api/plazos', function (req, res) {
    mysqlPool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query(`SELECT * FROM plazos`, function (error, results, fields) {
            connection.release(); // And done with the connection.
            if (error) throw error; // Handle error after the release.
            res.send(results)
        });
    });
});

// Capturar nueva solicitud
app.post('/api/nuevaSolicitud', function (req, res) {
    console.log(req.body)
    const   user = req.body.user,
            solicitud = req.body.solicitud

    mysqlPool.getConnection(function (err, connection) {
        if (err) throw err;

        connection.query(`
        INSERT INTO solicitudes
            (user_id, monto, edad, tarjeta_credito, plazos_id)
        VALUES
            (${user.id}, ${solicitud.monto}, ${solicitud.edad}, ${solicitud.tarjeta? 1:0}, ${solicitud.plazo})    
        `, function (error, results, fields) {
            connection.release(); // And done with the connection.
            if (error) throw error; // Handle error after the release.
            getDataUser(user.user, user.id, res)
        });
    });
});
// Paths Express END


// Socket io Connections
io.on('connection', function (client) {
    console.log('Cliente: ',client.id)
    client.on('login', function (msg) {
        if(!clientsIO[msg])
            clientsIO[msg] = []
        clientsIO[msg].push(this.id)

        this.userName = msg
        console.log(clientsIO)
    })
    client.on('disconnect', function () {
        delete clientsIO[this.userName];
        console.log('OFF: ',clientsIO)
    })
});
// Socket io Connections END


// Ejecutar server en el puerto x
server.listen(port,function(){
    console.log(`Corriento en el puerto ${port}!`);
});  



// Crear usuario
function createuser(user, res){
    mysqlPool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`INSERT INTO user (name) VALUES ("${user}")`, function (error, results, fields) {
            connection.release(); // And done with the connection.
            if (error) throw error; // Handle error after the release.
            res.send({
                informacion:{
                    id: results.insertId,
                    user: user
                },
                historial:[],
                solicitudes:[]
            }) 
        });
    });
}
// Crear usuario END

// Obtener los datos del usuario
function getDataUser(user, id, res){
    mysqlPool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(`
        SELECT
            *
        FROM
            solicitudes
        LEFT JOIN plazos ON solicitudes.plazos_id = plazos.id
        WHERE
            user_id = ${id}
        `, function (error, results, fields) {
            connection.release(); // And done with the connection.
            if (error) throw error; // Handle error after the release.
            res.send({
                informacion:{
                    id: id, // id usuario
                    user: user // nombre usuario
                },
                historial: results.filter(solicitud => solicitud.autorizado != null), //  solicitudes autorizados
                solicitudes: results.filter(solicitud => solicitud.autorizado == null) // solicitudes no autorizadas
            }) 
        });
    });
}
// Obtener los datos del usuario END

// Iterador para buscar colicitudes sin procesar, y si detecta que el cliente esta conectado, enviar la informacion del usuario 
setInterval(function(){
    mysqlPool.query('select solicitudes.*, user.name from solicitudes LEFT JOIN user on user.id = solicitudes.user_id where autorizado IS NULL limit 1', function (error,results,fields) {
        if (error) throw error;
        results.forEach(item => {
            let params = [0, item.id]

            if(item.edad >= 20 && item.tarjeta_credito == 1){
                params = [1, item.id]
            }

            mysqlPool.query('UPDATE solicitudes SET autorizado = ? WHERE id = ?', params, function (error,results,fields) {
                if (error) throw error;

                mysqlPool.query(`
                    SELECT
                        *
                    FROM
                        solicitudes
                    LEFT JOIN plazos ON solicitudes.plazos_id = plazos.id
                    WHERE
                        user_id = ${item.user_id}
                    `,function (error,results,fields) {
                        if (error) throw error;
                        //debugger
                        if(clientsIO[item.name] && clientsIO[item.name].length > 0)
                            clientsIO[item.name].forEach(function(socketID){
                                console.log("SocketID: ",socketID);
                                
                                io.sockets.connected[socketID].emit("loadData",{
                                    informacion:{
                                        id: item.user_id, // id usuario
                                        user: item.name // nombre usuario
                                    },
                                    historial: results.filter(solicitud => solicitud.autorizado != null), //  solicitudes autorizados
                                    solicitudes: results.filter(solicitud => solicitud.autorizado == null) // solicitudes no autorizadas
                                });
                            })
                    })

            })
        });
    });
},30 * 1000)