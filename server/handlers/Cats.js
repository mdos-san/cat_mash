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

    vote() {

    }
}

module.exports = Cats;