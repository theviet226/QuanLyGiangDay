import { showNotification } from "./showNotification.js"
import { Student } from "./Student.js"
import { Employee } from "./Employee.js"
import { Customer } from "./Customer.js"
import { ListPerson } from "./ListPerson.js"
import { renderPersons } from "./renderPerson.js"




export const listPerson = new ListPerson();
const addPerson = () => {
    const name = document.getElementById('txtName').value;
    const address = document.getElementById('txtDiaChi').value;
    const id = document.getElementById('txtMa').value;
    const email = document.getElementById('txtEmail').value;
    const type = document.getElementById('loaiND').value;

    let person;
    if (type === "Học viên") {
        const math = Number(document.getElementById("txtDiemToan").value);
        const physics = +document.getElementById('txtDiemLy').value;
        const chemistry = +document.getElementById('txtDiemHoa').value;
        person = new Student(name, address, id, email, math, physics, chemistry);
        person.getAverage();
    } else if (type == "Nhân viên") {
        const workDays = +document.getElementById('txtNgayLam').value;
        const dailySalary = +document.getElementById('txtLuong').value;
        person = new Employee(name, address, id, email, workDays, dailySalary);
        person.getSalary();
    } else if (type === "Khách hàng") {
        const companyName = document.getElementById('txtTenCT').value;
        const orderValue = document.getElementById('txtTriGiaHD').value;
        const rating = document.getElementById('txtDanhGia').value;
        person = new Customer(name, address, id, email, companyName, orderValue, rating);
    }
    listPerson.addPerson(person);

    console.log(listPerson.persons);

    listPerson.saveToLocalStorage();
    showNotification("Thêm thành công", true);
    renderPersons(listPerson.persons);
    resetForm();
};
document.getElementById("btnThemND").addEventListener("click", addPerson);


//Cập nhập người dùng
const updatePerson = () => {
    listPerson.loadFromLocalStorage(); 
    console.log(listPerson)

   
    const id = document.getElementById('txtMa').value;
    const name = document.getElementById('txtName').value;
    const address = document.getElementById('txtDiaChi').value;
    const email = document.getElementById('txtEmail').value;
    const type = document.getElementById('loaiND').value;

    let person;

    if (type === 'Học viên') {
        const math = +document.getElementById('txtDiemToan').value;
        const physics = +document.getElementById('txtDiemLy').value;
        const chemistry = +document.getElementById('txtDiemHoa').value;   
        person = new Student(id, name, address, email, math, physics, chemistry);
        person.getAverage();
    } else if (type === 'Nhân viên') {
        const workDays = +document.getElementById('txtNgayLam').value;
        const dailySalary = +document.getElementById('txtLuong').value;
        person = new Employee(id, name, address, email, workDays, dailySalary);
        person.getSalary();
    } else if (type === 'Khách hàng') {
        const companyName = document.getElementById('txtTenCT').value;
        const orderValue = document.getElementById('txtTriGiaHD').value;
        const rating = document.getElementById('txtDanhGia').value;
        person = new Customer(id, name, address, email, companyName, orderValue, rating);
    }


    const isUpdated = listPerson.updatePerson(person);
    console.log(isUpdated)

    if (isUpdated) {
        listPerson.saveToLocalStorage();
        renderPersons(listPerson.persons);
        resetForm();
        showNotification('Cập nhật thành công', true);
    } else {
        showNotification('Không tìm thấy người dùng', false);
    }
};
const saveBtn = document.getElementById('btnCapNhat');
saveBtn.addEventListener('click', updatePerson);

const resetForm = () => {
    document.getElementById("form").reset();

}


//Xử lý loại người dùng
window.showFields = (selectId) => {
    document.getElementById("studentFields").style.display = "none";
    document.getElementById("employeeFields").style.display = "none";
    document.getElementById("customerFields").style.display = "none";

    if (selectId === "loaiND") {
        const select = document.getElementById(selectId);
        const selectedOption = select.options[select.selectedIndex].text;
        if (selectedOption === "Học viên") {
            document.getElementById("studentFields").style.display = "block";
        } else if (selectedOption === "Nhân viên") {
            document.getElementById("employeeFields").style.display = "block";
        } else if (selectedOption === "Khách hàng") {
            document.getElementById("customerFields").style.display = "block";
        }
    }
}
//Lọc người dùng theo loại
const filterByType = () => {
    const selectElement = document.getElementById('shortND');
    const selectedType = selectElement.value;
    const filteredPersons = listPerson.filterByType(selectedType);

    renderPersons(filteredPersons);
};


const selectElement = document.getElementById('shortND');
selectElement.addEventListener('change', filterByType);

//Sắp xếp người dùng theo tên
let sortOrder = 'asc';

const sortByNameBtn = document.getElementById('sortByNameBtn');
const sortArrowIcon = document.getElementById('sortArrowIcon');

sortByNameBtn.addEventListener('click', sortPersonsByName);

function sortPersonsByName() {
    listPerson.sortPersonsByName(sortOrder);

    if (sortOrder === 'asc') {
        sortOrder = 'desc';
        sortArrowIcon.classList.remove('fa-sort-down');
        sortArrowIcon.classList.add('fa-sort-up');
    } else {
        sortOrder = 'asc';
        sortArrowIcon.classList.remove('fa-sort-up');
        sortArrowIcon.classList.add('fa-sort-down');
    }
    renderPersons(listPerson.persons);
}


const searchInput = document.getElementById('search');

searchInput.addEventListener('input', searchPersonsByName);

//Tìm kiếm theo tên
function searchPersonsByName() {
    const keyword = searchInput.value.toLowerCase();
    const storedPersons = localStorage.getItem('persons');
    let persons = [];

    if (storedPersons) {
        persons = JSON.parse(storedPersons);
    }
    const searchPerson = persons.filter(person => person.name.toLowerCase().includes(keyword));
    renderPersons(searchPerson);
}

//Hiển thị danh sách khi load trang
window.addEventListener('DOMContentLoaded', () => {
    listPerson.loadFromLocalStorage();
    renderPersons(listPerson.persons);
});












