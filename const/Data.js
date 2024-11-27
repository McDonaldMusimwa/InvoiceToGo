const invoices = [
  // Paid Invoices
  {
    id: 1,
    invoicenumber: 1058,
    customer: "Acmo Co",
    status: "paid",
    elements: [
      {
        units: 2,
        product: "Benches",
        unitcost: 10,
      },
    ],
  },
  {
    id: 2,
    invoicenumber: 1059,
    customer: "Beta Ltd",
    status: "paid",
    elements: [
      {
        units: 5,
        product: "Chairs",
        unitcost: 15,
      },
      {
        units: 1,
        product: "Table",
        unitcost: 100,
      },
    ],
  },
  {
    id: 3,
    invoicenumber: 1060,
    customer: "Gamma Inc",
    status: "paid",
    elements: [
      {
        units: 10,
        product: "Desks",
        unitcost: 30,
      },
    ],
  },
  {
    id: 4,
    invoicenumber: 1061,
    customer: "Delta Co",
    status: "paid",
    elements: [
      {
        units: 3,
        product: "Bookshelves",
        unitcost: 25,
      },
      {
        units: 2,
        product: "Filing Cabinets",
        unitcost: 40,
      },
    ],
  },
  {
    id: 5,
    invoicenumber: 1062,
    customer: "Epsilon Ltd",
    status: "paid",
    elements: [
      {
        units: 4,
        product: "Lamps",
        unitcost: 20,
      },
    ],
  },
  // Unpaid Invoices
  {
    id: 6,
    invoicenumber: 1063,
    customer: "Zeta Co",
    status: "unpaid",
    elements: [
      {
        units: 6,
        product: "Sofas",
        unitcost: 200,
      },
    ],
  },
  {
    id: 7,
    invoicenumber: 1064,
    customer: "Eta Inc",
    status: "unpaid",
    elements: [
      {
        units: 8,
        product: "Office Chairs",
        unitcost: 50,
      },
      {
        units: 2,
        product: "Conference Table",
        unitcost: 300,
      },
    ],
  },
  {
    id: 8,
    invoicenumber: 1065,
    customer: "Theta Ltd",
    status: "unpaid",
    elements: [
      {
        units: 3,
        product: "Projectors",
        unitcost: 150,
      },
    ],
  },
  {
    id: 9,
    invoicenumber: 1066,
    customer: "Iota Co",
    status: "unpaid",
    elements: [
      {
        units: 7,
        product: "Whiteboards",
        unitcost: 75,
      },
    ],
  },
  {
    id: 10,
    invoicenumber: 1067,
    customer: "Kappa Inc",
    status: "unpaid",
    elements: [
      {
        units: 2,
        product: "Meeting Tables",
        unitcost: 250,
      },
      {
        units: 5,
        product: "Office Partitions",
        unitcost: 60,
      },
    ],
  },
];

export const clients = [
  {
    name: "Jonathan Maree",
    phone: "067 103 3055",
    email: "jonathan@gmail.com",
    id: 1,
  },
  {
    name: "Bait Dot",
    phone: "021 164  1035",
    email: "bait@gmail.com",
    id: 2,
  },
];

export const taxRate = 15;
export default invoices;
