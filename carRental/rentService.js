window.onload = function () {
    const estimateButton = document.getElementById("estimateButton");
    estimateButton.addEventListener("click", estimateTotalCost);
    const pickupDateInput = document.getElementById("pickupDateInput");
    const numberOfDaysInput = document.getElementById("numberOfDaysInput");
    const tollTagCheckbox = document.getElementById("tollTagCheckbox");
    const gpsCheckbox = document.getElementById("gpsCheckbox");
    const roadsideCheckbox = document.getElementById("roadsideCheckbox");
    const under25RadioYes = document.getElementById("under25Yes");
    const carRentalTotalTD = document.getElementById("carRentalTotalTD");
    const optionsTotalTD = document.getElementById("optionsTotalTD");
    const under25TotalTD = document.getElementById("under25TotalTD");
    
    function estimateTotalCost() {
      const pickupDate = new Date(pickupDateInput.value);
      const numberOfDays = parseInt(numberOfDaysInput.value);
  
      let carRentalTotal = numberOfDays * 29.99;
      let optionsTotal = 0;
      let under25Surcharge = 0;
  
      if (tollTagCheckbox.checked) {
        optionsTotal += numberOfDays * 3.95;
      }
      if (gpsCheckbox.checked) {
        optionsTotal += numberOfDays * 3.95;
      }
      if (roadsideCheckbox.checked) {
        optionsTotal += numberOfDays * 2.95;
      }
  
      if (under25RadioYes.checked) {
        under25Surcharge = carRentalTotal * 0.3;
      }
  
      carRentalTotalTD.innerText = carRentalTotal.toFixed(2);
      optionsTotalTD.innerText = optionsTotal.toFixed(2);
      under25TotalTD.innerText = under25Surcharge.toFixed(2);
  
      const totalDue = carRentalTotal + optionsTotal + under25Surcharge;
      document.querySelector("table.totals tfoot tr td:last-child").innerText =
        totalDue.toFixed(2);
    }
  };
  