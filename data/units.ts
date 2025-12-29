export type UnitCategory = 'length' | 'mass' | 'temperature' | 'data' | 'time' | 'speed' | 'base';

export interface UnitDefinition {
  id: string;
  factor: number; // Factor to convert TO base unit. (e.g. km to m = 1000)
  base?: boolean; // Is this the base unit?
  radix?: number; // For Base conversions (2, 8, 10, 16)
}

// Temperature is special, so we handle it separately in logic
export const TEMPERATURE_UNITS = ['C', 'F', 'K'];

export const UNIT_DATA: Record<UnitCategory, UnitDefinition[]> = {
  length: [
    { id: 'm', factor: 1, base: true },
    { id: 'km', factor: 1000 },
    { id: 'cm', factor: 0.01 },
    { id: 'mm', factor: 0.001 },
    { id: 'mile', factor: 1609.344 },
    { id: 'yard', factor: 0.9144 },
    { id: 'foot', factor: 0.3048 },
    { id: 'inch', factor: 0.0254 },
  ],
  mass: [
    { id: 'kg', factor: 1, base: true },
    { id: 'g', factor: 0.001 },
    { id: 'mg', factor: 0.000001 },
    { id: 'ton', factor: 1000 },
    { id: 'lb', factor: 0.453592 },
    { id: 'oz', factor: 0.0283495 },
  ],
  data: [
    { id: 'bit', factor: 1 },
    { id: 'byte', factor: 8 },
    { id: 'kb', factor: 8 * 1024 },
    { id: 'mb', factor: 8 * 1024 * 1024 },
    { id: 'gb', factor: 8 * 1024 * 1024 * 1024 },
    { id: 'tb', factor: 8 * 1024 * 1024 * 1024 * 1024 },
  ],
  time: [
    { id: 'sec', factor: 1, base: true },
    { id: 'min', factor: 60 },
    { id: 'hour', factor: 3600 },
    { id: 'day', factor: 86400 },
    { id: 'week', factor: 604800 },
    { id: 'year', factor: 31536000 },
  ],
  speed: [
    { id: 'mps', factor: 1, base: true }, // Meters per second
    { id: 'kph', factor: 0.277778 }, // km/h to m/s
    { id: 'mph', factor: 0.44704 },  // mph to m/s
    { id: 'knot', factor: 0.514444 }, // knot to m/s
    { id: 'fps', factor: 0.3048 },    // ft/s to m/s
  ],
  base: [
    { id: 'dec', factor: 0, radix: 10 },
    { id: 'bin', factor: 0, radix: 2 },
    { id: 'oct', factor: 0, radix: 8 },
    { id: 'hex', factor: 0, radix: 16 },
  ],
  // Temp is handled by ID only here
  temperature: [
      { id: 'C', factor: 0 },
      { id: 'F', factor: 0 },
      { id: 'K', factor: 0 },
  ]
};

export const convertUnit = (value: string | number, from: string, to: string, category: UnitCategory): string => {
  if (from === to) return String(value);

  // --- 1. BASE Conversion Logic (Numeral Systems) ---
  if (category === 'base') {
     const fromUnit = UNIT_DATA['base'].find(u => u.id === from);
     const toUnit = UNIT_DATA['base'].find(u => u.id === to);
     
     if (!fromUnit || !toUnit || !fromUnit.radix || !toUnit.radix) return '';
     
     // Parse string to integer using FROM radix
     try {
       const valStr = String(value).trim();
       if (!valStr) return '';
       const integerVal = parseInt(valStr, fromUnit.radix);
       
       if (isNaN(integerVal)) return 'NaN';
       
       // Convert integer to string using TO radix
       return integerVal.toString(toUnit.radix).toUpperCase();
     } catch (e) {
       return 'Error';
     }
  }

  // --- 2. Numeric Only Logic Below ---
  // For other categories, we expect a valid number.
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '';

  // --- 3. Temperature Logic ---
  if (category === 'temperature') {
      let celsius = numValue;
      // Convert to Celsius first
      if (from === 'F') celsius = (numValue - 32) * (5/9);
      if (from === 'K') celsius = numValue - 273.15;
      
      // Convert from Celsius to Target
      if (to === 'C') return celsius.toString();
      if (to === 'F') return ((celsius * 9/5) + 32).toString();
      if (to === 'K') return (celsius + 273.15).toString();
      return numValue.toString();
  }

  // --- 4. Standard Linear Conversion ---
  const units = UNIT_DATA[category];
  const fromUnit = units.find(u => u.id === from);
  const toUnit = units.find(u => u.id === to);

  if (!fromUnit || !toUnit) return numValue.toString();

  // Formula: value * fromFactor / toFactor
  const result = (numValue * fromUnit.factor) / toUnit.factor;
  return result.toString();
};