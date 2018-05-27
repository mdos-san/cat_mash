const Server = require('./Server');

describe('[Class] Server', () => {
    let app;
    let express;

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

        bodyparser = {
            json: () => { return 42; }
        };
    });

    it('should run an express server on port 8081', () => {
        spyOn(express, 'mock').and.returnValues(app);
        spyOn(app, 'listen');

        var server = new Server(express.mock);

        spyOn(server, 'loadRoutes');

        server.run();

        expect(express.mock).toHaveBeenCalled();
        expect(app.listen).toHaveBeenCalledWith(8081);
        expect(server.loadRoutes).toHaveBeenCalled();
    });

    it('should load routes', () => {
        spyOn(express, 'mock').and.returnValues(app);
        spyOn(app, 'get');
        spyOn(app, 'post');

        let routes = [
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
        let handlers = {
            HandlerGet: {
                getAction: () => "get"
            },
            HandlerPost: {
                postAction: () => "post"
            }
        }
        spyOn(handlers.HandlerGet.getAction, 'bind');
        spyOn(handlers.HandlerPost.postAction, 'bind');

        var server = new Server(express.mock, routes, handlers);
        server.loadRoutes();

        expect(app.get).toHaveBeenCalledWith("/getpath", undefined)
        expect(handlers.HandlerGet.getAction.bind).toHaveBeenCalledWith(handlers.HandlerGet);
        expect(app.post).toHaveBeenCalledWith("/postpath", undefined)
        expect(handlers.HandlerPost.postAction.bind).toHaveBeenCalledWith(handlers.HandlerPost);
    });

    it('use the bodyparser.json middleware', () => {
        let counter = 0;
        app.use = (middleware) => {
            counter++;
            expect(middleware).toBe(bodyparser.json());
        }

        let server = new Server(express.mock, null, null, bodyparser);
        server.run();

        expect(counter).toBe(1);
    });

    it('accessControlMiddleware should set the correct header', () => {
        let counter = 0;
        let next = () => { counter++; };
        let res = {
            setHeader: () => {}
        };
        let server = new Server(express.mock, null, null, null);

        spyOn(res, 'setHeader');
        server.accessControlMiddleware(null, res, next);

        expect(counter).toBe(1);
        expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', 'http://localhost:8080');
    });
});