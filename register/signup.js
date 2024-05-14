const signup = document.querySelector("#reg")
const login = document.querySelector("#login")

signup.addEventListener('click', () =>{
    let fname = document.querySelector("input[name='fname']").value;
    let lname = document.querySelector("input[name='lname']").value;
    let email = document.querySelector("input[name='email']").value;
    let password = document.querySelector("input[name='password']").value;
    let cpass = document.querySelector("input[name='cpassword']").value;

    console.log(fname, lname, email, password, cpass);

    if (fname == "") {
        alert("Please enter your first name");
        console.log("here");
        firstname.focus();
        return
    }
    if (lname == "") {
        alert("Please enter your last name");
        lastname.focus();
        return
    }
    if (email == "") {
        alert("Please enter your email");
        email.focus();
        return
    }
    if (password == "") {
        alert("Please enter your password");
        password.focus();
        return
    }
    if (password !== cpass) {
        alert("Password does not match");
        document.querySelector("input[name='cpassword']").value="";
        cpass.focus();
        return
    }

    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
    let verify = user.some((ele) => {
        return ele.mail === email;
    });

    if (verify) {
        alert("User already exists");
        return;
    } else {
        let obj = {
            fName: fname,
            lName: lname,
            mail: email,
            pass: password,
        };

        user.push(obj);
        localStorage.setItem("user", JSON.stringify(user));
    }
    alert("User Registered successfully");
    document.querySelector("input[name='fname']").value="";
    document.querySelector("input[name='lname']").value="";
    document.querySelector("input[name='email']").value="";
    document.querySelector("input[name='password']").value="";
    document.querySelector("input[name='cpassword']").value="";
}
)



login.addEventListener('click', () => {
    window.location.href = "../docs/index.html";
})