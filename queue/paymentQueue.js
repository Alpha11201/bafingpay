let queue = [];

export const addToQueue = async (provider, paymentData) => {
  queue.push({ provider, paymentData, attempts: 0, timestamp: Date.now() });
  console.log(`💡 Transaction ajoutée à la queue : ${provider}`, paymentData);
};

export const getQueue = () => queue;
