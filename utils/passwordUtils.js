import bcrypt from 'bcryptjs';

async function generatePassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.error('Error generating password hash - passwordUtils.js:3', error);
    throw error;
  }
}

async function validatePassword(password, hash) {
  try {
    const isValid = await bcrypt.compare(password, hash);

    return isValid;
  } catch (error) {
    console.error(
      'Error validating password hash - passwordUtils.js:15',
      error
    );
    throw error;
  }
}

export { generatePassword, validatePassword };
