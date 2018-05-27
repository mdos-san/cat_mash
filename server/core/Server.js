class Server {
    constructor(express, routes, handlers, bodyparser) {
        this.app = express();
        this.routes = routes;
        this.handlers = handlers;
        this.bodyparser = bodyparser;
        this.init();
    }

    init() {
        this.middlewareLoad();
    }

    middlewareLoad() {
        this.app.use(this.accessControlMiddleware);
        this.app.use(this.bodyparser.json());
    }

    accessControlMiddleware(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        next();
    }

    middlewareAccessControlAllowHeaders(req, res, next) {
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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