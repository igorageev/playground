(function (window) {
  let fields = document.querySelectorAll('.mutable');

  document.getElementById('states').addEventListener('change', event => {
    fields.forEach(item => {
      item.toggleAttribute('disabled', false);
      item.toggleAttribute('readonly', false);
      item.classList.toggle("form-control-readonly", false);
      switch(event.target.value) {
        case 'readonly':
          item.classList.toggle("form-control-readonly", true);
          item.toggleAttribute('readonly', true);
          break;
        case 'disabled':
          item.toggleAttribute("disabled", true);
          break;
        default:
          break;
      }
      console.log(event.target.value);
    })
  });

}(window));