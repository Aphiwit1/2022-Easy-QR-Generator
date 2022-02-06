let btn = document.querySelector(".button");
let qr_code_ele = document.querySelector(".qr-code");
let user_input = document.querySelector("#input_text");
let btn_download = document.createElement("button");


// color variable
let website_name = document.querySelector('.website-name')
let github = document.querySelector('.github')
let website_text = document.querySelector('.website-text')
let created_qr_text = document.querySelector('.created-qr-text') 
// color
let btn_red = document.querySelector(".btn-red")


btn.addEventListener("click", function () {
  // user_input has a value
  if (user_input.value !== "") {
    // it doesn't ever generated before
    if (qr_code_ele.childElementCount === 0) {
        generateQrCode(user_input);
    }
    // it has ever generated before
    else {
      qr_code_ele.innerHTML = "";
      generateQrCode(user_input);
    }
  }
  // user_input doesn't have a value
  else {
    alert("Please input your website name");
    qr_code_ele.style = "display: none";
  }
});

const generateQrCode = function () {
  qr_code_ele.style = "";
 
  let qrCode = new QRCode(qr_code_ele, {
    text: `${user_input.value}`,
    width: 150,
    height: 150,
    colorDark: "#154993",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  downloadQrCode();
};

const downloadQrCode = function () {
  let a_download_link = document.createElement("a");
  let qr_code_canvas = document.querySelector("canvas");
  let qr_code_img = document.querySelector(".qr-code img");
  let qr_code_title = document.createElement("div")
  qr_code_title.innerHTML = user_input.value? user_input.value : 'Try to generate again!'
  qr_code_title.classList.add('qr-code-text')


  qr_code_ele.appendChild(btn_download);
  qr_code_ele.prepend(qr_code_title)
  a_download_link.setAttribute("download", "your_qr_code.png");
  a_download_link.innerHTML = "Download QR Code";
  if(btn_download.hasChildNodes()) {
       let a_child = document.querySelector('.qr-code button a')
       btn_download.removeChild(a_child)
  }
  btn_download.appendChild(a_download_link);

  if (qr_code_img && qr_code_img.getAttribute("src") == null && qr_code_canvas) {
    setTimeout(() => {
      a_download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
    }, 1000);
  } 
  user_input.value = "";
};

btn_red.addEventListener("click", function(e) {
   console.log(website_name)
   removeClassStartsWith(website_name,'color-')
   removeClassStartsWith(github,'color-')
   removeClassStartsWith(website_text, 'color-')
   removeClassStartsWith(created_qr_text, 'color-')
   removeClassStartsWith(btn, 'color-')

   website_name.classList.add('color-red')
   github.classList.add('color-red')
   website_text.classList.add('color-red')
   created_qr_text.classList.add('color-red')
   btn.classList.add('color-red')
})


const removeClassStartsWith = function (node, className) {
    [...node.classList].forEach(cl => {
       if (cl.startsWith(className)) {
          node.classList.remove(cl)
       }
    })
 }
