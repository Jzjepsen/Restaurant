//Get available dates from the server
export async function getAvailableDates(capacity) {
  try {
    const response = await fetch(`http://localhost:5059/api/availableTimeslots/${capacity}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const dates = await response.json();
    return dates;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

//Get available timeslots for a specific date from the server
export async function getAvailableTimeslots(date) {
  try {
    const response = await fetch(`http://localhost:5059/api/availableTimeslots/${date}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const timeslots = await response.json();
    return timeslots;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

//Confirm booking with the server
export async function confirmBooking(email, name, tableID, timeSlotID, date) {
  try {
    const response = await fetch('http://localhost:5059/api/ConfirmBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        tableID: tableID,
        timeSlotID: timeSlotID,
        date: date
      })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
