
let tipo = 'proveedores'

const lista = [
  {
    id: '00',
    fecha: "2024-01-15",
    proveedor: "María González",
    estado: "enviado"
  },
  {
    id: '01',
    fecha: "2024-01-16",
    proveedor: "Carlos Rodríguez",
    estado: "pendiente"
  },
  {
    id: '02',
    fecha: "2024-01-17",
    proveedor: "Ana López",
    estado: "cancelado"
  },
  {
    id: '03',
    fecha: "2024-01-18",
    proveedor: "Luis Martínez",
    estado: "enviado"
  },
  {
    id: '04',
    fecha: "2024-01-19",
    proveedor: "Sofia Herrera",
    estado: "pendiente"
  },
  {
    id: '05',
    fecha: "2024-01-20",
    proveedor: "Diego Fernández",
    estado: "enviado"
  },
  {
    id: '06',
    fecha: "2024-01-21",
    proveedor: "Lucía Morales",
    estado: "cancelado"
  },
  {
    id: '07',
    fecha: "2024-01-22",
    proveedor: "Roberto Silva",
    estado: "pendiente"
  },
  {
    id: '08',
    fecha: "2024-01-23",
    proveedor: "Carmen Jiménez",
    estado: "enviado"
  },
  {
    id: '09',
    fecha: "2024-01-24",
    proveedor: "Fernando Castro",
    estado: "pendiente"
  },
  {
    id: '10',
    fecha: "2024-01-25",
    proveedor: "Valeria Ruiz",
    estado: "enviado"
  },
  {
    id: '11',
    fecha: "2024-01-26",
    proveedor: "Alejandro Vargas",
    estado: "cancelado"
  },
  {
    id: '12',
    fecha: "2024-01-27",
    proveedor: "Isabella Torres",
    estado: "enviado"
  },
  {
    id: '13',
    fecha: "2024-01-28",
    proveedor: "Mateo Ramírez",
    estado: "pendiente"
  },
  {
    id: '14',
    fecha: "2024-01-29",
    proveedor: "Camila Mendoza",
    estado: "enviado"
  }
];

const proveedores = [
  {
    id: '00',
    nombre: "María González",
    telefono: "011-4567-8901"
  },
  {
    id: '01',
    nombre: "Carlos Rodríguez",
    telefono: "011-4567-8902"
  },
  {
    id: '02',
    nombre: "Ana López",
    telefono: "011-4567-8903"
  },
  {
    id: '03',
    nombre: "Luis Martínez",
    telefono: "011-4567-8904"
  },
  {
    id: '04',
    nombre: "Sofia Herrera",
    telefono: "011-4567-8905"
  },
  {
    id: '05',
    nombre: "Diego Fernández",
    telefono: "011-4567-8906"
  },
  {
    id: '06',
    nombre: "Lucía Morales",
    telefono: "011-4567-8907"
  },
  {
    id: '07',
    nombre: "Roberto Silva",
    telefono: "011-4567-8908"
  },
  {
    id: '08',
    nombre: "Carmen Jiménez",
    telefono: "011-4567-8909"
  },
  {
    id: '09',
    nombre: "Fernando Castro",
    telefono: "011-4567-8910"
  },
  {
    id: '10',
    nombre: "Valeria Ruiz",
    telefono: "011-4567-8911"
  },
  {
    id: '11',
    nombre: "Alejandro Vargas",
    telefono: "011-4567-8912"
  },
  {
    id: '12',
    nombre: "Isabella Torres",
    telefono: "011-4567-8913"
  },
  {
    id: '13',
    nombre: "Mateo Ramírez",
    telefono: "011-4567-8914"
  },
  {
    id: '14',
    nombre: "Camila Mendoza",
    telefono: "011-4567-8915"
  }
];

const rubros = [
  { id: '01', rubro: 'Verduras de hoja' },
  { id: '02', rubro: 'Verduras de fruto' },
  { id: '03', rubro: 'Verduras de raíz' },
  { id: '04', rubro: 'Frutas cítricas' },
  { id: '05', rubro: 'Frutas de carozo' },
  { id: '06', rubro: 'Frutas tropicales' },
  { id: '07', rubro: 'Tubérculos' },
  { id: '08', rubro: 'Legumbres' },
  { id: '09', rubro: 'Frutas del bosque' },
  { id: '10', rubro: 'Hierbas aromáticas' }
];

const productos = [
  { id: '001', nombre: 'Lechuga', rubro: '01' },
  { id: '002', nombre: 'Espinaca', rubro: '01' },
  { id: '003', nombre: 'Acelga', rubro: '01' },
  { id: '004', nombre: 'Rúcula', rubro: '01' },
  { id: '005', nombre: 'Tomate', rubro: '02' },
  { id: '006', nombre: 'Pimiento rojo', rubro: '02' },
  { id: '007', nombre: 'Pimiento verde', rubro: '02' },
  { id: '008', nombre: 'Berenjena', rubro: '02' },
  { id: '009', nombre: 'Calabacín', rubro: '02' },
  { id: '010', nombre: 'Zanahoria', rubro: '03' },
  { id: '011', nombre: 'Remolacha', rubro: '03' },
  { id: '012', nombre: 'Rabanito', rubro: '03' },
  { id: '013', nombre: 'Nabo', rubro: '03' },
  { id: '014', nombre: 'Naranja', rubro: '04' },
  { id: '015', nombre: 'Limón', rubro: '04' },
  { id: '016', nombre: 'Mandarina', rubro: '04' },
  { id: '017', nombre: 'Pomelo', rubro: '04' },
  { id: '018', nombre: 'Durazno', rubro: '05' },
  { id: '019', nombre: 'Ciruela', rubro: '05' },
  { id: '020', nombre: 'Damasco', rubro: '05' },
  { id: '021', nombre: 'Banana', rubro: '06' },
  { id: '022', nombre: 'Mango', rubro: '06' },
  { id: '023', nombre: 'Ananá', rubro: '06' },
  { id: '024', nombre: 'Palta', rubro: '06' },
  { id: '025', nombre: 'Papa', rubro: '07' },
  { id: '026', nombre: 'Batata', rubro: '07' },
  { id: '027', nombre: 'Mandioca', rubro: '07' },
  { id: '028', nombre: 'Choclo', rubro: '08' },
  { id: '029', nombre: 'Arvejas', rubro: '08' },
  { id: '030', nombre: 'Habas', rubro: '08' },
  { id: '031', nombre: 'Frutillas', rubro: '09' },
  { id: '032', nombre: 'Arándanos', rubro: '09' },
  { id: '033', nombre: 'Frambuesas', rubro: '09' },
  { id: '034', nombre: 'Perejil', rubro: '10' },
  { id: '035', nombre: 'Cilantro', rubro: '10' },
  { id: '036', nombre: 'Albahaca', rubro: '10' },
  { id: '037', nombre: 'Orégano', rubro: '10' },
  { id: '038', nombre: 'Menta', rubro: '10' }
];