export type VehicleType = 'car' | 'trailer' | 'truck' | 'bus' | 'motorcycle';

export type VehicleTypeData = {
  VehicleTypeId: number;
  VehicleTypeName: VehicleType;
};

export const vehicleTypes: VehicleTypeData[] = [
  {
    VehicleTypeName: 'motorcycle',
    VehicleTypeId: 1,
  },
  {
    VehicleTypeName: 'car',
    VehicleTypeId: 2,
  },
  {
    VehicleTypeName: 'truck',
    VehicleTypeId: 3,
  },
  {
    VehicleTypeName: 'bus',
    VehicleTypeId: 5,
  },
  {
    VehicleTypeName: 'trailer',
    VehicleTypeId: 6,
  },
];
