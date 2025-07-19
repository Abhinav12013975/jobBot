const axios = require('axios')
const dotenv = require('dotenv')

dotenv.config()
const KEY = process.env.KEY
function passwordValidation(password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    return passwordRegex.test(password);
  }
  
  // Email format validation (optional)
const emailVerification = async (email) =>{
  const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${KEY}&email=${email}`)
  const data = response.data;

  const isValid = (
    data.is_valid_format.value === true &&
    data.is_disposable_email.value === false &&
    data.is_mx_found.value === true &&
    data.is_smtp_valid.value === true &&
    data.deliverability === "DELIVERABLE" &&
    data.quality_score >= 0.75
  );

  return isValid;
}

  
  module.exports = {
    emailVerification,
    passwordValidation
  };
  