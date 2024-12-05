const invoices = [
  // Paid Invoices
  {
    id: 1,
    invoicenumber: 1058,
    clientname: "Acmo Co",
    status: "paid",
    invoicedate:"",
    
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
    clientname: "Beta Ltd",
    status: "paid",
    invoicedate:"",
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
   clientname: "Gamma Inc",
    status: "paid",
    invoicedate:"",
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
   clientname: "Delta Co",
    status: "paid",
    invoicedate:"",
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
    clientname: "Epsilon Ltd",
    status: "paid",
    invoicedate:"",
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
    clientname: "Zeta Co",
    status: "unpaid",
    invoicedate:"",
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
   clientname: "Eta Inc",
    status: "unpaid",invoicedate:"",
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
   clientname: "Theta Ltd",
    status: "unpaid",
    invoicedate:"",
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
    clientname: "Iota Co",
    status: "unpaid",
    invoicedate:"",
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
    clientname: "Kappa Inc",
    status: "unpaid",
    invoicedate:"",
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
    comments:"Works at Singular systems hire me for washing machine"
  },
  {
    name: "Bait Dot",
    phone: "021 164  1035",
    email: "bait@gmail.com",
    id: 2,
    comments:"Works at forver living hired me for fixing microwave"
  },
];

export const taxRate = 15;
export default invoices;
