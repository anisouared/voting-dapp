import { createPublicClient, http } from "viem";
import { hardhat, sepolia } from "viem/chains";

export const publicClient = createPublicClient({
    //chain: sepolia, // hardhat : if using local blockchain
    chain: hardhat, // hardhat : if using local blockchain
    //transport: http('https://sepolia.infura.io/v3/be2a060702b04189bd889de51ec14216'),
    transport: http(),
})