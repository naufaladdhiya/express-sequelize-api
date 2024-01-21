import bcrypt from "bcrypt";

const PasswordHasing = async (password: string): Promise<String> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

const PasswordCompare = async (
  password: string,
  passwordHash: string
): Promise<Boolean> => {
  const matched = await bcrypt.compare(password, passwordHash);

  return matched;
};

export default { PasswordHasing, PasswordCompare };
