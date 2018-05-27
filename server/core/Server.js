class Server {
    constructor(express, routes, handlers, bodyparser) {
        this.app = express();
        if (bodyparser)
            this.app.use(bodyparser.json());
        this.routes = routes;
        this.handlers = handlers;
    }

    accessControlMiddleware(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        next();
    }

    run() {
        this.loadRoutes();
        this.app.listen(8081);
    }

    loadRoutes() {
        if (this.routes) {
            this.routes.forEach(route => {
                this.app[route.method](
                    route.path,
                    this.handlers[route.handler][route.action].bind(this.handlers[route.handler])
                );
            });
        }
    }
}

module.exports = Server;