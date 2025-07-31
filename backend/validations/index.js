const validateVehicle = (data) => {
  const errors = {};
  
  if (!data.name) errors.name = 'Name is required';
  if (!data.type) errors.type = 'Type is required';
  if (!data.pricePerDay || data.pricePerDay <= 0) errors.pricePerDay = 'Valid price per day is required';
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateBooking = (data) => {
  const errors = {};

  if (!data.vehicle) errors.vehicle = 'Vehicle is required';
  if (!data.startDate) errors.startDate = 'Start date is required';
  if (!data.endDate) errors.endDate = 'End date is required';

  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (end <= start) {
      errors.endDate = 'End date must be after start date';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateUser = (data) => {
  const errors = {};
  
  if (!data.name) errors.name = 'Name is required';
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = {
  validateVehicle,
  validateBooking,
  validateUser
};
