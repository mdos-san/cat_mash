const Server = require('./Server');

describe('[Class] Server', () => {
    it('should run an express server on port 8081', () => {
        let app = {
            listen: () => {}
        };
        let express = {
            mock: () => {}
        };

        spyOn(express, 'mock').and.returnValues(app);
        spyOn(app, 'listen');

        var server = new Server(express.mock);
        server.run();

        expect(express.mock).toHaveBeenCalled();
        expect(app.listen).toHaveBeenCalledWith(8081);
    });
});