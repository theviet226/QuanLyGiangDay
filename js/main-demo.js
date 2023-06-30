

// Lớp Person
class Person {
    constructor(name, address, id, email) {
        this.name = name;
        this.address = address;
        this.id = id;
        this.email = email;
    }
}

// Lớp Student kế thừa từ lớp Person
class Student extends Person {
    constructor(name, address, id, email, math, physics, chemistry) {
        super(name, address, id, email);
        this.math = math;
        this.physics = physics;
        this.chemistry = chemistry;
    }
}

// Lớp Employee kế thừa từ lớp Person
class Employee extends Person {
    constructor(name, address, id, email, workDays, dailySalary) {
        super(name, address, id, email);
        this.workDays = workDays;
        this.dailySalary = dailySalary;
    }
}

// Lớp Customer kế thừa từ lớp Person
class Customer extends Person {
    constructor(name, address, id, email, companyName, orderValue, rating) {
        super(name, address, id, email);
        this.companyName = companyName;
        this.orderValue = orderValue;
        this.rating = rating;
    }
}

// Lớp ListPerson để quản lý các đối tượng trên
class ListPerson {
    constructor() {
        this.persons = [];
    }

    addPerson(person) {
        this.persons.push(person);
    }

    removePerson(id) {
        this.persons = this.persons.filter(person => person.id !== id);
    }

    updatePerson(id, updatedPerson) {
        const index = this.persons.findIndex(person => person.id === id);
        if (index !== -1) {
            this.persons[index] = updatedPerson;
        }
    }

    sortPersonsByName() {
        this.persons.sort((a, b) => a.name.localeCompare(b.name));
    }

    filterPersonsByType(type) {
        return this.persons.filter(person => person instanceof type);
    }
}

// Tạo đối tượng ListPerson
const listPerson = new ListPerson();

const addPerson = () => {
    // Lấy thông tin từ các trường nhập liệu
    const name = document.getElementById("txtName").value;
    const address = document.getElementById("txtDiaChi").value;
    const id = document.getElementById("txtMa").value;
    const email = document.getElementById("txtEmail").value;
    const type = document.getElementById("loaiND").value;

    // Tùy thuộc vào loại người dùng, tạo đối tượng tương ứng
    let person;
    if (type === "Học viên") {
        const math = document.getElementById("txtDiemToan").value;
        const physics = document.getElementById("txtDiemLy").value;
        const chemistry = document.getElementById("txtDiemHoa").value;
        person = new Student(name, address, id, email, math, physics, chemistry);
    } else if (type === "Nhân viên") {
        const workDays = document.getElementById("txtNgayLam").value;
        const dailySalary = document.getElementById("txtLuong").value;
        person = new Employee(name, address, id, email, workDays, dailySalary);
    } else if (type === "Khách hàng") {
        const companyName = document.getElementById("txtTenCT").value;
        const orderValue = document.getElementById("txtTriGiaHD").value;
        const rating = document.getElementById("txtDanhGia").value;
        person = new Customer(name, address, id, email, companyName, orderValue, rating);
    }

    // Thêm người dùng vào danh sách
    listPerson.addPerson(person);
    console.log(listPerson.persons.length); // Check the length of the persons array
    console.log(listPerson.persons[0]);
    showNotification("Thêm thành công", true);
    displayPersons(listPerson);



}
const removePerson = () => {
    const id = document.getElementById("txtRemoveId").value;
    listPerson.removePerson(id);
    showNotification("Xóa thành công", true);
    displayPersons(listPerson);
}

const displayPersons = () => {
    const userTableBody = document.getElementById("userBody");
    userTableBody.innerHTML = "";

    listPerson.persons.forEach(person => {
        let otherInfo = "";
        if (person instanceof Student) {
            otherInfo = `Toán: ${person.math}, Lý: ${person.physics}, Hóa: ${person.chemistry}`;
        } else if (person instanceof Employee) {
            otherInfo = `Số ngày làm việc: ${person.workDays}, Lương theo ngày: ${person.dailySalary}`;
        } else if (person instanceof Customer) {
            otherInfo = `Tên công ty: ${person.companyName}, Trị giá hóa đơn: ${person.orderValue}, Đánh giá: ${person.rating}`;
        }

        const row = `
            <tr>
                <td>${person.name}</td>
                <td>${person.address}</td>
                <td>${person.id}</td>
                <td>${person.email}</td>
                <td>${person.constructor.name}</td>
                <td>${otherInfo}</td>
            </tr>
        `;

        userTableBody.innerHTML += row;
    });
}

// const displayPersons = () => {
//     const userTableBody = document.getElementById("userTableBody");
//     userTableBody.innerHTML = "";

//     listPerson.persons.forEach(person => {
//         let otherInfo = "";
//         let popupButton = "";

//         if (person instanceof Student) {
//             otherInfo = `Toán: ${person.math}, Lý: ${person.physics}, Hóa: ${person.chemistry}`;
//             popupButton = `<button onclick="openPopup('${person.name}', '${otherInfo}')">Xem chi tiết</button>`;
//         } else if (person instanceof Employee) {
//             otherInfo = `Số ngày làm việc: ${person.workDays}, Lương theo ngày: ${person.dailySalary}`;
//             popupButton = `<button onclick="openPopup('${person.name}', '${otherInfo}')">Xem chi tiết</button>`;
//         } else if (person instanceof Customer) {
//             otherInfo = `Tên công ty: ${person.companyName}, Trị giá hóa đơn: ${person.orderValue}, Đánh giá: ${person.rating}`;
//         }

//         const row = `
//       <tr>
//         <td>${person.name}</td>
//         <td>${person.address}</td>
//         <td>${person.id}</td>
//         <td>${person.email}</td>
//         <td>${person.constructor.name}</td>
//         <td>${otherInfo}</td>
//         <td><button  onclick="openPopup(${JSON.stringify(person)})">Xem chi tiết</button></td>
//       </tr>
//     `;

//         userTableBody.innerHTML += row;
//     });
// }


const showFields = (selectId) => {
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


//Thông báo
function showNotification(message, isSuccess) {
    var notification = document.createElement('div');
    notification.className = 'notification';
    if (isSuccess) {
        notification.classList.add('success');
    } else {
        notification.classList.add('error');
    }
    var content = document.createElement('div');
    content.className = 'notification-content';

    var icon = document.createElement('span');
    icon.className = 'notification-icon';
    icon.innerHTML = '&#x1F514;';

    var messageElement = document.createElement('p');
    messageElement.className = 'notification-message';
    messageElement.innerHTML = message;

    var close = document.createElement('span');
    close.className = 'notification-close';
    close.innerHTML = '&times;';

    close.addEventListener('click', function () {
        notification.remove();
    });

    content.appendChild(icon);
    content.appendChild(messageElement);
    content.appendChild(close);
    notification.appendChild(content);

    document.body.appendChild(notification);

    setTimeout(function () {
        notification.classList.add('show');
    }, 100);

    setTimeout(function () {
        notification.remove();
    }, 5000);
}

window.addEventListener('DOMContentLoaded', () => {
    listPerson.loadFromLocalStorage();
    renderPersons(listPerson);
  });
  