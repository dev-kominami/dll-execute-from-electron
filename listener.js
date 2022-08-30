const button = document.querySelector('.dll-button');

button.addEventListener('click', async function (clickEvent) {
    console.log("ボタン押された");
    const res = await window.requires.register_callback();
    // TODO: resはnullになる
    console.log('res',res);

    window.requires.test_print();
})