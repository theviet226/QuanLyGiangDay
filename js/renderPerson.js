import { listPerson } from "./main.js"
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
                    <button class="btn btn-success view-info-btn" data-person-name="${person.name}">Xem thông tin</button>
                </td>
                <td>
                <button class="btn btn-primary btn-sm btn-userinfo" data-person-name="${person.name}" data-toggle="modal"
                data-target="#myModal"><i class="fa-solid fa-pen-to-square"></i></button>
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


//Xử lý nút xem thông tin của từng loại người dùng
const handleViewInfo = (event) => {
    event.preventDefault(); 
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

        } else if (person.type === "Nhân viên") {
            popupSubtitle = "Nhân viên";
            popupContent = `
                <label for="field1">Số ngày làm việc :</label>
                <input type="text" id="field1" value="${person.soNgayLam}" disabled>
                <label for="field2">Lương theo ngày :</label>
                <input type="text" id="field2" value="${person.luong}" disabled>
                <label for="field3">Tổng lương:</label>
                <div class="alert alert-warning" role="alert">
                    👉<span id="txtArray">${person.salary}</span>
                </div>  
            `;
        } else if (person.type === "Khách hàng") {
            popupSubtitle = "Khách hàng";
            popupContent = `
                <label for="field1">Tên công ty :</label>
                <input type="text" id="field1" value="${person.tenCongTy}" disabled>
                <label for="field2">Trị giá hoá đơn :</label>
                <input type="text" id="field2" value="${person.giaHoaDon}" disabled>
                <label for="field3">Đánh giá :</label>
                <input type="text" id="field3" value="${person.danhGia}" disabled>   
            `;
        }
        console.log(popupContent)
        console.log(person.toan)
        console.log(person.TB)

        showPopup(personName, popupSubtitle, popupContent);
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

//Xử lý nút xoá
const handleDeletePerson = (event) => {
    const personName = event.currentTarget.dataset.personName;
    const person = listPerson.persons.find(p => p.name === personName);

    if (person) {
        const confirmation = confirm("Bạn có muốn xoá người dùng?");
        if (confirmation) {
            listPerson.removePerson(person.id);
            listPerson.saveToLocalStorage();
            showNotification("Xoá thành công", true);
            renderPersons(listPerson.persons);
        }
    }
};


//Xử lý nút sửa thông tin
const handleShowUser = (event) => {
    const personName = event.currentTarget.dataset.personName;
    const person = listPerson.persons.find(p => p.name === personName);

    if (person) {
        const index = listPerson.persons.findIndex(person => person.id === person.id);

        if (index > -1) {
            const userInfo = listPerson.persons[index];
            document.getElementById('txtName').value = userInfo.name;
            document.getElementById('txtDiaChi').value = userInfo.address;
            document.getElementById('txtMa').value = userInfo.id;
            document.getElementById('txtMa').disable=true;
            document.getElementById('txtEmail').value = userInfo.email;
            document.getElementById('loaiND').value = userInfo.type;
            window.showFields('loaiND');

            if (userInfo.type === "Học viên") {
                document.getElementById('txtDiemToan').value = userInfo.toan;
                document.getElementById('txtDiemLy').value = userInfo.ly;
                document.getElementById('txtDiemHoa').value = userInfo.hoa;
            } else if (userInfo.type === "Nhân viên") {
                document.getElementById('txtNgayLam').value = userInfo.soNgayLam;
                document.getElementById('txtLuong').value = userInfo.luong;
            } else if (userInfo.type === "Khách hàng") {
                document.getElementById('txtTenCT').value = userInfo.tenCongTy;
                document.getElementById('txtTriGiaHD').value = userInfo.giaHoaDon;
                document.getElementById('txtDanhGia').value = userInfo.danhGia;
            }
            listPerson.saveToLocalStorage();
        }
    }
};










