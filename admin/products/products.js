// KHAI BÁO ĐƯỜNG DẪN
const url = "http://localhost:3000/products";
const urlCate = "http://localhost:3000/categories";
var id = null;

// LIST PRODUCT
function listProduct() {
  var urlList = "http://localhost:3000/products?_sort=id&_order=desc";
  fetch(urlList, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var strContent = "";
      data.forEach((element) => {
        strContent += `
              <tr id='row-${element.id}'>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td><img src="../../public/uploads/product/${
                  element.image
                }" width=80px; alt=""></td>
                <td>${numberWithCommas(
                  element.price
                )} <sup><b>VNĐ</b></sup></td>
                <td> 
                    <a href="update-product.html?id=${
                      element.id
                    }" class = "btn-edit btn btn-primary btn-md">Sửa</a>
                    <a onclick="deleteProduct(${
                      element.id
                    })" class = "btn-del btn btn-danger btn-md">Xóa</a>
                </td>
              </tr>
          `;
      });
      document.querySelector("#table-pro").innerHTML = strContent;
    });
}

// EDIT PRODUCT
function editProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  id = urlParams.get("id");
  console.log(id);
  var urlEdit = url + "/" + id;
  fetch(urlEdit)
    .then((res) => res.json())
    .then((data) => {
      var strEdit = `
                <div class="form-group">
                            <div class="form-group">
                            <label for="">Tên hàng hóa:</label>
                            <input type="text" class="form-control"  name="name" value="${data.name}"
                                placeholder="Nhập tên hàng hóa ...">
                            </div>
            
                            <div class="form-group">
                            <label for="">Đơn giá</label>
                            <input type="number" class="form-control"  name="price" value="${data.price}"
                                placeholder="Nhập đơn giá ...">
                            </div>
            
            
                            <div class="form-group">
                            <label for="">Hình ảnh</label>
                            <input type="file" class="form-control-file border" name="image1">
                            <input name="image" type="hidden" value="${data.image}" ><br>
                            <img src="../../public/uploads/product/${data.image}" alt="" style="width:80px"><br>
                            ${data.image}
                            </div>
            
                            <div class="form-group">
                            <label for="">Mô tả:</label>
                            <textarea class="form-control" rows="5" name="detail"
                                placeholder="Mô tả hàng hóa ...">${data.detail}</textarea>
                            </div>
            
                            <div class="form-group">
                            <label for="">Mã loại?</label>
                            <select id="show_cate" name="cate_id" class="form-control">
                            
                            </select>
                            </div>
                            <button onclick="updateProduct()" class="btn btn-primary">Sửa</button> 
                `;
      // console.log(strEdit);
      document.querySelector("#edit-product").innerHTML = strEdit;

      // SỬ DỤNG setTimeout để xử lý bất đồng bộ
      setTimeout(() => {
        document.querySelector("#option-" + data.cate_id).selected = true;
      }, 100);

      showCate();
    });
}

// UPDATE PRODUCT
function updateProduct() {
  var name = document.querySelector('[name="name"]').value;
  var cate_id = document.querySelector('[name="cate_id"]').value;
  var price = document.querySelector('[name="price"]').value;
  var detail = document.querySelector('[name="detail"]').value;
  var img_value = document.querySelector('[name="image"]').value;
  var img_value1 = document.querySelector('[name="image1"]').value;

  var image = "";
  // Nếu không tồn tại img_value1 thỳ lấy img_value và ngược lại
  if (!img_value1) {
    image = img_value;
  } else {
    image = img_value1.slice(12);
  }
  console.log(image);

  var urlUpdate = url + "/" + id;
  fetch(urlUpdate, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      cate_id: cate_id,
      price: price,
      detail: detail,
      image: image,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      window.location.href = "list-product.html";
    });
}

// DELETE PRODUCT
function deleteProduct(id) {
  var removeNode = document.querySelector("#row-" + id);
  console.log(removeNode);
  removeNode.parentNode.removeChild(removeNode);

  var removeUrl = url + "/" + id;
  fetch(removeUrl, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// ADD PRODUCT
function addProduct() {
  var name = document.querySelector('[name="name"]').value;
  var cate_id = document.querySelector('[name="cate_id"]').value;
  var price = document.querySelector('[name="price"]').value;
  var detail = document.querySelector('[name="detail"]').value;
  var img_value = document.querySelector('[name="image"]').value;
  var img = String(img_value);
  console.log(img);
  // Thực hiện cắt chuỗi để lấy đường dẫn ảnh
  var image = img.slice(12);
  console.log(image);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      cate_id: cate_id,
      price: price,
      detail: detail,
      image: image,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      window.location.href = "list-product.html";
    });
}

// SHOW CATE
function showCate() {
  fetch(urlCate)
    .then((res) => res.json())
    .then((data) => {
      var strCate = "";
      data.forEach((element) => {
        strCate += `
            <option id='option-${element.id}' value="${element.id}">${element.name}</option>
          `;
      });
      document.querySelector("#show_cate").innerHTML = strCate;
    });
}

// FORMAT NUMBER
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}
