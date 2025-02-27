export interface FuelData {
  id: number;
  piloto: string;
  placas: string;
  kilometros: number;
  monto: number;
  cantidadGalones: number;
  fecha: string;
  destino: string;
  proveedor: string;
  tipoCombustible: string;
  estado: 'Aprobado' | 'Rechazado' | 'Pendiente';
}

export const mockFuelData: FuelData[] = [
  {
    id: 1,
    piloto: "Jane Cooper",
    placas: "ABC123",
    kilometros: 12345,
    monto: 450.00,
    cantidadGalones: 12,
    fecha: "2024-03-15",
    destino: "Zona 1",
    proveedor: "Shell",
    tipoCombustible: "Super",
    estado: "Aprobado"
  },
  {
    id: 2,
    piloto: "Floyd Miles",
    placas: "XYZ789",
    kilometros: 23456,
    monto: 320.50,
    cantidadGalones: 10,
    fecha: "2024-03-14",
    destino: "Zona 2",
    proveedor: "Texaco",
    tipoCombustible: "Diesel",
    estado: "Pendiente"
  },
  {
    id: 3,
    piloto: "Ronald Richards",
    placas: "DEF456",
    kilometros: 34567,
    monto: 280.75,
    cantidadGalones: 9,
    fecha: "2024-03-13",
    destino: "Zona 3",
    proveedor: "Esso",
    tipoCombustible: "Regular",
    estado: "Pendiente"
  },
  {
    id: 4,
    piloto: "Marvin McKinney",
    placas: "GHI789",
    kilometros: 45678,
    monto: 510.00,
    cantidadGalones: 15,
    fecha: "2024-03-12",
    destino: "Zona 4",
    proveedor: "Shell",
    tipoCombustible: "Super",
    estado: "Aprobado"
  },
  {
    id: 5,
    piloto: "Jacob Jones",
    placas: "JKL012",
    kilometros: 56789,
    monto: 230.25,
    cantidadGalones: 7,
    fecha: "2024-03-11",
    destino: "Zona 5",
    proveedor: "Texaco",
    tipoCombustible: "Diesel",
    estado: "Rechazado"
  },
  {
    id: 6,
    piloto: "Kathryn Murphy",
    placas: "MNO345",
    kilometros: 67890,
    monto: 490.80,
    cantidadGalones: 14,
    fecha: "2024-03-10",
    destino: "Zona 6",
    proveedor: "Esso",
    tipoCombustible: "Regular",
    estado: "Aprobado"
  },
  {
    id: 7,
    piloto: "Kristin Watson",
    placas: "PQR678",
    kilometros: 78901,
    monto: 375.00,
    cantidadGalones: 11,
    fecha: "2024-03-09",
    destino: "Zona 7",
    proveedor: "Shell",
    tipoCombustible: "Super",
    estado: "Rechazado"
  },
  {
    id: 8,
    piloto: "Jerome Bell",
    placas: "STU901",
    kilometros: 89012,
    monto: 420.30,
    cantidadGalones: 13,
    fecha: "2024-03-08",
    destino: "Zona 8",
    proveedor: "Texaco",
    tipoCombustible: "Diesel",
    estado: "Pendiente"
  }
];
