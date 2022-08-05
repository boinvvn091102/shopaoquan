// KHAI BÁO ĐƯỜNG DẪN
const url = "http://localhost:3000/orders";
var id = null;

// LIST ORDERS
function listOrder() {
  var urlList = "http://localhost:3000/orders?_sort=id&_order=desc";
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
                <td>${element.cate_id}</td>
                <td>${element.quantity}</td>
                <td>${numberWithCommas(element.price)}</td>
                <td> 
                    <a href="detail-orders.html?id=${element.id}" class = "btn-edit btn btn-primary btn-md">Chi tiết</a>
                </td>
              </tr>
          `;
      });
      document.querySelector("#table-od").innerHTML = strContent;
    });
}

// // // DETAIL ORDERS
// // function editOrder() {
// //   const urlParams = new URLSearchParams(window.location.search);
// //   id = urlParams.get("id");
// //   console.log(id);
// //   var urlEdit = url + "/" + id;
// //   fetch(urlEdit)
// //     .then((res) => res.json())
// //     .then((data) => {
// //       var strEdit = `
// //                 <div class="form-group">
// //                             <div class="form-group">
// //                             <label for="">Tên hàng hóa:</label>
// //                             <input type="text" class="form-control"  name="name" value="${data.name}"
// //                                 placeholder="Nhập tên hàng hóa ...">
// //                             </div>
            
// //                             <div class="form-group">
// //                             <label for="">Đơn giá</label>
// //                             <input type="number" class="form-control"  name="price" value="${data.price}"
// //                                 placeholder="Nhập đơn giá ...">
// //                             </div>
            
            
// //                             <div class="form-group">
// //                             <label for="">Hình ảnh</label>
// //                             <input type="file" class="form-control-file border" name="image1">
// //                             <input name="image" type="hidden" value="${data.image}" ><br>
// //                             <img src="../../public/uploads/product/${data.image}" alt="" style="width:80px"><br>
// //                             ${data.image}
// //                             </div>
            
// //                             <div class="form-group">
// //                             <label for="">Mô tả:</label>
// //                             <textarea class="form-control" rows="5" name="detail"
// //                                 placeholder="Mô tả hàng hóa ...">${data.detail}</textarea>
// //                             </div>
            
// //                             <div class="form-group">
// //                             <label for="">Mã loại?</label>
// //                             <select id="show_cate" name="cate_id" class="form-control">
                            
// //                             </select>
// //                             </div>
// //                             <button onclick="updateProduct()" class="btn btn-primary">Sửa</button> 
// //                 `;
// //       // console.log(strEdit);
// //       document.querySelector("#edit-product").innerHTML = strEdit;

// //       // SỬ DỤNG setTimeout để xử lý bất đồng bộ
// //       setTimeout(() => {
// //         document.querySelector("#option-" + data.cate_id).selected = true;
// //       }, 100);

// //       showCate();
// //     });
// // }

// // // DELETE ORDER
// // function deleteOrder(id) {
// //   var removeNode = document.querySelector("#row-" + id);
// //   console.log(removeNode);
// //   removeNode.parentNode.removeChild(removeNode);

// //   var removeUrl = url + "/" + id;
// //   fetch(removeUrl, {
// //     method: "DELETE",
// //   })
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log(data);
// //     });
// // }

// // SHOW CATE
// function showCate() {
//   fetch(urlCate)
//     .then((res) => res.json())
//     .then((data) => {
//       var strCate = "";
//       data.forEach((element) => {
//         strCate += `
//             <option id='option-${element.id}' value="${element.id}">${element.cate_id}</option>
//           `;
//       });
//       document.querySelector("#show_cate").innerHTML = strCate;
//     });
// }

// FORMAT NUMBER
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}
