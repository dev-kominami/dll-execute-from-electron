const button = document.querySelector('.dll-button');

button.addEventListener('click', async function (clickEvent) {
    console.log("ボタン押された");
    const res = await window.requires.register_callback();
    console.log('res',res); // TODO: resはnullになる

    // TODO: test_printを実行するとelectronが落ちる
    // window.requires.test_print();
})