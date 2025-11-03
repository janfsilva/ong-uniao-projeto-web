// js/script.js
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("#form-cadastro");

  form.addEventListener("submit", function(event) {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!form.checkValidity()) {
      event.preventDefault();
      alert("Por favor, preencha todos os campos obrigatórios antes de enviar.");
    } else {
      event.preventDefault(); // Evita o envio real (somente simulação)
      alert("Cadastro realizado com sucesso!");
      form.reset(); // Limpa o formulário após o envio
    }
  });
});

