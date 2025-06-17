document.getElementById('register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if (!email.endsWith('@espol.edu.ec')) {
        alert("Debes usar tu correo institucional (@espol.edu.ec)");
        return;
    }
    alert("Registro exitoso. Inicia sesión ahora.");
    window.location.href = "/login";
});

document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = "/home";
});