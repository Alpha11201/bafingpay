import { Connection, clusterApiUrl, Keypair, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Génération d’un wallet pour un utilisateur
export const createSolanaWallet = () => {
  const keypair = Keypair.generate();
  return {
    publicKey: keypair.publicKey.toBase58(),
    secretKey: Buffer.from(keypair.secretKey).toString("hex"),
  };
};

// Exemple : envoyer SOL
export const sendSolanaPayment = async ({ fromSecretKey, toPublicKey, amount }) => {
  try {
    const fromKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(fromSecretKey)));
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: new PublicKey(toPublicKey),
        lamports: amount * 1e9 // conversion SOL → lamports
      })
    );

    const signature = await connection.sendTransaction(transaction, [fromKeypair]);
    await connection.confirmTransaction(signature);
    return { success: true, signature };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
