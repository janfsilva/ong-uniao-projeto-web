// JS principal — interatividade, acessibilidade e validação
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu');
  const btn = document.getElementById('btn-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const aberto = menu.classList.toggle('aberto');
      btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }

  // CTA nos cards (DOM + feedback)
  const msg = document.getElementById('msg-projetos');
  document.querySelectorAll('[data-cta]').forEach(bt => {
    bt.addEventListener('click', () => {
      const tipo = bt.getAttribute('data-cta');
      if (msg) {
        msg.hidden = false;
        msg.textContent = tipo === 'quero-doar'
          ? 'Obrigado! Clique em Cadastro para nos informar seus dados e finalizar a doação.'
          : (tipo === 'quero-participar'
              ? 'Perfeito! Em Cadastro você pode informar disponibilidade para os mutirões.'
              : 'Ótimo! Preencha o cadastro para avançar.');
        msg.focus?.();
      }
    });
  });

  // Validação e máscaras simples do formulário (Entrega III)
  const form = document.getElementById('form-cadastro');
  const live = document.getElementById('mensagens');

  if (form) {
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');

    function maskCPF(v){
      return v.replace(/\D/g,'').slice(0,11)
              .replace(/(\d{3})(\d)/,'$1.$2')
              .replace(/(\d{3})(\d)/,'$1.$2')
              .replace(/(\d{3})(\d{1,2})$/,'$1-$2');
    }
    function maskTEL(v){
      return v.replace(/\D/g,'').slice(0,11)
              .replace(/(\d{2})(\d)/,'($1) $2')
              .replace(/(\d{4,5})(\d{4})$/,'$1-$2');
    }
    function maskCEP(v){
      return v.replace(/\D/g,'').slice(0,8)
              .replace(/(\d{5})(\d{1,3})$/,'$1-$2');
    }

    [ [cpf,maskCPF], [tel,maskTEL], [cep,maskCEP] ].forEach(([el,fn]) => {
      if (el) el.addEventListener('input', e => { e.target.value = fn(e.target.value || ''); });
    });

    // Persistência simples (localStorage)
    const fields = ['nome','email','cpf','telefone','nascimento','endereco','cep','cidade','estado','area','mensagem'];
    // restaurar
    fields.forEach(id => {
      const el = document.getElementById(id);
      const v = localStorage.getItem('cad_'+id);
      if (el && v) el.value = v;
    });
    // salvar a cada digitação
    form.addEventListener('input', (e) => {
      const t = e.target;
      if (t.id && fields.includes(t.id)) localStorage.setItem('cad_'+t.id, t.value);
    });

    form.addEventListener('submit', (ev) => {
      if (!form.checkValidity()) {
        ev.preventDefault();
        if (live){
          live.hidden = false;
          live.textContent = 'Por favor, preencha todos os campos obrigatórios no formato indicado.';
        } else {
          alert('Por favor, preencha todos os campos obrigatórios.');
        }
        return;
      }
      ev.preventDefault();
      // Limpa persistência após "sucesso"
      fields.forEach(id => localStorage.removeItem('cad_'+id));
      form.reset();
      if (live){
        live.hidden = false;
        live.textContent = 'Cadastro enviado com sucesso! Obrigado por se juntar à ONG União.';
      } else {
        alert('Cadastro enviado com sucesso!');
      }
    });
  }
});


// Controle de tema (claro/escuro) com ícone
(function() {
  const btnToggle = document.getElementById('toggle-dark');
  const icon = document.getElementById('theme-icon');
  if (!btnToggle || !icon) return;

  function aplicarTema(tema) {
    if (tema === 'dark') {
      document.body.classList.add('dark-mode');
      icon.textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      icon.textContent = '🌙';
    }
  }

  const temaSalvo = localStorage.getItem('theme') || 'light';
  aplicarTema(temaSalvo);

  btnToggle.addEventListener('click', () => {
    const novoTema = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    aplicarTema(novoTema);
    localStorage.setItem('theme', novoTema);
  });
})();
