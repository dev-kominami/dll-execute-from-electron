const button = document.querySelector('.dll-button');
const addButton = document.querySelector('#add-int-button');

button.addEventListener('click', async function (clickEvent) {
    const res = await window.requires.register_callback();
    // TODO: resはnullになる
    console.log('res',res);

    window.requires.test_print();
  })

addButton.addEventListener('click', async function (clickEvent) {
  const doc = document.getElementById("add-int-value");
  const text = doc.textContent;
  const val = parseInt(text);

  const add_res = await window.requires.test_add_int( { a:val, b:1 } );
  doc.innerHTML = add_res.toString();
})
