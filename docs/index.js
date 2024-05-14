const signup=document.querySelector("#signUp")
const login=document.querySelector("#signIn")




var data = JSON.parse(localStorage.getItem("user"));
console.log(data);
login.addEventListener("click",() => {
  if (data == null) {
    alert("Please register first")
      return;
  }

  let email = document.querySelector("input[name='email']").value;
  let password = document.querySelector("input[name='password']").value;

  if (email == "") {
      alert("Please enter the email");
      email.focus();
      return
  }
  if (password == "") {
      alert("Please enter the password");
      password.focus();
      return
  }

  let current;
  data.some(ele => {
      if (ele.mail == email && ele.pass == password) {
          current = ele;
          alert('Logged in successfully');
          current = JSON.stringify(current);
          localStorage.setItem("currUser", current);
          window.location.href = "../expenseTracker/home.html";
      } else {
            alert("wrong password or username")
          return;
      }

  });

})

signup.addEventListener('click', () => {
  window.location.href = "../register/signup.html";
})