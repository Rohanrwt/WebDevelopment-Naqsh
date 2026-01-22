/* ============================================
   NAQSH RESORT - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  console.log("Naqsh Resort JS loaded");

  // --- 1. MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById("mobile-menu-toggle");
  const nav = document.querySelector("nav");
  if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
          nav.classList.toggle("active");
      });
  }

  // --- 2. DATE VALIDATION (Min Date = Today) ---
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");

  if (checkinInput && checkoutInput) {
    const today = new Date().toISOString().split("T")[0];
    checkinInput.setAttribute("min", today);

    checkinInput.addEventListener("change", function () {
      if (!this.value) return;
      const checkinDate = new Date(this.value);
      const nextDay = new Date(checkinDate);
      nextDay.setDate(checkinDate.getDate() + 1);
      const nextDayString = nextDay.toISOString().split("T")[0];
      
      checkoutInput.setAttribute("min", nextDayString);
      if (checkoutInput.value && checkoutInput.value < nextDayString) {
        checkoutInput.value = "";
      }
      // Trigger calculation if both dates are set
      calculateTotal(); 
    });
  }

  // --- 3. ADVANCED BOOKING & PRICING LOGIC ---
  const bookingForm = document.getElementById("availability-form");
  const priceSummary = document.getElementById("price-summary");
  const totalDisplay = document.getElementById("total-amount");
  const breakdownContainer = document.getElementById("price-breakdown");
  
  // Pricing Configuration
  const PRICING = {
    group: { rate: 60000, inclusions: "Bonfire, BBQ, Music Night" },
    rooms: {
        "Deluxe Garden": {
            weekday: { ep: 1700, mapai: 2700 }, // Sun-Thu
            weekend: { ep: 2200, mapai: 3200 }  // Fri-Sat
        },
        "Premium Valley": {
            weekday: { ep: 2000, mapai: 3000 },
            weekend: { ep: 2600, mapai: 3600 }
        },
        "Family Suite": {
            weekday: { ep: 2700, mapai: 4300 },
            weekend: { ep: 3500, mapai: 5500 }
        }
    }
  };

  // Inputs
  const inputs = {
    checkin: document.getElementById("checkin"),
    checkout: document.getElementById("checkout"),
    room: document.getElementById("room-type"),
    guests: document.getElementById("guests"),
    mealPlan: document.querySelectorAll('input[name="meal-plan"]'),
    mode: document.querySelectorAll('input[name="booking-mode"]')
  };

  // Initialize Logic
  if (bookingForm) {
    // Mode Toggle Listeners
    inputs.mode.forEach(r => r.addEventListener("change", toggleGroupMode));
    
    // Auto-Calculate Listeners
    const allInputs = [inputs.checkin, inputs.checkout, inputs.room, inputs.guests, ...inputs.mealPlan];
    allInputs.forEach(el => el && el.addEventListener("change", calculateTotal));

    // Form Submit (WhatsApp)
    bookingForm.addEventListener("submit", handleFormSubmit);
    
    // Initialize Toggle State
    toggleGroupMode(); 
  }

  function toggleGroupMode() {
    const modeEl = document.querySelector('input[name="booking-mode"]:checked');
    if (!modeEl) return;
    
    const isGroup = modeEl.value === "group";
    const roomSelectGroup = document.getElementById("room-select-group");
    const mealPlanGroup = document.getElementById("meal-plan-select-group");
    
    // Update UI Classes for Tabs (Visual Feedback)
    document.querySelectorAll('.mode-option').forEach(opt => opt.classList.remove('active'));
    modeEl.closest('.mode-option').classList.add('active');

    if (isGroup) {
        roomSelectGroup.classList.add("hidden");
        mealPlanGroup.classList.add("hidden");
        document.getElementById("guests").value = "10";
    } else {
        roomSelectGroup.classList.remove("hidden");
        mealPlanGroup.classList.remove("hidden");
    }
    calculateTotal();
  }

  function calculateTotal() {
    const checkinStr = inputs.checkin.value;
    const checkoutStr = inputs.checkout.value;
    
    // Reset if dates missing
    if (!checkinStr || !checkoutStr) {
        breakdownContainer.innerHTML = "<p class='placeholder-text'>Select dates to see price.</p>";
        totalDisplay.innerText = "₹0";
        priceSummary.classList.add("hidden");
        return;
    }

    const checkin = new Date(checkinStr);
    const checkout = new Date(checkoutStr);
    if (checkin >= checkout) return;

    const isGroup = document.querySelector('input[name="booking-mode"]:checked').value === "group";
    let total = 0;
    
    // Generate Table HTML
    let html = `<table class="breakdown-table">
                  <thead><tr><th>Date</th><th>Type</th><th style="text-align:right">Rate</th></tr></thead><tbody>`;

    // Iterate Nights
    for (let d = new Date(checkin); d < checkout; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        const dayOfWeek = d.getDay(); // 0=Sun, 6=Sat
        const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6); // Fri & Sat = Weekend
        
        let nightlyRate = 0;
        let rateLabel = "-";
        let typeLabel = isWeekend ? `<span class="tag-weekend">Weekend</span>` : `<span class="tag-weekday">Weekday</span>`;

        if (isGroup) {
            nightlyRate = PRICING.group.rate;
            rateLabel = `₹${nightlyRate.toLocaleString()}`;
            typeLabel = `<span class="tag-weekend" style="background:var(--color-accent);color:black">Full Resort</span>`;
        } else {
            const roomType = inputs.room.value;
            if (roomType) {
                const roomKey = roomType.split(" (")[0]; 
                const planEl = document.querySelector('input[name="meal-plan"]:checked');
                const planKey = (planEl && planEl.value.includes("MAPAI")) ? "mapai" : "ep";

                if (PRICING.rooms[roomKey]) {
                    nightlyRate = isWeekend ? 
                        PRICING.rooms[roomKey].weekend[planKey] : 
                        PRICING.rooms[roomKey].weekday[planKey];
                    rateLabel = `₹${nightlyRate.toLocaleString()}`;
                }
            } else {
                 rateLabel = "Select Room";
            }
        }

        total += nightlyRate;
        html += `<tr>
                    <td>${dateStr}</td>
                    <td>${typeLabel}</td>
                    <td class="row-total">${rateLabel}</td>
                 </tr>`;
    }

    html += `</tbody></table>`;
    
    if (isGroup) {
        html += `<p style="font-size:0.85rem; color:var(--color-text-light); margin-top:5px;">Includes: ${PRICING.group.inclusions}</p>`;
    }

    breakdownContainer.innerHTML = html;
    totalDisplay.innerText = `₹${total.toLocaleString()}`;
    priceSummary.classList.remove("hidden");
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const isGroup = document.querySelector('input[name="booking-mode"]:checked').value === "group";
    const checkin = inputs.checkin.value;
    const checkout = inputs.checkout.value;
    const guests = inputs.guests.value;
    const total = totalDisplay.innerText;
    
    if (!checkin || !checkout) {
        alert("Please select check-in and check-out dates.");
        return;
    }

    let message = "";
    if (isGroup) {
         message = `*Group Booking Inquiry* 🏰%0a` +
                   `Dates: ${checkin} to ${checkout}%0a` +
                   `Type: Full Resort Buyout%0a` +
                   `Est. Guests: ${guests}%0a` +
                   `Total Estimate: ${total}%0a%0a` +
                   `Hi, we are interested in booking the entire resort.`;
    } else {
         const room = inputs.room.value;
         const plan = document.querySelector('input[name="meal-plan"]:checked').value;
         if (!room) {
             alert("Please select a room.");
             return;
         }
         message = `*Booking Inquiry* 🏨%0a` +
                   `Dates: ${checkin} to ${checkout}%0a` +
                   `Room: ${room}%0a` +
                   `Plan: ${plan}%0a` +
                   `Guests: ${guests}%0a` +
                   `Total Estimate: ${total}%0a%0a` +
                   `Is this room available?`;
    }

    window.open(`https://wa.me/919045467967?text=${message}`, "_blank");
  }

});
