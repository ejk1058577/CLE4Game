export class Highscore {
    //simply inst the class and call loadScores with either callback or awaiting Promise/.then()
    //results should be visible in this.scores
    //make sure you do this well before scores actually have to be showed.

    key;
    baseUrl;
    connected;
    scores;

    constructor() {
        //I know this isn't secure, but it should prevent *completely* random requests to my server
        this.key = 'WMg1NtJTEZ7gEcrpGafKWUyuz-c7d7Zp8JUO-ra-1Ig';
        this.baseUrl = 'https://stud.hosted.hr.nl/1058577/highscore/';
        this.connected = false;
        this.scores = 'No scores found.'
    }

    loadScores(callback) {
        return new Promise(async (res, rej) => {
            let scores = await this.requestScores().catch((e) => {
                rej(e);
            });
            this.scores = scores;

            //TODO check for rejected?

            res(this.scores);
            if (callback) {
                callback(this.scores);
            }
        });
    }

    async requestScores() {
        return new Promise(async (res, rej) => {
            let response;
            response = await fetch(`${this.baseUrl}?key=${this.key}`).catch((e) => {
                rej(e);
            });

            if (response.ok) {
                this.connected = true;
                let json = await response.json();
                res(json);
            }
            
            this.connected = false;
            rej(response);
        });
    }

    sendScore(name, score, callback) {
        return new Promise(async (res, rej) => {
            let response = await this.postData(this.baseUrl + 'add.php', {name: name, score: score, key: this.key});
            if (response.ok) {
                let json = await response.json();
                res(json);
                if (callback) {
                    callback()
                }
                return;
            }

        rej(response);
        });
    }

    //function from mozilla
    async postData(url = "", data = {}) {
    // Default options are marked with *
        try {
            const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });

                return response; // parses JSON response into native JavaScript objects
        } catch (e) {
            return e;
        }
        
    }
}