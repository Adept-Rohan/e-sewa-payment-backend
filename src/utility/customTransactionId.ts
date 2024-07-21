export const createCustomTransactionUUID = () => {
  const now = Date.now();

  const timestamp = now.toString(16);

  const randomPart = Math.random().toString(16).slice(2, 8);

  return `${timestamp}-${randomPart}`;
};
