// TimeSlotContext.js

export async function getAvailableDates(capacity) {
  try {
    const response = await fetch(`https://localhost:7033/api/Table/availableDates/${capacity}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const dates = await response.json();
    return dates;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function getAvailableTimeslots(date, capacity) {
  try {
    const response = await fetch(`https://localhost:7033/api/TimeSlot/availableTimeslots/${date}/${capacity}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const timeslots = await response.json();
    return timeslots;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

export async function AddGuest(GuestId, name, email) {
  try {
    const response = await fetch('https://localhost:7033/api/Guest', {
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

export async function confirmBooking(bookingID, guestID, timeSlotID, date) {
  console.log('Booking parameters:', bookingID, guestID, timeSlotID, date)
  try {
    const response = await fetch('https://localhost:7033/api/Booking/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bookingID: bookingID,
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
