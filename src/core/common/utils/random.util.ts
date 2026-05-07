export type GenerateOptions = {
  length: number;
  useNumber?: boolean;
  useLetterLower?: boolean;
  useLetterUpper?: boolean;
  useSpecial?: boolean;
};

export async function generateRandomString(
  options: GenerateOptions,
): Promise<string> {
  const {
    length,
    useNumber = true,
    useLetterLower = true,
    useLetterUpper = true,
    useSpecial = false,
  } = options;
  const numbers = '0123456789';
  const letterLower = 'abcdefghijklmnopqrstuvwxyz';
  const letterUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const special = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  if (length <= 0) {
    throw new Error('Length must be greater than 0');
  }

  let characters = '';
  if (useNumber) {
    characters += numbers;
  }
  if (useLetterLower) {
    characters += letterLower;
  }
  if (useLetterUpper) {
    characters += letterUpper;
  }
  if (useSpecial) {
    characters += special;
  }
  if (characters.length === 0) {
    throw new Error('At least one character type must be selected');
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
