let form = {
  username: document.querySelector("#username"),
  email: document.querySelector("#email"),
  usernameError: document.querySelector("#usernameError"),
  emailError: document.querySelector("#emailError"),
  submit: document.querySelector("#submit")
}

let handleKeyup = () => {
  let valid = validate(form.username.value, form.email.value)

	form.usernameError.innerHTML = valid.username ? "" : "* Name must have only letters"
	form.emailError.innerHTML = valid.email ? "" : "* Invalid email address"
	form.submit.disabled = valid.username && valid.email ? false : true
}

window.addEventListener('keyup', _.debounce(handleKeyup, 1000))