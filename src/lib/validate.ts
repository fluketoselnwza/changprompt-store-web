export const validatePassword = (password: string) => {
  // ข้อกำหนด 1: ความยาวอย่างน้อย 8 ตัวอักษร
  const lengthCheck = password.length >= 8;
  // ข้อกำหนด 2: มีตัวอักษรอังกฤษอย่างน้อย 1 ตัว
  const hasLetter = /[a-zA-Z]/.test(password);
  // ข้อกำหนด 3: มีตัวเลขอย่างน้อย 1 ตัว
  const hasNumber = /\d/.test(password);
  // ข้อกำหนด 4: มีอักขระพิเศษอย่างน้อย 1 ตัว
  const hasSpecialChar = /[!@#$%^&*()+=.,?]/.test(password);

  if (!lengthCheck) return "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร";
  if (!hasLetter) return "รหัสผ่านต้องมีตัวอักษรอังกฤษอย่างน้อย 1 ตัว";
  if (!hasNumber) return "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว";
  if (!hasSpecialChar)
    return "รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว !@#$%^&*()+=.,?";

  return "";
};
