const loginForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();

  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {

    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {

      document.location.replace('/dashboard');
    } else {
      // console.log(alert)
      alert(response.statusText);
    }
  }
};

const signupForm = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && username && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        name,
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginForm);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupForm);