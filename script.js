// 問題回報表單
const reportForm = document.getElementById("reportForm");
const reportResult = document.getElementById("reportResult");




reportForm.addEventListener("submit", function (e) {
  e.preventDefault();




  const name = document.getElementById("reportName").value;
  const type = document.getElementById("reportType").value;




  reportResult.textContent = `已收到 ${name} 的「${type}」問題回報，我們會盡快處理。`;




  reportForm.reset();
});




// 出租服務表單
const calculateBtn = document.getElementById("calculateBtn");
const rentalSummary = document.getElementById("rentalSummary");


calculateBtn.addEventListener("click", function () {


  const itemSelect = document.getElementById("itemType");
  const selectedOption = itemSelect.options[itemSelect.selectedIndex];


  const itemName = selectedOption.value;
  const pricePerDay = Number(selectedOption.dataset.price);


  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;


  if (!itemName || !startDate || !endDate) {
    rentalSummary.innerHTML = "<p style='color:red;'>請先填寫完整資料</p>";
    return;
  }


  const start = new Date(startDate);
  const end = new Date(endDate);


  const diffTime = end - start;
  const days = diffTime / (1000 * 60 * 60 * 24) + 1;


  if (days <= 0) {
    rentalSummary.innerHTML = "<p style='color:red;'>日期錯誤</p>";
    return;
  }


  const total = days * pricePerDay;


  rentalSummary.innerHTML = `
    <h3>租金計算</h3>
    <p>品項：${itemName}</p>
    <p>天數：${days} 天</p>
    <p>單價：NT$ ${pricePerDay}</p>
    <p style="font-size:18px; font-weight:bold;">
      總金額：NT$ ${total}
    </p>
  `;
  rentalSummary.style.display = "block";
});


rentalForm.addEventListener("submit", function (e) {
  e.preventDefault();




  const renterName = document.getElementById("renterName").value;
  const itemName = document.getElementById("itemType").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;




  if (!renterName || !itemName || !startDate || !endDate) {
    rentalSummary.innerHTML = "<p style='color:red;'>請完整填寫租借申請資料。</p>";
    return;
  }




  rentalSummary.innerHTML += `
    <hr style="margin: 16px 0;">
    <p style="color: green; font-weight: bold;">租借申請已送出，請等待管理者審核。</p>
  `;




  rentalForm.reset();
});


// 取得元素
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");


// 讓所有圖片可點擊
document.querySelectorAll(".card img").forEach(img => {
  img.addEventListener("click", function () {
    lightbox.style.display = "block";
    lightboxImg.src = this.src;
  });
});


// 點 X 關閉
closeBtn.onclick = function () {
  lightbox.style.display = "none";
};


// 點背景也可以關閉
lightbox.onclick = function (e) {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
};


document.addEventListener("DOMContentLoaded", function () {


  const track = document.querySelector("#function .carousel-track");
  const cards = document.querySelectorAll("#function .card");
  const nextBtn = document.querySelector("#function .next");
  const prevBtn = document.querySelector("#function .prev");
  const dotsContainer = document.querySelector("#function .dots");


  let index = 0;


  // 建立 dots
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");


    dot.addEventListener("click", () => {
      index = i;
      updateSlide();
    });


    dotsContainer.appendChild(dot);
  });


  const dots = document.querySelectorAll("#function .dots span");


  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;


    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }


  // 按鈕
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % cards.length;
    updateSlide();
  });


  prevBtn.addEventListener("click", () => {
    index = (index - 1 + cards.length) % cards.length;
    updateSlide();
  });


  // 手機滑動
  let startX = 0;


  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });


  track.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;


    if (startX - endX > 50) {
      index = (index + 1) % cards.length;
    } else if (endX - startX > 50) {
      index = (index - 1 + cards.length) % cards.length;
    }


    updateSlide();
  });


});



