let psql = require('../config/db');

class Cats {
    constructor(data) {
        this.data = data;
    }

    getCatsPair(req, res) {
        let pair;

        pair = this.catsPair(Math.random);
        res.end(JSON.stringify(pair));
    }

    catsPair(random) {
        let r1;
        let r2;
        let pair;

        r1 = parseInt(random() * this.data.length);
        r2 = parseInt(random() * this.data.length);
        pair = [];
        pair.push(this.data[r1]);
        pair.push(this.data[r2]);

        return (pair);
    }

    vote(req, res) {
        let ids = [];
        let obj = {
            success: true,
            message: ""
        }

        if (!req.body || !req.body.id0) {
            obj.success = false;
            obj.message = "Please provide id0 param";
            res.end(JSON.stringify(obj));
            return null
        }
        if (!req.body.id1) {
            obj.success = false;
            obj.message = "Please provide id1 param";
            res.end(JSON.stringify(obj));
            return null
        }
        ids.push(req.body.id0);
        ids.push(req.body.id1);
        this.voteInsert(ids, req.body.vote, req.connection.remoteAddress, psql);
        obj.message = 'Vote successfully added !';
        res.end(JSON.stringify(obj));
    }

    voteInsert(ids, vote, ip, psql) {
        let param = this.voteInsertGetParam(ids, vote, ip);
        psql.none('INSERT INTO vote(voteBetween, vote, ip) VALUES ($1, $2, $3)', param);
    }

    voteInsertGetParam(ids, vote, ip) {
        let sorted_ids = ids.slice().sort();
        let ret = [];

        ret.push(sorted_ids.join(':'));
        ret.push(vote);
        ret.push(ip);
        return (ret);
    }
}

module.exports = Cats;