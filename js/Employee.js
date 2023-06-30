import { Person } from "./Person.js";
export class Employee extends Person{
    salary=0
    constructor(name, address, id, email,soNgayLam,luong){
        super(name, address, id, email);
        this.soNgayLam = soNgayLam;
        this.luong = luong;
        this.type = "Nhân viên"
    }
    get workDays() {
        return this.soNgayLam;
    }

    get dailySalary() {
        return this.luong;
    }
    getSalary(){
        this.salary = this.soNgayLam * this.luong;
        return this.salary
    }
}