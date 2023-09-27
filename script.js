const word_element = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_element = document.getElementById('success-message');
const wrongLetters_element = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainBtn = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];

// Selected Word Degiskenine Atanan Degeri Otomatik Olarak Degistirilebilir Hale Getiriyoruz
let selectedWord = getRandomWord();

// Fonksiyon Cagirildiginda Icinde Bulunan Kelimelerin Harfleri Karsimiza Cikacak
function getRandomWord() {
    const words = ["javascript","java","python","css","html"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {    
    word_element.innerHTML = 
    
        // Kelimenin Icindeki Harfleri letter Degiskeni Uzerinden Tarama Yapiyoruz
        // correctLetters Degiskeni Uzerinden 
        // Dogru Cikan Harfleri Ekranda Gosteriyoruz
        // Harfleri Ekranda Gosterme Islemi Icin 
        // Join Kullanarak String Tipine Ceviriyoruz
        `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}    
    `;

    // Kelimenin Harflerini Yanyana Siraliyoruz
    const word = word_element.innerText.replace(/\n/g,'');

    // Kelime Dogru Bilindiginde Ekranda Popup Ekrani Acilacak
    if (word === selectedWord) {
        popup.style.display = 'flex';
        message_element.innerText = 'Tebrikler kazandınız.';
    }
}

function updateWrongLetters() {

    // Hatali Harf Girisi Yapilmis Ise
    // Bunlari Yazdiriyoruz
    wrongLetters_element.innerHTML = `
        ${wrongLetters.length>0?'<h3>Hatalı harfler</h3>':''}
        ${wrongLetters.map(letter=> `<span>${letter}<span>`)}
    `;

    // Hatali Harf Girisi Yapildiginda 
    // Ekranda Bir Parcanin Gorunmesini Sagliyoruz
    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if (index<errorCount) {
            
            // Hatali Harf Girisi Var Ise Ekranda Hatali Harflerin Oldugu Element Gosterilecek
            item.style.display = 'block';
        } else {

            // Hatali Harf Girisi Yok Ise Ekranda Hatali Harflerin Oldugu Element Gosterilmeyecek
            item.style.display = 'none';
        }
    })

    // Hatali Harf Girisi Sayisi Toplam Element Sayisi Ile Ayni Oldugunda
    if(wrongLetters.length === items.length) {
        popup.style.display = 'flex';

        // Ekranda Kullaniciya Uyari Mesaji Veriyoruz
        message_element.innerText = 'Unfortunately You Lost.';
    }
}

// Hatali Harf Girisi Oldugunda Kullaniciyi Bilgirendiren Mesaji
function displayMessage() {    
    message.classList.add('show');

    // Ekranda 2 Saniye Sureyle Gosteriyoruz
    setTimeout(function() {
        message.classList.remove('show');
    }, 2000);
}

// Oyun Bittikten Sonra Gorunecek Play Again Butonuna Tiklandiginda
PlayAgainBtn.addEventListener('click', function() {

    // Dogru Girilen Harfler Array ini Sifirliyoruz
    correctLetters.splice(0);

    // Yanlis Girilen Harfler Array ini Sifirliyoruz
    wrongLetters.splice(0);
    
    selectedWord = getRandomWord();
    
    // Ekranda Bulunan Kelime Ve Hafleri Yeni Oyuna Hazir Hale Getiriyoruz
    displayWord();

    // Yeni Oyunda Hatali Harf Girisi Yapilmasi Ihtimaline Karsi
    // Hatali Harf Giris Kontrolunu Hazir Hale Getiriyoruz 
    updateWrongLetters();

    // Ekranda Gorunen Mesaji Kapali Hale Getiriyoruz
    popup.style.display = 'none';
});

// Kelimenin Harflerini Klavyeden Giriyoruz
window.addEventListener('keydown', function(event) {

    // Sadece Ingizliceye Uyumlu Harf Tuslarina Basildiginda
    if (event.keyCode >= 65 && event.keyCode <= 90) {      
        
        // Basilma Islemini Aliyoruz
        const letter = e.key;

        // Basilan Tusun Oldugu Harfin Sorulan Kelime Icinde Var Olma Durumunu Kontrol Ediyoruz
        if (selectedWord.includes(letter)) {

            // Basilan Tusun Oldugu Harf Daha Once Girilen Harfler Arasinda Yok Ise
            if (!correctLetters.includes(letter)) {

                // Harfi Dogru Girilen Hafler Array i Icine Ekliyoruz
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {

            // Basilan Tusun Oldugu Harf Yanlis Ise Bu Harfleri
            if(!wrongLetters.includes(letter)) {

                // Hatali Girilen Harfler Array ine Gonderiyoruz
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else {
                displayMessage();
            }
        }
    }
});

displayWord()