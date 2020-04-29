const app = require('./server');

app.listen(process.env.PORT, () => console.log('Server started in port 3000'));

    // // Poniendo esto en la terminal - openssl req -nodes -new -x509 -keyout server.key -out server.cert - generamos una key y un certificado inseguro de cara a utilizar https
    // https.createServer({
    //     key: fs.readFileSync('server.key'),
    //     cert: fs.readFileSync('server.cert')
    // }, app).listen(3443, () => {
    //     console.log("Https server started in port 3443");
    // });