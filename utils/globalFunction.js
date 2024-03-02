import { v4 as uuidv4 } from 'uuid';

// Function to generate a 16-character ID
export const generateId = () => {
  return uuidv4().replace(/-/g, '').substring(0, 16);
};

