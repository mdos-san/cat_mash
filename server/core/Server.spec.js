const Server = require('./Server');

describe('[Class] Server', () => {
    let app;
    let express;

    beforeEach(() => {
        app = {
            get: () => {},
            listen: () => {},
            post: () => {}
        };
        express = {
            mock: () => {}
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

        var server = new Server(express.mock, routes, handlers);
        server.loadRoutes();

        expect(app.get).toHaveBeenCalledWith("/getpath", handlers.HandlerGet.getAction)
        expect(app.post).toHaveBeenCalledWith("/postpath", handlers.HandlerPost.postAction)
    });
});