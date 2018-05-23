class Server {
    constructor(express, routes, handlers) {
        this.app = express();
        this.routes = routes;
        this.handlers = handlers;
    }

    run() {
        this.loadRoutes();
        this.app.listen(8081);
    }

    loadRoutes() {
        this.routes.forEach(route => {
            this.app[route.method](
                route.path,
                this.handlers[route.handler][route.action].bind(this.handlers[route.handler])
            );
        });
    }
}

module.exports = Server;