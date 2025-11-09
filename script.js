function navigate(page) {
  window.location.href = page;
}
function navigate(page) {
  window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
  const adminForm = document.getElementById("adminForm");
  const studentForm = document.getElementById("studentForm");

  if (adminForm) {
    adminForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("✅ Admin Login Successful");
    });
  }

  if (studentForm) {
    studentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("🎓 Student Login Successful");
    });
  }
});
