export interface FuelLog {
    noVale: string;
    oficina: string;
    tipoCombustible: string;
    valorVale: string;
    fecha: string;
    destino: string;
  }
  
  export interface Vehicle {
    marca: string;
    color: string;
    tipo: string;
    anio: string;
    placas: string;
    fuelLogs: FuelLog[];
  }
  
  export const vehicles: Vehicle[] = [
    {
      marca: "Toyota",
      color: "Rojo",
      tipo: "Sedán",
      anio: "2022",
      placas: "ABC-123",
      fuelLogs: [
        { noVale: "1001", oficina: "Recursos H", tipoCombustible: "Super", valorVale: "Q 300.00", fecha: "24-02-2025", destino: "Varios" },
        { noVale: "1002", oficina: "Recursos H", tipoCombustible: "Diesel", valorVale: "Q 200.00", fecha: "23-02-2025", destino: "Zona 1" },
        { noVale: "1003", oficina: "Recursos H", tipoCombustible: "Regular", valorVale: "Q 250.00", fecha: "22-02-2025", destino: "Zona 10" },
      ],
    },
    {
      marca: "Honda",
      color: "Negro",
      tipo: "SUV",
      anio: "2021",
      placas: "XYZ-789",
      fuelLogs: [
        { noVale: "2001", oficina: "Recursos H", tipoCombustible: "Super", valorVale: "Q 350.00", fecha: "24-02-2025", destino: "Zona 5" },
        { noVale: "2002", oficina: "Recursos H", tipoCombustible: "Diesel", valorVale: "Q 280.00", fecha: "23-02-2025", destino: "Zona 9" },
        { noVale: "2003", oficina: "Recursos H", tipoCombustible: "Regular", valorVale: "Q 300.00", fecha: "22-02-2025", destino: "Zona 3" },
        { noVale: "2004", oficina: "Recursos H", tipoCombustible: "Super", valorVale: "Q 400.00", fecha: "21-02-2025", destino: "Varios" },
        { noVale: "2005", oficina: "Recursos H", tipoCombustible: "Regular", valorVale: "Q 220.00", fecha: "20-02-2025", destino: "Zona 2" },
      ],
    },
    {
      marca: "Ford",
      color: "Azul",
      tipo: "Pick-up",
      anio: "2023",
      placas: "DEF-456",
      fuelLogs: [
        ...Array(20).fill({
          noVale: "300X",
          oficina: "Recursos H",
          tipoCombustible: "Super",
          valorVale: "Q 300.00",
          fecha: "24-02-2025",
          destino: "Varios",
        }).map((log, index) => ({ ...log, noVale: `300${index + 1}` })),
      ],
    },
    {
      marca: "Chevrolet",
      color: "Blanco",
      tipo: "Van",
      anio: "2020",
      placas: "GHI-567",
      fuelLogs: [
        ...Array(10).fill({
          noVale: "400X",
          oficina: "Recursos H",
          tipoCombustible: "Diesel",
          valorVale: "Q 280.00",
          fecha: "24-02-2025",
          destino: "Varios",
        }).map((log, index) => ({ ...log, noVale: `400${index + 1}` })),
      ],
    },
  ];  