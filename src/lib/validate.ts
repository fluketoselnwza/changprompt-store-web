export const validatePassword = (password: string) => {
  // ข้อกำหนด 1: ความยาวอย่างน้อย 8 ตัวอักษร
  const lengthCheck = password.length >= 8;
  // ข้อกำหนด 2: มีตัวอักษรอังกฤษอย่างน้อย 1 ตัว
  const hasLetter = /[a-zA-Z]/.test(password);
  // ข้อกำหนด 3: มีตัวเลขอย่างน้อย 1 ตัว
  const hasNumber = /\d/.test(password);
  // ข้อกำหนด 4: มีอักขระพิเศษอย่างน้อย 1 ตัว
  const hasSpecialChar = /[!@#$%^&*()+=.,?]/.test(password);

  let codeError = "0";

  if (!lengthCheck) {
    codeError = "1";
  } else if (!hasLetter) {
    codeError = "2";
  } else if (!hasNumber) {
    codeError = "3";
  } else if (!hasSpecialChar) {
    codeError = "4";
  } else {
    codeError = "0";
  }

  return codeError;
};
