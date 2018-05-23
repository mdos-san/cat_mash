class Server {
    constructor(express) {
        this.app = express();
    }

    run() {
        this.app.listen(8081);
    }
}

module.exports = Server;