"use strict";

window.onload = function () {
  const submitBtn = document.getElementById("submitBtn");

  const checkInDate = document.getElementById("checkInDate");
  const checkOutDate = document.getElementById("checkOutDate");

  const radioQueenBtn = document.getElementById("radioQueenBtn");
  const radioKingBtn = document.getElementById("radioKingBtn");
  const radioSuiteBtn = document.getElementById("radioSuiteBtn");

  const adultAmount = document.getElementById("adultAmount");
  const childrenAmount = document.getElementById("childrenAmount");

  radioQueenBtn.onclick = roomRate;
  radioKingBtn.onclick = roomRate;
  radioSuiteBtn.onclick = roomRate;

  checkInDate.onchange = nightAmount;
  checkOutDate.onchange = nightAmount;

  adultAmount.onchange = roomRate;
  childrenAmount.onchange = roomRate;

  submitBtn.onclick = stayCost;
};

function nightAmount() {
  const checkInDate = new Date(document.getElementById("checkInDate").value);
  const checkOutDate = new Date(document.getElementById("checkOutDate").value);
  const numberOfNights = document.getElementById("numberOfNights");

  let milisecondsDay = 1000 * 60 * 60 * 24;
  let passedMilliseconds = checkOutDate.getTime() - checkInDate.getTime();

  let dayDiff = passedMilliseconds / milisecondsDay;

  numberOfNights.value = dayDiff;

  return numberOfNights.value;
}

function roomRate() {
  const radioQueenBtn = document.getElementById("radioQueenBtn").checked;
  const radioKingBtn = document.getElementById("radioKingBtn").checked;
  const radioSuiteBtn = document.getElementById("radioSuiteBtn").checked;
  const dailyNightPrice = document.getElementById("dailyNightPrice");
  const adultAmount = Number(document.getElementById("adultAmount").value);
  const childrenAmount = Number(
    document.getElementById("childrenAmount").value
  );
  const messageParagraph = document.getElementById("messageParagraph");

  const checkInDate = new Date(document.getElementById("checkInDate").value);
  const checkOutDate = new Date(document.getElementById("checkOutDate").value);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthCheckIn = months[checkInDate.getMonth()];
  let monthCheckOut = months[checkOutDate.getMonth()];

  let oneDayPrice = 0;

  if (radioQueenBtn || radioKingBtn) {
    if (
      monthCheckIn == "June" ||
      monthCheckIn == "August" ||
      monthCheckOut == "June" ||
      monthCheckOut == "August"
    ) {
      oneDayPrice = 250;
    } else {
      oneDayPrice = 150;
    }
  } else if (radioSuiteBtn) {
    if (
      monthCheckIn == "June" ||
      monthCheckIn == "August" ||
      monthCheckOut == "June" ||
      monthCheckOut == "August"
    ) {
      oneDayPrice = 350;
    } else {
      oneDayPrice = 210;
    }
  }

  dailyNightPrice.innerText = oneDayPrice;

  if (
    (radioQueenBtn && adultAmount + childrenAmount > 5) ||
    (radioKingBtn && adultAmount + childrenAmount > 2) ||
    (radioSuiteBtn && adultAmount + childrenAmount > 6)
  ) {
    messageParagraph.innerText = "Too many people in one room!";
    messageParagraph.style.color = "red";
  } else {
    messageParagraph.innerText = "Room Avaliable";
    messageParagraph.style.color = "green";
  }
}

function stayCost() {
  const numberOfNights = Number(
    document.getElementById("numberOfNights").value
  );
  const dailyNightPrice = Number(
    document.getElementById("dailyNightPrice").textContent
  );
  const noDiscount = document.getElementById("noDiscount").checked;
  const discountSenior = document.getElementById("discountSenior").checked;
  const discountMilitary = document.getElementById("discountMilitary").checked;

  const originalCost = document.getElementById("originalCost");
  const discountTypeInput = document.getElementById("discountTypeInput");
  const roomDiscount = document.getElementById("roomDiscount");
  const tax = document.getElementById("tax");
  const costTotal = document.getElementById("costTotal");

  let discountAmount = 0;

  let originalCostTotal = numberOfNights * dailyNightPrice;

  if (discountSenior) {
    discountTypeInput.innerText = "AAA/Senior (10%)";
    discountAmount = originalCostTotal * 0.1;
  } else if (discountMilitary) {
    discountTypeInput.innerText = "Military (20%)";
    discountAmount = originalCostTotal * 0.2;
  } else {
    discountTypeInput.innerText = "None";
    discountAmount = 0;
  }

  originalCost.innerText = "$" + originalCostTotal; // works

  let roomCostDiscounted = originalCostTotal - discountAmount;
  roomDiscount.innerText = "$" + roomCostDiscounted;

  let taxAmount = roomCostDiscounted * 0.12;

  tax.innerText = "$" + taxAmount.toFixed(2);
  costTotal.innerText = "$" + roomCostDiscounted + taxAmount;
  costTotal.innerText = `$ ${roomCostDiscounted + taxAmount}`;
  debugger;
}