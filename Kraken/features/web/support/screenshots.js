const fs = require('fs');

class Screenshots {
    constructor(escenario) {
        this.escenario = escenario;
        this.step = 0;
        const escenarioParts = this.escenario.split("-");
        this.functionName = escenarioParts[0];
        this.escenarioName = escenarioParts[1];
    }

    createScreenshotsDir(){
        if (!fs.existsSync("screenshots")) {
            fs.mkdir('screenshots', { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
    }

    createFunctionDir(){
        if (!fs.existsSync('./screenshots/'.concat(this.functionName))) {
            fs.mkdir('/screenshots/'.concat(this.functionName), { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
    }

    getName(){
        this.step = this.step + 1;
        return "./screenshots/".concat(this.functionName).concat('/').
            concat(this.escenarioName).concat("-Step").concat(this.step).concat(".png");
    }
}

module.exports = Screenshots;