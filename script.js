document.addEventListener("DOMContentLoaded", function () {


  // ===== 問題回報 =====
  const reportForm = document.getElementById("reportForm");
  const reportResult = document.getElementById("reportResult");


  if (reportForm) {
    reportForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("reportName").value;
      const type = document.getElementById("reportType").value;
      reportResult.textContent = `已收到 ${name} 的「${type}」問題回報`;
      reportForm.reset();
    });
  }


  // ===== 租金計算 =====
  const calculateBtn = document.getElementById("calculateBtn");
  const rentalSummary = document.getElementById("rentalSummary");


  if (calculateBtn) {
    calculateBtn.addEventListener("click", function () {


      const itemSelect = document.getElementById("itemType");
      const selectedOption = itemSelect.options[itemSelect.selectedIndex];


      const itemName = selectedOption.value;
      const pricePerDay = Number(selectedOption.dataset.price);


      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;


      if (!itemName || !startDate || !endDate) {
        rentalSummary.innerHTML = "請填寫完整資料";
        return;
      }


      const days = (new Date(endDate) - new Date(startDate)) / 86400000 + 1;
      const total = days * pricePerDay;


      rentalSummary.innerHTML = `總金額：NT$ ${total}`;
      rentalSummary.style.display = "block";
    });
  }


  // ===== carousel =====
  const track = document.querySelector("#function .carousel-track");
  const cards = document.querySelectorAll("#function .card");
  const nextBtn = document.querySelector("#function .next");
  const prevBtn = document.querySelector("#function .prev");
  const dotsContainer = document.querySelector("#function .dots");


  if (track && cards.length) {


    let index = 0;


    // dots
    cards.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");


      dot.onclick = () => {
        index = i;
        updateSlide();
      };


      dotsContainer.appendChild(dot);
    });


    const dots = document.querySelectorAll("#function .dots span");


    function updateSlide() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove("active"));
      dots[index].classList.add("active");
    }


    // 按鈕
    nextBtn.onclick = () => {
      index = (index + 1) % cards.length;
      updateSlide();
    };


    prevBtn.onclick = () => {
      index = (index - 1 + cards.length) % cards.length;
      updateSlide();
    };


    // ⭐ 手機滑動
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
  }


});



