describe('[Class] Server', () => {
    it('should run', () => {
        expect(() => {
            var server = new Server();
            server.run();
        }).not.toThrow();
    });
});