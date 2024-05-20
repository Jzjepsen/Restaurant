// TimeSlotContext.js

// Get available dates from the server
export async function getAvailableDates(capacity) {
  try {
    const response = await fetch(`http://localhost:5059/api/Table/availableDates/${capacity}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const dates = await response.json();
    return dates;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Get available timeslots for a specific date from the server
export async function getAvailableTimeslots(date) {
  try {
    const response = await fetch(`http://localhost:5059/api/TimeSlot/availableTimeslots/${date}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const timeslots = await response.json();
    return timeslots;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Confirm booking with the server
export async function AddGuest(GuestId, name, email) {
  try {
    const response = await fetch('http://localhost:5059/api/Guest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        GuestId: GuestId,
        name: name, 
        email: email
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



// Confirm booking with the server
export async function confirmBooking(bookingID, tableID, guestID, timeSlotID, date) {
  try {
    const response = await fetch('http://localhost:5059/api/Booking/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bookingID: bookingID,
        tableID: tableID,
        guestID: guestID,
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
