class VoteHandler {
    constructor(data, psql) {
        this.data = data;
        this.psql = psql;
    }

    getPair(req, res) {
        let promise;

        promise = this.generatePair(Math.random);
        promise.then((data) => {
            res.end(JSON.stringify(data));
        });
        promise.catch(e => {
            res.end(JSON.stringify(e));
        });
    }

    generatePair() {
        return this.psql.many('SELECT * FROM cat ORDER BY RANDOM() LIMIT 2;');
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

    readVotes() {
        return (this.psql.many('SELECT COUNT(vote.vote) AS votes, cat.link AS url FROM vote JOIN cat ON vote.vote = CAST(cat.id AS varchar) GROUP BY cat.link ORDER BY votes DESC;'));
    }

    getRanking(req, res) {
        let result = this.readVotes();

        result.then((data) => {
            res.end(JSON.stringify(data));
        });
    }
}

module.exports = VoteHandler;