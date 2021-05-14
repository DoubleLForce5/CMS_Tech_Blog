const loginForm = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();

  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {

    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
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
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
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