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
const rentalForm = document.getElementById("rentalForm");
const rentalSummary = document.getElementById("rentalSummary");

function calculateDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end - start;
  const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;

  return diffDays;
}

calculateBtn.addEventListener("click", function () {
  const renterName = document.getElementById("renterName").value;
  const itemSelect = document.getElementById("itemType");
  const selectedOption = itemSelect.options[itemSelect.selectedIndex];
  const itemName = selectedOption.value;
  const pricePerDay = Number(selectedOption.dataset.price);

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const purpose = document.getElementById("purpose").value;

  if (!renterName || !itemName || !startDate || !endDate || !purpose) {
    rentalSummary.innerHTML = "<p style='color:red;'>請先完整填寫租借資料後再計算。</p>";
    return;
  }

  const days = calculateDays(startDate, endDate);

  if (days <= 0 || isNaN(days)) {
    rentalSummary.innerHTML = "<p style='color:red;'>結束日期必須大於或等於開始日期。</p>";
    return;
  }

  const total = days * pricePerDay;

  rentalSummary.innerHTML = `
    <h3>租借摘要</h3>
    <p><strong>租借人：</strong>${renterName}</p>
    <p><strong>租借品項：</strong>${itemName}</p>
    <p><strong>租借天數：</strong>${days} 天</p>
    <p><strong>每日租金：</strong>NT$ ${pricePerDay}</p>
    <p><strong>總租金：</strong>NT$ ${total}</p>
    <p><strong>用途：</strong>${purpose}</p>
  `;
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