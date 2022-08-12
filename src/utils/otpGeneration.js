import { customAlphabet } from "nanoid/async";

async function generatedId() {
  const nanoid = customAlphabet("1234567890", 6);
  return await nanoid();
}

export default generatedId;
