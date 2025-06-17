document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Home Page - Register button logic
  const registerButtons = document.querySelectorAll(".course-register-button");
  if (registerButtons.length > 0) {
    registerButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const courseTitle = e.target.closest(".main-course").querySelector(".course-title").textContent;
        const encodedCourse = encodeURIComponent(courseTitle.trim());
        window.location.href = `register.html?course=${encodedCourse}`;
      });
    });
  }

  // 🔹 Register Page - Populate course title
  const courseSpan = document.querySelector(".course-title");
  if (courseSpan) {
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get("course");
    if (course) {
      const decodedCourse = decodeURIComponent(course);
      courseSpan.textContent = decodedCourse;
    }
  }

  // ✅ Universal Form Submission Handler (for all pages with form[data-toast])
  const forms = document.querySelectorAll("form[data-toast]");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Get the toast message from data attribute
      const toastMsg = form.getAttribute("data-toast");

      // Special logic only for register.html
      if (window.location.pathname.includes("register.html")) {
        const courseName = document.querySelector(".course-title")?.textContent.trim();
        if (courseName) {
          let registeredCourses = JSON.parse(localStorage.getItem("registeredCourses")) || [];
          if (!registeredCourses.includes(courseName)) {
            registeredCourses.push(courseName);
            localStorage.setItem("registeredCourses", JSON.stringify(registeredCourses));
          }
        }
      }

      // Show toast and clear form
      showToast(toastMsg);
      form.reset();
    });
  });

  // 🔹 Dashboard logic
  const courseListContainer = document.querySelector(".registered-courses-list");
  if (courseListContainer) {
    let registeredCourses = JSON.parse(localStorage.getItem("registeredCourses")) || [];
    if (registeredCourses.length === 0) {
      courseListContainer.innerHTML = "<p style='text-align:center; color: white;'>No courses registered yet.</p>";
    } else {
      courseListContainer.innerHTML = "";
      registeredCourses.forEach((course) => {
        const card = document.createElement("div");
        card.className = "course-card";
        card.innerHTML = `
          <h1 class="course-name">${course}</h1>
          <button class="course-remove-button">Remove</button>
          <button class="course-continue-button">Continue</button>
        `;
        courseListContainer.appendChild(card);
      });

      courseListContainer.addEventListener("click", (e) => {
        const card = e.target.closest(".course-card");
        const courseName = card.querySelector(".course-name").textContent.trim();
        if (e.target.classList.contains("course-remove-button")) {
          registeredCourses = registeredCourses.filter(c => c !== courseName);
          localStorage.setItem("registeredCourses", JSON.stringify(registeredCourses));
          card.remove();
          if (registeredCourses.length === 0) {
            courseListContainer.innerHTML = "<p style='text-align:center; color: yellow;'>No courses registered yet.</p>";
          }
        }
        if (e.target.classList.contains("course-continue-button")) {
          alert(`Continue course: ${courseName}`);
        }
      });
    }
  }

  // 🔹 Scroll animation for course cards (homepage only)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('zoom-in');
        entry.target.classList.remove('zoom-out');
      } else {
        entry.target.classList.remove('zoom-in');
        entry.target.classList.add('zoom-out');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.main-course').forEach(card => {
    observer.observe(card);
  });
});

// ✅ Toast Message Function (used globally)
function showToast(message, callback) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    if (callback) callback();
  }, 3000);
}
