class Server {
    constructor(express, routes, handlers, bodyparser, process) {
        this.app = express();
        this.routes = routes;
        this.handlers = handlers;
        this.bodyparser = bodyparser;
        this.process = process;
        this.init();
    }

    init() {
        this.middlewareLoad();
    }

    middlewareLoad() {
        this.app.use(this.middlewareAccessControlAllowOrigin);
        this.app.use(this.middlewareAccessControlAllowHeaders);
        this.app.use(this.bodyparser.json());
    }

    middlewareAccessControlAllowOrigin(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', this.process.env.ORIGIN);
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