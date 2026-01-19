/* ============================================
   NAQSH RESORT - MAIN JAVASCRIPT
   ============================================ */

// We'll add functionality here in the next phase:
// 1. Booking type toggle (Room vs Group)
// 2. Date validation
// 3. Availability checking
// 4. Mobile menu toggle

console.log("Naqsh Resort JS loaded");

// Placeholder: Toggle booking type
document.addEventListener("DOMContentLoaded", function () {
  // Get booking type buttons
  const bookingTypeButtons = document.querySelectorAll(".booking-type");
  const availabilityForm = document.getElementById("availability-form");
  const groupInfo = document.getElementById("group-info");

  // Add click handlers
  bookingTypeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      bookingTypeButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Toggle form/group info visibility
      const bookingType = this.getAttribute("data-type");

      if (bookingType === "group") {
        availabilityForm.classList.add("hidden");
        groupInfo.classList.remove("hidden");
      } else {
        availabilityForm.classList.remove("hidden");
        groupInfo.classList.add("hidden");
      }
    });
  });
});
