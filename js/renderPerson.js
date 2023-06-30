import { listPerson } from "./main.js"
import { Student } from "./Student.js"
import { Employee } from "./Employee.js"
import { Customer } from "./Customer.js"
import { showNotification } from "./showNotification.js"


export const renderPersons = (persons) => {
    const userContent = document.getElementById('userBody');
    userContent.innerHTML = '';
    persons.forEach(person => {
        const row = `
            <tr>
                <td>${person.name}</td>
                <td>${person.address}</td>
                <td>${person.id}</td>
                <td>${person.email}</td>
                <td>${person.type}</td>
                <td>
                    <button class="btn btn-primary view-info-btn" data-person-name="${person.name}">Xem thông tin</button>
                </td>
                <td>
                <button class="btn btn-primary btn-sm btn-userinfo" data-person-name="${person.name}" data-toggle="modal"
                data-target="#myModal"><i class="fa-solid fa-magnifying-glass"></i></button>
                <button  class="btn btn-danger btn-sm btn-delete" data-person-name="${person.name}"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;
        userContent.innerHTML += row;
    })

    const viewInfoButtons = document.querySelectorAll('.view-info-btn');
    viewInfoButtons.forEach(button => {
        button.addEventListener('click', handleViewInfo);
    });
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDeletePerson);
    });
    const userInfoButtons = document.querySelectorAll('.btn-userinfo');
    userInfoButtons.forEach(button => {
        button.addEventListener('click', handleShowUser)
    })
}

const handleViewInfo = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút
    const personName = event.target.dataset.personName;
    const storedPersons = localStorage.getItem('persons');
    
    if (storedPersons) {
        const persons = JSON.parse(storedPersons);
        const person = persons.find(p => p.name === personName);
        console.log(person)

        let popupContent = "";
        let popupSubtitle = "";
        if (person.type === "Học viên") {
            popupSubtitle = "Học viên";
            popupContent = `
                <label for="field1">Điểm Toán:</label>
                <input type="text" id="field1" value="${person.toan}" disabled>
                <label for="field2">Điểm Lý :</label>
                <input type="text" id="field2" value="${person.ly}" disabled>
                <label for="field3">Điểm Hoá:</label>
                <input type="text" id="field3" value="${person.hoa}" disabled>
                <label for="field3">Điểm trung bình:</label>
                <div class="alert alert-warning" role="alert">
                    👉<span id="txtArray">${person.TB}</span>
                </div>  
            `;
            
        } else if (person instanceof Employee) {
            popupSubtitle = "Nhân viên";
            popupContent = `
                <label for="field1">Số ngày làm việc :</label>
                <input type="text" id="field1" value="${person.workDays}" disabled>
                <label for="field2">Lương theo ngày :</label>
                <input type="text" id="field2" value="${person.dailySalary}" disabled>
                <label for="field3">Tổng lương:</label>
                <div class="alert alert-warning" role="alert">
                    👉<span id="txtArray">${person.getSalary()}</span>
                </div>  
            `;
        } else if (person instanceof Customer) {
            popupSubtitle = "Khách hàng";
            popupContent = `
                <label for="field1">Tên công ty :</label>
                <input type="text" id="field1" value="${person.companyName}" disabled>
                <label for="field2">Trị giá hoá đơn :</label>
                <input type="text" id="field2" value="${person.orderValue}" disabled>
                <label for="field3">Đánh giá :</label>
                <input type="text" id="field3" value="${person.rating}" disabled>   
            `;
        }
        console.log(popupContent)
        console.log(person.toan)
        console.log(person.TB)

        showPopup(personName, popupSubtitle, popupContent);
    }
}

const handleDeletePerson = (event) => {
    const personName = event.currentTarget.dataset.personName;
    const person = listPerson.persons.find(p => p.name === personName);

    if (person) {
        const confirmation = confirm("Bạn có muốn xoá người dùng?");
        if (confirmation) {
            listPerson.removePerson(person.id);
            listPerson.saveToLocalStorage();
            showNotification("Xoá thành công", true);
            renderPersons();
        }
    }
};

const handleShowUser = (event) => {
    const personName = event.currentTarget.dataset.personName;
    const person = listPerson.persons.find(p => p.name === personName);

    if (person) {
        const index = listPerson.findIndex(person.id);

        if (index > -1) {
            const userInfo = listPerson.persons[index];

            document.getElementById('txtName').value = userInfo.name;
            document.getElementById('txtDiaChi').value = userInfo.address;
            document.getElementById('txtMa').value = userInfo.id;
            document.getElementById('txtEmail').value = userInfo.email;
            document.getElementById('loaiND').value = userInfo.type;

            if (userInfo instanceof Student) {
                document.getElementById('txtDiemToan').value = userInfo.math;
                document.getElementById('txtDiemLy').value = userInfo.physics;
                document.getElementById('txtDiemHoa').value = userInfo.chemistry;
            } else if (userInfo instanceof Employee) {
                document.getElementById('txtNgayLam').value = userInfo.workDays;
                document.getElementById('txtLuong').value = userInfo.dailySalary;
            } else if (userInfo instanceof Customer) {
                document.getElementById('txtTenCT').value = userInfo.companyName;
                document.getElementById('txtTriGiaHD').value = userInfo.orderValue;
                document.getElementById('txtDanhGia').value = userInfo.rating;
            }
        }
    }
}




const showPopup = (personName, popupSubtitle, popupContent) => {
    const popupHTML = `
        <div class="popup-overlay">
            <div class="popup-container">
                <h2>Thông tin của ${personName}</h2>
                <h3>${popupSubtitle}</h3>
                <div class="popup-content">
                    ${popupContent}
                </div>
                <button class="popup-close">Đóng</button>
            </div>
        </div>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = popupHTML;

    const popup = tempDiv.firstElementChild;
    const closeButton = popup.querySelector('.popup-close');

    closeButton.addEventListener('click', () => {
        popup.parentNode.removeChild(popup);
    });

    document.body.appendChild(popup);
};

const filterByType = () => {
    const selectElement = document.getElementById('shortND');
    const selectedType = selectElement.value;

    // Lấy danh sách người dùng từ local storage
    const storedPersons = localStorage.getItem('persons');
    let persons = [];

    if (storedPersons) {
        persons = JSON.parse(storedPersons);
    }

    // Lọc danh sách người dùng theo loại
    let filteredPersons = [];
    if (selectedType === 'ALL') {
        filteredPersons = persons; // Hiển thị tất cả người dùng
    } else {
        filteredPersons = persons.filter(person => person.type === selectedType);
    }

    // Hiển thị danh sách người dùng đã lọc
    console.log(filteredPersons)
    renderPersons(filteredPersons);
};

// Sự kiện lắng nghe khi select box thay đổi giá trị
const selectElement = document.getElementById('shortND');
selectElement.addEventListener('change', filterByType);


let sortOrder = 'asc'; // Đánh dấu trạng thái sắp xếp hiện tại

const sortByNameBtn = document.getElementById('sortByNameBtn');
const sortArrowIcon = document.getElementById('sortArrowIcon');

sortByNameBtn.addEventListener('click', sortPersonsByName);

function sortPersonsByName() {
    // Lấy danh sách người dùng từ local storage
    const storedPersons = localStorage.getItem('persons');
    let persons = [];

    if (storedPersons) {
        persons = JSON.parse(storedPersons);
    }

    // Sắp xếp danh sách người dùng theo họ tên
    if (sortOrder === 'asc') {
        persons.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        sortOrder = 'desc'; // Chuyển sang trạng thái sắp xếp giảm dần
        sortArrowIcon.classList.remove('fa-sort-down');
        sortArrowIcon.classList.add('fa-sort-up');
    } else {
        persons.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA > nameB) {
                return -1;
            }
            if (nameA < nameB) {
                return 1;
            }
            return 0;
        });
        sortOrder = 'asc'; // Chuyển sang trạng thái sắp xếp tăng dần
        sortArrowIcon.classList.remove('fa-sort-up');
        sortArrowIcon.classList.add('fa-sort-down');
    }

    // Hiển thị danh sách người dùng đã sắp xếp
    renderPersons(persons);
}


const searchInput = document.getElementById('search');

searchInput.addEventListener('input', searchPersonsByName);

function searchPersonsByName() {
    const keyword = searchInput.value.toLowerCase();

    // Lấy danh sách người dùng từ local storage
    const storedPersons = localStorage.getItem('persons');
    let persons = [];

    if (storedPersons) {
        persons = JSON.parse(storedPersons);
    }

    // Lọc danh sách người dùng theo tên
    const searchPerson = persons.filter(person => person.name.toLowerCase().includes(keyword));

    // Hiển thị danh sách người dùng đã lọc
    renderPersons(searchPerson);
}






