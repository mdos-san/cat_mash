const Cats = require('./Cats');

describe('[CLASS] Cats', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
        };
        res = {
            end: () => {}
        };
    });
    it('should store cats provided in constructor', () => {
        let obj = [
            {id: 'id', url: 'url'}
        ]
        let cats = new Cats(obj);
        expect(cats.data).toBe(obj);
    });

    it('catsPair should return a random pair of cat', () => {
        let obj = [
            {id: 'id_1', url: 'url_1'},
            {id: 'id_2', url: 'url_2'},
        ];

        let cats = new Cats(obj);
        spyOn(Math, 'random').and.returnValues(0.234, 0.876);
        let pair = cats.catsPair(Math.random);

        expect(pair[0].id).toBe('id_1');
        expect(pair[1].id).toBe('id_2');
        expect(pair[0].url).toBe('url_1');
        expect(pair[1].url).toBe('url_2');
    });

    it('getCatsPair should response with a pair of cat', () => {
        let cats;
        let res;
        let pair;
        
        cats = new Cats();
        res = {end: () => {}};
        pair = [
            {id: 'id_1', url: 'url_1'},
            {id: 'id_2', url: 'url_2'},
        ];
        spyOn(cats, 'catsPair').and.returnValue(pair);
        spyOn(res, 'end');
        cats.getCatsPair(null, res);

        expect(res.end).toHaveBeenCalledWith(JSON.stringify(pair));
    });

    it('vote should check for id0 presence', () => {
        let cats;
        let obj;
        
        cats = new Cats();
        obj = {success: false, message: "Please provide id0 param"};
        spyOn(res, 'end');
        cats.vote(req, res);
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(obj));
    });

    it('vote should check for id1 presence', () => {
        let cats;
        let obj;
        
        cats = new Cats();
        obj = {success: false, message: "Please provide id1 param"};
        req.body = { id0:  "id0" }
        spyOn(res, 'end');
        cats.vote(req, res);
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(obj));
    });

    it('voteInsert should insert vote in database', () => {
        let cats;
        let ids = ['xyz', 'abc']
        let vote = 'abc';
        let ip = '127.0.0.1';
        let insertParam = ['abc:xyz', 'abc', '127.0.0.1'];
        let psql = {
            none: () => {}
        };
        
        cats = new Cats();
        spyOn(psql, 'none');
        spyOn(cats, 'voteInsertGetParam').and.returnValue(insertParam);
        cats.voteInsert(ids, vote, ip, psql);
        expect(psql.none).toHaveBeenCalledWith(
            'INSERT INTO vote(voteBetween, vote, ip) VALUES ($1, $2, $3)',
            insertParam
        );
    });

    it('voteInsertGetParam', () => {
        let cats;
        let ids = ['xyz', 'abc']
        let vote = 'abc';
        let ip = '127.0.0.1';
        
        cats = new Cats();
        expect(JSON.stringify(cats.voteInsertGetParam(ids, vote, ip)))
            .toBe(JSON.stringify(['abc:xyz', 'abc', '127.0.0.1']))
    })
});