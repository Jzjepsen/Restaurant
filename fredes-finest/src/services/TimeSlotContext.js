async function fetchAllTimeSlots() {
    try {
      const response = await fetch('/api/TimeSlot');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const timeSlots = await response.json();
      return timeSlots;
    } catch (error) {
      console.error('Failed to fetch time slots:', error);
    }
  }
  
  // Usage
  fetchAllTimeSlots().then(timeSlots => {
    console.log('Available Time Slots:', timeSlots);
  });
  