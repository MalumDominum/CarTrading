export const getVehicleTypes = () => {
  return [
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
};

export const getMakesForVehicleType = (
  type: 'car' | 'trailer' | 'truck' | 'bus' | 'motorcycle',
) => {
  return `${process.env.VEHICLES_API_URL}/vehicles/GetMakesForVehicleType/${type}?format=json`;
};

export const getModelsForMakeIdVehicleType = (
  id: number,
  type: 'car' | 'trailer' | 'truck' | 'bus' | 'motorcycle',
) => {
  return `${process.env.VEHICLES_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${id}/vehicletype/${type}?format=json`;
};
