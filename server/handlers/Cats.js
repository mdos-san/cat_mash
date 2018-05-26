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

    }
}

module.exports = Cats;