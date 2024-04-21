
const photoEl = document.querySelector('.photo')
document.addEventListener('click', function (e) {
    if (e.target.matches('input[type="radio"]')) {
        photoEl.setAttribute('src', e.target.value)
        photoEl.setAttribute('alt', e.target.id)
    }
})

const btnNextEl = document.querySelector('.btn-next')
const btnPrevEl = document.querySelector('.btn-prev')

btnNextEl.addEventListener('click', function () {
    const checkedEl = document.querySelector('input[type="radio"]:checked')
    if (checkedEl.nextElementSibling) {
        photoEl.setAttribute('src', checkedEl.nextElementSibling.value)
        photoEl.setAttribute('alt', checkedEl.nextElementSibling.id)
        checkedEl.nextElementSibling.checked = true
    } else {
        photoEl.setAttribute('src', checkedEl.parentElement.firstElementChild.value)
        photoEl.setAttribute('alt', checkedEl.parentElement.firstElementChild.id)
        checkedEl.parentElement.firstElementChild.checked = true
    }


})

btnPrevEl.addEventListener('click', function () {
    const checkedEl = document.querySelector('input[type="radio"]:checked')
    if (checkedEl.previousElementSibling) {
        photoEl.setAttribute('src', checkedEl.previousElementSibling.value)
        photoEl.setAttribute('alt', checkedEl.previousElementSibling.id)
        checkedEl.previousElementSibling.checked = true
    } else {
        photoEl.setAttribute('src', checkedEl.parentElement.lastElementChild.value)
        photoEl.setAttribute('alt', checkedEl.parentElement.lastElementChild.id)
        checkedEl.parentElement.lastElementChild.checked = true
    }


})
