const roomRates = {
    Queen: {
      inSeason: 250.00,
      outOfSeason: 150.00,
      maxOccupancy: 5
    },
    King: {
      inSeason: 250.00,
      outOfSeason: 150.00,
      maxOccupancy: 2
    },
    '2-Bedroom Suite': {
      inSeason: 350.00,
      outOfSeason: 210.00,
      maxOccupancy: 6
    }
  };
  
  const discounts = {
    None: 0,
    'AAA/Senior': 0.10,
    Military: 0.20
  };
  
  const taxRate = 0.12;
  
  const estimateButton = document.getElementById('estimateButton');
  const resultDiv = document.getElementById('resultDiv');
  
  estimateButton.addEventListener('click', estimateStayCost);
  
  function estimateStayCost() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const checkInDate = document.getElementById('checkInDate').value;
    const numNights = document.getElementById('numNights').value;
    const roomType = document.querySelector('input[name="roomType"]:checked').value;
    const maxOccupancy = document.getElementById(`${roomType}MaxOccupancy`).value;
    const numAdults = document.getElementById('numAdults').value;
    const numKids = document.getElementById('numKids').value;
    const discount = document.querySelector('input[name="discount"]:checked').value;
  
    const roomRate = getRoomRate(checkInDate, roomType);
    const totalRoomCost = roomRate * numNights;
    const discountAmount = totalRoomCost * discounts[discount];
    const discountedRoomCost = totalRoomCost - discountAmount;
    const tax = discountedRoomCost * taxRate;
    const totalCost = discountedRoomCost + tax;
  
    if (numAdults + numKids > maxOccupancy) {
      resultDiv.innerText = "The room you selected will not hold your party";
      return;
    }
  
    const confirmationNumber = generateConfirmationNumber(name, checkInDate, numNights, numAdults, numKids);
  
    resultDiv.innerHTML = `
      <p>Original Room Cost: $${totalRoomCost.toFixed(2)}</p>
      <p>Discount: $${discountAmount.toFixed(2)}</p>
      <p>Discounted Room Cost: $${discountedRoomCost.toFixed(2)}</p>
      <p>Tax: $${tax.toFixed(2)}</p>
      <p>Total Cost: $${totalCost.toFixed(2)}</p>
      <p>Confirmation Number: ${confirmationNumber}</p>
    `;
  }
  
  function getRoomRate(checkInDate, roomType) {
    // TO DO: implement logic to determine in-season or out-of-season rate
    return roomRates[roomType].outOfSeason;
  }
  
  function generateConfirmationNumber(name, checkInDate, numNights, numAdults, numKids) {
    const month = checkInDate.split('-')[1];
    const year = checkInDate.split('-')[0];
    return `${name.substring(0, 3)}-${month}${year}-${numNights}:${numAdults}:${numKids}`;
  }