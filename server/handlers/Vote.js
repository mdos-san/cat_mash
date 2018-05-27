class VoteHandler {
    constructor(data, psql) {
        this.data = data;
        this.psql = psql;
    }

    getPair(req, res) {
        let pair;

        pair = this.generatePair(Math.random);
        res.end(JSON.stringify(pair));
    }

    generatePair(random) {
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
        this.insert(ids, req.body.vote, req.connection.remoteAddress, this.psql);
        obj.message = 'Vote successfully added !';
        res.end(JSON.stringify(obj));
    }

    insert(ids, vote, ip) {
        let param = this.insertGetParam(ids, vote, ip);
        this.psql.none('INSERT INTO vote(voteBetween, vote, ip) VALUES ($1, $2, $3)', param);
    }

    insertGetParam(ids, vote, ip) {
        let sorted_ids = ids.slice().sort();
        let ret = [];

        ret.push(sorted_ids.join(':'));
        ret.push(vote);
        ret.push(ip);
        return (ret);
    }
}

module.exports = VoteHandler;