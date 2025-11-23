// Массив приятных пожеланий
const wishes = [
    "Я всегда с тобой ❤️",
    "Я рядом, моя любовь 💕",
    "Я очень люблю тебя 😘",
    "Ты самая лучшая! 🌸",
    "Мое солнышко ☀️",
    "Ты делаешь мой мир лучше ✨",
    "Обнимаю крепко-крепко 🤗",
    "Скучаю по тебе 💫",
    "Ты мое счастье 🥰",
    "Любуюсь тобой 💖"
];

// Массив воспоминаний
const memories = [
    "А помнишь нашу первую встречу?",
    "А помнишь первое свидание?",
    "А помнишь наш смех до слез?",
    "А помнишь ночные разговоры?",
    "А помнишь как готовили вместе?",
    "А помнишь прогулки под луной?",
    "А помнишь как я тебя забираю?",
    "А помнишь наши объятия?",
    "А помнишь как хорошо вместе?",
    "А помнишь что мы лучшая пара?",
    "А помнишь наши сюрпризы?",
    "А помнишь совместную музыку?",
    "А помнишь мечты о будущем?",
    "А помнишь поддержку в трудный час?",
    "А помнишь наши победы?"
];

let clickCount = 0;
let currentWishIndex = 0;

// Элементы DOM
const counterBook = document.getElementById('counterBook');
const supportVideo = document.getElementById('supportVideo');
const memoriesBtn = document.getElementById('memoriesBtn');
const secretBtn = document.getElementById('secretBtn');
const counterModal = document.getElementById('counterModal');
const videoModal = document.getElementById('videoModal');
const memoriesModal = document.getElementById('memoriesModal');
const secretModal = document.getElementById('secretModal');
const counterNumber = document.getElementById('counterNumber');
const wishMessage = document.getElementById('wishMessage');
const clickArea = document.getElementById('clickArea');
const closeCounterBtn = document.getElementById('closeCounterBtn');
const closeVideoBtn = document.getElementById('closeVideoBtn');
const closeMemoriesBtn = document.getElementById('closeMemoriesBtn');
const closeSecretBtn = document.getElementById('closeSecretBtn');
const photoGallery = document.getElementById('photoGallery');
const memoriesGrid = document.getElementById('memoriesGrid');
const videoPlayer = document.getElementById('supportVideoPlayer');
const videoPlaceholder = document.getElementById('videoPlaceholder');

// Мобильные кнопки
const mobileSupport = document.getElementById('mobileSupport');
const mobileMemories = document.getElementById('mobileMemories');
const mobileSecret = document.getElementById('mobileSecret');
const mobileCounter = document.getElementById('mobileCounter');

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    initEventListeners();
    loadPhotos();
    createMemoriesGrid();
    checkVideo();
});

function initEventListeners() {
    // Десктопные кнопки
    counterBook.addEventListener('click', () => openModal(counterModal));
    supportVideo.addEventListener('click', () => openVideoModal());
    memoriesBtn.addEventListener('click', () => openModal(memoriesModal));
    secretBtn.addEventListener('click', () => openModal(secretModal));

    // Мобильные кнопки
    mobileSupport.addEventListener('click', () => openVideoModal());
    mobileMemories.addEventListener('click', () => openModal(memoriesModal));
    mobileSecret.addEventListener('click', () => openModal(secretModal));
    mobileCounter.addEventListener('click', () => openModal(counterModal));

    // Закрытие
    closeCounterBtn.addEventListener('click', () => closeModal(counterModal));
    closeVideoBtn.addEventListener('click', () => closeVideoModal());
    closeMemoriesBtn.addEventListener('click', () => closeModal(memoriesModal));
    closeSecretBtn.addEventListener('click', () => closeModal(secretModal));

    // Клик по счетчику
    clickArea.addEventListener('click', handleCounterClick);

    // Закрытие по клику вне окна
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
                if (modal === videoModal) {
                    videoPlayer.pause();
                }
            }
        });
    });

    // Видео события
    videoPlayer.addEventListener('loadeddata', function() {
        videoPlaceholder.style.display = 'none';
        videoPlayer.style.display = 'block';
    });

    videoPlayer.addEventListener('error', function() {
        videoPlayer.style.display = 'none';
        videoPlaceholder.style.display = 'block';
        videoPlaceholder.innerHTML = `
            <div style="font-size: 3em; margin-bottom: 15px;">🎬</div>
            <h3 style="color: #d63384; margin-bottom: 10px;">Не удалось загрузить видео</h3>
            <p style="color: #666; margin-bottom: 15px;">Проверьте файл I'malwayswithyou.MP4 в папке images</p>
        `;
    });
}

function openModal(modal) {
    modal.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

function openVideoModal() {
    videoModal.style.display = 'flex';
    checkVideo();
    videoPlayer.play().catch(e => {
        console.log('Автовоспроизведение не разрешено');
    });
}

function closeVideoModal() {
    videoModal.style.display = 'none';
    videoPlayer.pause();
}

function checkVideo() {
    if (videoPlayer.readyState > 0) {
        videoPlaceholder.style.display = 'none';
        videoPlayer.style.display = 'block';
    } else {
        videoPlayer.style.display = 'none';
        videoPlaceholder.style.display = 'block';
    }
}

function handleCounterClick() {
    clickCount++;
    counterNumber.textContent = clickCount;
    
    if (clickCount % 5 === 0) {
        wishMessage.textContent = wishes[currentWishIndex];
        currentWishIndex = (currentWishIndex + 1) % wishes.length;
    }
}

function loadPhotos() {
    const photos = [
    { filename: 'thesweetestface.jpg', description: 'Самое милое личико в мире 🥰' },
    { filename: 'mysweetheart.jpg', description: 'Мое сердце 💖' },
    { filename: 'mymostbelovednyasha.jpg', description: 'Моя самая любимая няша 💕' }
];

    photos.forEach(photo => {
        addLocalPhoto(photo.filename, photo.description);
    });

    setTimeout(checkPhotosLoaded, 1000);
}

function addLocalPhoto(filename, description) {
    const photoCard = document.createElement('div');
    photoCard.className = 'photo-card';
    photoCard.innerHTML = `
        <img src="images/${filename}" alt="${description}" 
             onerror="this.style.display='none'; this.nextElementSibling.innerHTML='📸 Фото не загружено'">
        <p style="margin-top: 10px; color: #666; text-align: center;">${description}</p>
    `;
    photoGallery.appendChild(photoCard);
}

function checkPhotosLoaded() {
    const images = document.querySelectorAll('#photoGallery img');
    let loadedImages = 0;
    
    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            loadedImages++;
        }
    });

    if (loadedImages === 0) {
        showPhotoInstructions();
    }
}

function showPhotoInstructions() {
    photoGallery.innerHTML += `
        <div style="text-align: center; grid-column: 1 / -1; padding: 20px; background: rgba(255,255,255,0.8); border-radius: 15px; margin-top: 20px;">
            <h3 style="color: #d63384; margin-bottom: 15px;">💕 Как добавить фотографии 💕</h3>
            <p style="color: #666;">Убедитесь что в папке "images" есть файлы:</p>
            <ul style="color: #666; text-align: left; display: inline-block; margin: 10px 0;">
                <li>Thesweetestface.JPG</li>
                <li>Mysweetheart.JPG</li>
                <li>mymostbelovednyasha.JPG</li>
            </ul>
        </div>
    `;
}

function createMemoriesGrid() {
    memoriesGrid.innerHTML = '';
    
    memories.forEach(memory => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        memoryItem.textContent = memory;
        memoriesGrid.appendChild(memoryItem);
    });
}