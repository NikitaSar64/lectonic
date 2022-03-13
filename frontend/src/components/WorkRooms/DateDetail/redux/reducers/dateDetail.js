const initialState = [
  {
    date: new Date(2022, 2, 25),
    events: [
      {
        status: true,
        theme: 'Цитратный метод переливания крови в дореволюционной России',
        lecturer: 'Шамов Владимир Николаевич',
        listener: 'Сыктывкарская региональная станция переливания крови',
        address:
          'Сыктывкар, Республика Коми, Октябрьский пр., 59а, республиканская станция переливания крови',
        timeStart: '12:00',
        timeEnd: '13:30',
      },
      {
        status: false,
        theme: 'Практика применения лечебного метода переливания крови',
        lecturer: 'Вялков Анатолий Иванович',
        listener:
          'Первый Санкт-Петербургский государственный медицинский университет им. акад. И.П. Павлова',
        address:
          'Санкт-Петербург, ул. Льва Толстого, 6-8, ПСПбГМУ им. акад. И. И. Павлова',
        timeStart: '12:00',
        timeEnd: '13:30',
      },
      {
        status: false,
        theme: 'Практика применения лечебного метода переливания крови',
        lecturer: 'Вялков Анатолий Иванович',
        listener:
          'Первый Санкт-Петербургский государственный медицинский университет им. акад. И.П. Павлова',
        address:
          'Санкт-Петербург, ул. Льва Толстого, 6-8, ПСПбГМУ им. акад. И. И. Павлова',
        timeStart: '12:00',
        timeEnd: '13:30',
      },
    ],
  },
  {
    date: new Date(2022, 2, 15),
    events: [
      {
        status: false,
        theme: 'Практика применения лечебного метода переливания крови',
        lecturer: 'Вялков Анатолий Иванович',
        listener:
          'Первый Санкт-Петербургский государственный медицинский университет им. акад. И.П. Павлова',
        address:
          'Санкт-Петербург, ул. Льва Толстого, 6-8, ПСПбГМУ им. акад. И. И. Павлова',
        timeStart: '12:00',
        timeEnd: '13:30',
      },
      {
        status: false,
        theme: 'Практика применения лечебного метода переливания крови',
        lecturer: 'Вялков Анатолий Иванович',
        listener:
          'Первый Санкт-Петербургский государственный медицинский университет им. акад. И.П. Павлова',
        address:
          'Санкт-Петербург, ул. Льва Толстого, 6-8, ПСПбГМУ им. акад. И. И. Павлова',
        timeStart: '12:00',
        timeEnd: '13:30',
      },
    ],
  },
  {
    date: new Date(2022, 2, 9),
    events: [
      {
        status: true,
        theme: 'Цитратный метод переливания крови в дореволюционной России',
        lecturer: 'Шамов Владимир Николаевич',
        listener: 'Сыктывкарская региональная станция переливания крови',
        address:
          'Сыктывкар, Республика Коми, Октябрьский пр., 59а, республиканская станция переливания крови',
        timeStart: '12:00',
        timeEnd: '13:30',
      },
      {
        status: false,
        theme: 'Практика применения лечебного метода переливания крови',
        lecturer: 'Вялков Анатолий Иванович',
        listener:
          'Первый Санкт-Петербургский государственный медицинский университет им. акад. И.П. Павлова',
        address:
          'Санкт-Петербург, ул. Льва Толстого, 6-8, ПСПбГМУ им. акад. И. И. Павлова',
        timeStart: '12:00',
        timeEnd: '13:30',
      },
    ],
  },
]

export default function dateDetail(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_EVENTS":
      let newEvents = action.payload
      for (let date of newEvents) {
        date.date = new Date(date.date)
      }
      console.log(newEvents)
      return newEvents
    default:
      return state
  }
}
