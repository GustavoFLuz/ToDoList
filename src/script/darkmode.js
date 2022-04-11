function toggleDark(){
    const body = document.body;
    const darkModeText = document.getElementsByClassName('dark-mode-text');

    body.classList.toggle('dark');
    
    darkModeText[0].classList.toggle('display-none')
    darkModeText[1].classList.toggle('display-none')
}