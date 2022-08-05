// Khai báo đường dẫn
const url = 'http://localhost:3000/categories';
var id = null;

// LIST CATEGORIES
function listCate() {
    const urlList = "http://localhost:3000/categories?_sort=id&_order=desc";
    fetch(urlList, {
        method: 'GET'
    }).then((response) => response.json()).then((data) => {
        console.log(data)
        var strContent = "";
        data.forEach(element => {
            strContent += `
              <tr id='row-${element.id}'>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td> 
                    <a href="update-cate.html?id=${element.id}" class = "btn-edit btn btn-primary btn-md">Sửa</a>
                    <a onclick="deleteCate(${element.id})" class = "btn-del btn btn-danger btn-md">Xóa</a>
                </td>
              </tr>
          `
        });
        document.querySelector('#table-cate').innerHTML = strContent;
    })
}


// EDIT CATEGORIES
function editCate() {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    console.log(id);
    var urlEdit = url + "/" + id;
    fetch(urlEdit)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            document.querySelector('[name="id"]').value = data.id;
            document.querySelector('[name="name"]').value = data.name;
        })


}


// UPDATE CATEGORIES
function updateCate() {
    var name = document.querySelector('[name="name"]').value;
    var urlUpdate = url + "/" + id;
    fetch(urlUpdate, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        })
        .then(res => res.json())
        .then(
            () => {
                window.location.href = 'list-cate.html';
            }
        )
}

// DELETE CATEGORIES
function deleteCate(id) {
    var removeNode = document.querySelector('#row-' + id);
    console.log(removeNode);
    removeNode.parentNode.removeChild(removeNode);

    var removeUrl = url + "/" + id;
    fetch(removeUrl, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })

}

// ADD CATEGORIES
function addCate() {
    var name = document.querySelector('[name="name"]').value;
    fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        })
        .then(res => res.json())
        .then(
            () => {
                window.location.href = 'list-cate.html';
            }
        )
}