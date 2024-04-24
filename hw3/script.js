// Цель: Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, если будет показана та же самая картинка.
// • Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
// • Реализовать все с помощью async/await, без цепочем then.

const APIkey = ''
const UnsplashKey = 'UnsplashPhotos'

const photoContainerEl = document.querySelector('.photo-container')
const photoEl = document.querySelector('.photo')
const photographerNameEl = document.querySelector('.photographer')
const btnLikeEl = document.querySelector('.btn-like')
const btnPrevEl = document.querySelector('.btn-prev')

async function getImages() {
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${APIkey}`
        );
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const json = await response.json()
        return json;
    } catch (error) {
        console.log('Попробуй позже')
    }
}

(async function () {
    try {
        const data = await getImages();
        renderImages(data);
    } catch (error) {
        alert(error);
    }
})();

function renderImages(data) {
    const photoUrl = data.urls.small
    const photographerName = data.user.name

    const photoHistory = getHistory()
    photoHistory.forEach(photo => {
        if (photo.key === photoUrl) {
            photoEl.src = photo.key
            photographerNameEl.textContent = `Photo by ${photo.photographer}`
            btnLikeEl.textContent = 'Like!'
            return
        }
    })
    photoEl.src = photoUrl
    photographerNameEl.textContent = `Photo by ${photographerName}`
    btnLikeEl.textContent = 'Like?'
}


// обработка like
btnLikeEl.addEventListener("click", () => {
    changeLikeBtn();
    const photoHistory = getHistory()

    const index = photoHistory.findIndex(photo => photo.key === photoEl.src)
    if (index) {
        photoHistory.splice(index, 1)
    } else {
        photoHistory.push({ key: photoEl.src, photographer: photographerNameEl.textContent })
    }
    updateHistory(photoHistory)
});


// кнопка назад
btnPrevEl.addEventListener("click", () => {
    const photoHistory = getHistory()

    if (photoHistory.length > 1) {

        let index
        if (btnLikeEl.textContent === "Like!") {
            index = photoHistory.findIndex(photo => photo.key === photoEl.src)

        } else {
            index = photoHistory.length - 1
        }

        try {
            photoEl.src = photoHistory[index - 1].key
            photographerNameEl.textContent = `Photo by ${photoHistory[index - 1].photographer}`
            btnLikeEl.textContent = 'Like!'
        }
        catch (error) {
            alert("No more previous liked images");
            return
        }

    } else {
        alert("No previous liked images");
    }
}
);



// функции к LocalStorage
function getHistory() {
    if (!localStorage.getItem(UnsplashKey)) {
        return []
    }
    return JSON.parse(localStorage.getItem(UnsplashKey))
}


function updateHistory(history) {
    localStorage.setItem(UnsplashKey, JSON.stringify(history))
}

function changeLikeBtn() {
    if (btnLikeEl.textContent === "Like!") {
        btnLikeEl.textContent = "Like?"
    } else {
        btnLikeEl.textContent = "Like!"
    }
}





