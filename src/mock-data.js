export const FILTERS = [`Everthing`, `Future`, `Past`];

export const EVENTS_AMOUNT = {
  min: 3,
  max: 5
};

const TRIP_ICONS = {
  taxi: `🚕`,
  flight: `✈️`,
  drive: `🚗`,
  hotel: `🏨`,
};

export const EVENTS = [
  {
    icon: TRIP_ICONS[`taxi`],
    title: `Taxi to Airport`,
    schedule: {
      start: `10:00`,
      end: `12:30`
    },
    price: 20,
    offers: [
      {
        title: `Order UBER`,
        price: 20
      },
      {
        title: `Upgrade to business`,
        price: 20
      },
    ]
  },
  {
    icon: TRIP_ICONS[`flight`],
    title: `Flight to Geneva`,
    schedule: {
      start: `10:00`,
      end: `10:45`
    },
    price: 20,
    offers: [
      {
        title: `Upgrade to business`,
        price: 20
      },
      {
        title: `Select meal`,
        price: 20
      }
    ]
  },
  {
    icon: TRIP_ICONS[`drive`],
    title: `Drive to Chamonix`,
    schedule: {
      start: `10:00`,
      end: `11:00`
    },
    price: 20,
    offers: [
      {
        title: `Rent a car`,
        price: 200
      }
    ]
  },
  {
    icon: TRIP_ICONS[`hotel`],
    title: `Check into a hotel`,
    schedule: {
      start: `10:00`,
      end: `11:00`
    },
    price: 20,
    offers: [
      {
        title: `Add breakfast`,
        price: 20
      }
    ]
  }
];
