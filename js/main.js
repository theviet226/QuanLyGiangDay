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
    } else if (type == "Nhân viên") {
        const workDays = +document.getElementById('txtNgayLam').value;
        const dailySalary = +document.getElementById('txtLuong').value;
        person = new Employee(name, address, id, email, workDays, dailySalary);
    } else if (type === "Khách hàng") {
        const companyName = document.getElementById('txtTenCT').value;
        const orderValue = document.getElementById('txtTriGiaHD').value;
        const rating = document.getElementById('txtDanhGia').value;
        person = new Customer(name, address, id, email, companyName, orderValue, rating);
    }
    listPerson.addPerson(person);
    console.log(listPerson.persons);

    listPerson.saveToLocalStorage();
    showNotification("Thêm thành công",true);
    renderPersons(listPerson.persons);

    document.getElementById('txtName').value = '';
    document.getElementById('txtDiaChi').value = '';
    document.getElementById('txtMa').value = '';
    document.getElementById('txtEmail').value = '';
    document.getElementById('txtDiemToan').value = '';
    document.getElementById('txtDiemLy').value = '';
    document.getElementById('txtDiemHoa').value = '';
    document.getElementById('txtNgayLam').value = '';
    document.getElementById('txtLuong').value = '';
    document.getElementById('txtTenCT').value = '';
    document.getElementById('txtTriGiaHD').value = '';
    document.getElementById('txtDanhGia').value = '';
};
document.getElementById("btnThemND").addEventListener("click", addPerson);

// const handleDeletePerson  = (event) => {
//     const personName = event.target.dataset.personName;
//     const person = listPerson.persons.find(p => p.name === personName);

//     if (person){
//         const confirmation = confirm("Bạn có muốn xoá người dùng?");
//         if(confirmation){
//             listPerson.removePerson(person.id);
//             showNotification("Xoá thành công", true);
//             renderPersons(listPerson);
//         }
//     }
// }
// document.getElementById("btnDelect").addEventListener("click",handleDeletePerson);



window.showFields = (selectId) => {
    // Ẩn tất cả các div
    document.getElementById("studentFields").style.display = "none";
    document.getElementById("employeeFields").style.display = "none";
    document.getElementById("customerFields").style.display = "none";

    // Hiển thị div tương ứng với select được chọn
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
window.addEventListener('DOMContentLoaded', () => {
    listPerson.loadFromLocalStorage();
    renderPersons(listPerson.persons);
  });


// const filterByType = () => {
//     const selectElement = document.getElementById('shortND');
//     const selectedType = selectElement.value;

//     // Lấy danh sách người dùng từ local storage
//     const storedPersons = localStorage.getItem('persons');
//     let persons = [];

//     if (storedPersons) {
//         persons = JSON.parse(storedPersons);
//     }

//     // Lọc danh sách người dùng theo loại
//     let filteredPersons = [];
//     if (selectedType === 'ALL') {
//         filteredPersons = persons; // Hiển thị tất cả người dùng
//     } else {
//         filteredPersons = persons.filter(person => {
//             if (selectedType === 'Học viên' && person instanceof Student) {
//                 return true;
//             }
//             if (selectedType === 'Nhân viên' && person instanceof Employee) {
//                 return true;
//             }
//             if (selectedType === 'Khách hàng' && person instanceof Customer) {
//                 return true;
//             }
//             return false;
//         });
//     }

//     // Hiển thị danh sách người dùng đã lọc
//     renderPersons(filteredPersons);
// };

// // Sự kiện lắng nghe khi select box thay đổi giá trị
// const selectElement = document.getElementById('shortND');
// selectElement.addEventListener('change', filterByType);









