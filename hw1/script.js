// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.

// Пользователь может записаться на один курс только один раз.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.

// Начальные данные (JSON):

const initialSchedule = [
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]

const scheduleKey = 'schedule'
const yourScheduleKey = 'yourSchedule'

// Вносим первоначальные данные в хранилище
if (!localStorage.getItem(scheduleKey)) {
    localStorage.setItem(scheduleKey, JSON.stringify(initialSchedule))
}

// Формируем расписание на сайте
const schedule = getSchedule()
const scheduleEl = document.querySelector('.schedule')

schedule.forEach(lesson => {
    createScheduleHtml(lesson)
})

// Навешиваем функционал при клике на кнопку Записаться
const addBtnEl = document.querySelectorAll('.addMe')
addBtnEl.forEach(element => {
    element.addEventListener('click', () => {
        const lessonId = element.closest('.lesson').dataset.id
        const lesson = schedule.find(lesson => lesson.id === Number(lessonId))
        const yourSchedule = getYourSchedule()
        if (Number(lesson.currentParticipants) < Number(lesson.maxParticipants) && !yourSchedule.includes(lessonId)) {
            lesson.currentParticipants = Number(lesson.currentParticipants) + 1
            yourSchedule.push(lessonId)
            updateYourSchedule(yourSchedule)
            updateSchedule(schedule)
            location.reload()
        }
        else {
            alert('Запись невозможна')
        }
    }
    )
})


// Навешиваем функционал при клике на кнопку Выписаться
const removeBtnEl = document.querySelectorAll('.removeMe')
removeBtnEl.forEach(element => {
    element.addEventListener('click', () => {
        const lessonId = element.closest('.lesson').dataset.id
        const lesson = schedule.find(lesson => lesson.id === Number(lessonId))
        const yourSchedule = getYourSchedule()
        if (Number(lesson.currentParticipants) > 0 && yourSchedule.includes(lessonId)) {
            lesson.currentParticipants = Number(lesson.currentParticipants) - 1
            yourSchedule.splice(yourSchedule.indexOf(lessonId), 1)
            updateYourSchedule(yourSchedule)
            updateSchedule(schedule)
            location.reload()
        } else {
            alert('Вы не были записаны')
        }
    })
})



function getSchedule() {
    return JSON.parse(localStorage.getItem(scheduleKey))
}

function getYourSchedule() {
    if (!localStorage.getItem(yourScheduleKey)) {
        return []
    }
    return JSON.parse(localStorage.getItem(yourScheduleKey))
}

function updateYourSchedule(yourSchedule) {
    localStorage.setItem(yourScheduleKey, JSON.stringify(yourSchedule))
}

function updateSchedule(schedule) {
    localStorage.setItem(scheduleKey, JSON.stringify(schedule))
}

function createScheduleHtml(lesson) {
    const lessonEl = document.createElement('div')
    lessonEl.classList.add('lesson')
    lessonEl.setAttribute('data-id', lesson.id)

    const nameEl = document.createElement('h3')
    nameEl.classList.add('name')
    nameEl.textContent = `Направление: ${lesson.name}`
    lessonEl.appendChild(nameEl)

    const timeEl = document.createElement('p')
    timeEl.classList.add('time')
    timeEl.textContent = `Время: ${lesson.time}`
    lessonEl.appendChild(timeEl)

    const maxParticipantsEl = document.createElement('p')
    maxParticipantsEl.classList.add('maxParticipants')
    maxParticipantsEl.textContent = `Всего мест: ${lesson.maxParticipants}`
    lessonEl.appendChild(maxParticipantsEl)

    const currentParticipantsEl = document.createElement('p')
    currentParticipantsEl.classList.add('currentParticipants')
    currentParticipantsEl.textContent = `Записано: ${lesson.currentParticipants}`
    lessonEl.appendChild(currentParticipantsEl)

    const addBtnEl = document.createElement('button')
    addBtnEl.classList.add('addMe')
    addBtnEl.textContent = "Записаться"
    if (Number(lesson.currentParticipants) >= Number(lesson.maxParticipants)) {
        addBtnEl.disabled = true
    }

    const removeBtnEl = document.createElement('button')
    removeBtnEl.classList.add('removeMe')
    removeBtnEl.textContent = "Выписаться"
    if (Number(lesson.currentParticipants) === 0) {
        removeBtnEl.disabled = true
    }

    lessonEl.appendChild(addBtnEl)
    lessonEl.appendChild(removeBtnEl)
    scheduleEl.appendChild(lessonEl)
}



