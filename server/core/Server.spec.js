const Server = require('./Server');

describe('[Class] Server', () => {
    let app;
    let express;
    let handlers;
    let routes;
    let server;

    beforeEach(() => {
        app = {
            get: () => {},
            listen: () => {},
            post: () => {},
            use: () => {}
        };
        express = {
            mock: () => { return app; }
        };
        routes = [
            {
                "method": "get",
                "path": "/getpath",
                "handler": "HandlerGet",
                "action": "getAction"
            },
            {
                "method": "post",
                "path": "/postpath",
                "handler": "HandlerPost",
                "action": "postAction"
            }
        ];
        handlers = {
            HandlerGet: {
                getAction: () => "get"
            },
            HandlerPost: {
                postAction: () => "post"
            }
        }

        bodyparser = {
            json: () => { return 42; }
        };
        server = new Server(express.mock, routes, handlers, bodyparser);
    });

    it('should run an express server on port 8081', () => {
        spyOn(express, 'mock').and.returnValues(app);
        spyOn(app, 'listen');
        spyOn(server, 'loadRoutes');

        server.run();

        expect(app.listen).toHaveBeenCalledWith(8081);
        expect(server.loadRoutes).toHaveBeenCalled();
    });

    it('should load routes', () => {
        spyOn(express, 'mock').and.returnValues(app);
        spyOn(app, 'get');
        spyOn(app, 'post');
        spyOn(handlers.HandlerGet.getAction, 'bind');
        spyOn(handlers.HandlerPost.postAction, 'bind');

        server.loadRoutes();

        expect(app.get).toHaveBeenCalledWith("/getpath", undefined)
        expect(handlers.HandlerGet.getAction.bind).toHaveBeenCalledWith(handlers.HandlerGet);
        expect(app.post).toHaveBeenCalledWith("/postpath", undefined)
        expect(handlers.HandlerPost.postAction.bind).toHaveBeenCalledWith(handlers.HandlerPost);
    });

    it('use the bodyparser.json middleware', () => {
        let counter = 0;
        let server;

        app.use = (middleware) => {
            expect(middleware).toBe(bodyparser.json());
            counter++;
        }
        server = new Server(express.mock, null, null, bodyparser);
        server.run();
        expect(counter).toBe(1);
    });

    it('accessControlMiddleware should set the correct header', () => {
        let counter = 0;
        let next = () => { counter++; };
        let res = {
            setHeader: () => {}
        };

        spyOn(res, 'setHeader');
        server.accessControlMiddleware(null, res, next);

        expect(counter).toBe(1);
        expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', 'http://localhost:8080');
    });
});