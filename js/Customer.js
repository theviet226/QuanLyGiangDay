import { Person } from "./Person.js";
export class Customer extends Person{
    constructor(name, address, id, email,tenCongTy,giaHoaDon,danhGia){
        super(name, address, id, email);
        this.tenCongTy = tenCongTy;
        this.giaHoaDon = giaHoaDon;
        this.danhGia = danhGia
        this.type = "Khách hàng"
    }
    get companyName() {
        return this.tenCongTy;
    }

    get orderValue() {
        return this.giaHoaDon;
    }

    get rating() {
        return this.danhGia;
    }
}