const VoteHandler = require('./Vote');

describe('[CLASS] Vote', () => {
    let voteHandler;
    let obj;
    let req;
    let res;
    let psql;

    beforeEach(() => {
        req = {
            connection: () => {}
        };
        res = {
            end: () => {}
        };
        obj = [
            {id: 'id_1', url: 'url_1'},
            {id: 'id_2', url: 'url_2'},
        ];
        psql = {
            none: () => {},
            many: () => {}
        };
        voteHandler = new VoteHandler(obj, psql);
    });

    it('should store voteHandler provided in constructor', () => {
        expect(voteHandler.data).toBe(obj);
    });

    it('generatePair should return a random pair of data', () => {
        let pair;

        spyOn(Math, 'random').and.returnValues(0.234, 0.876);
        pair = voteHandler.generatePair(Math.random);

        expect(pair[0].id).toBe('id_1');
        expect(pair[1].id).toBe('id_2');
        expect(pair[0].url).toBe('url_1');
        expect(pair[1].url).toBe('url_2');
    });

    it('getPair should response with a pair of data', () => {
        let pair;
        
        pair = [
            {id: 'id_1', url: 'url_1'},
            {id: 'id_2', url: 'url_2'},
        ];
        spyOn(voteHandler, 'generatePair').and.returnValue(pair);
        spyOn(res, 'end');
        voteHandler.getPair(null, res);

        expect(res.end).toHaveBeenCalledWith(JSON.stringify(pair));
    });

    it('voteHandler should check for id0 presence', () => {
        let ret;
        
        ret = {success: false, message: "Please provide id0 param"};
        spyOn(res, 'end');
        voteHandler.vote(req, res);
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(ret));
    });

    it('voteHandler should check for id1 presence', () => {
        let ret;
        
        ret = {success: false, message: "Please provide id1 param"};
        req.body = { id0:  "id0" }
        spyOn(res, 'end');
        voteHandler.vote(req, res);
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(ret));
    });

    it('voteHandler should call insert with right parameter', () => {
        spyOn(voteHandler, 'insert');
        req.body = { id0:  "id0", id1: "id1" }
        voteHandler.vote(req, res);
        expect(voteHandler.insert).toHaveBeenCalled();
    });

    it('voteHandlerInsert should insert vote in database', () => {
        let ids = ['xyz', 'abc']
        let vote = 'abc';
        let ip = '127.0.0.1';
        let insertParam = ['abc:xyz', 'abc', '127.0.0.1'];
        
        spyOn(psql, 'none');
        spyOn(voteHandler, 'insertGetParam').and.returnValue(insertParam);
        voteHandler.insert(ids, vote, ip, psql);
        expect(psql.none).toHaveBeenCalledWith(
            'INSERT INTO vote(voteBetween, vote, ip) VALUES ($1, $2, $3)',
            insertParam
        );
    });

    it('voteHandlerInsertGetParam', () => {
        let ids = ['xyz', 'abc']
        let vote = 'abc';
        let ip = '127.0.0.1';
        
        expect(JSON.stringify(voteHandler.insertGetParam(ids, vote, ip)))
            .toBe(JSON.stringify(['abc:xyz', 'abc', '127.0.0.1']))
    })

    it('readVotes', () => {
        let result;

        spyOn(psql, 'many');
        result = voteHandler.readVotes();
        expect(psql.many).toHaveBeenCalledWith('SELECT vote, COUNT(vote) FROM vote GROUP BY vote ORDER BY COUNT(vote) DESC');
    });

    it('getRanking', () => {
        let data = [42, 42];
        let readVotes_spy = {
            then: (fct) => { fct(data); }
        };

        spyOn(voteHandler, 'readVotes').and.returnValue(readVotes_spy);
        spyOn(res, 'end');
        voteHandler.getRanking(req, res);
        expect(voteHandler.readVotes).toHaveBeenCalled();
        expect(res.end).toHaveBeenCalledWith(JSON.stringify(data));
    })
});