import { Person } from "./Person.js";
export class Student extends Person {
    TB = 0
    constructor(name, address, id, email, toan, ly, hoa) {
        super(name, address, id, email);
        this.toan = toan;
        this.ly = ly;
        this.hoa = hoa;
        this.type = "Học viên"
    }
    get math() {
        return this.toan;
    }

    get physics() {
        return this.ly;
    }

    get chemistry() {
        return this.hoa;
    }
    getAverage() {
        this.TB = (this.toan + this.ly + this.hoa) / 3;
        return this.TB;
    }
}

// import { Person } from "./Person.js";
// export class Student extends Person {
//     TB = 0
//     constructor(toan, ly, hoa,...restPerson) {
//         super(...restPerson);
//         this.toan = toan;
//         this.ly = ly;
//         this.hoa = hoa;
//     }
//     get math() {
//         return this.toan;
//     }

//     get physics() {
//         return this.ly;
//     }

//     get chemistry() {
//         return this.hoa;
//     }
//     getAverage() {
//         this.TB = (this.toan + this.ly + this.hoa) / 3;
//         return this.TB;
//     }
// }