'use client'
import NotAuthorized from "@/components/shared/NotAuthorized";
import Voting from "@/components/shared/Voting";

import { useAccount } from "wagmi";

export default function Home() {

  const { isConnected } = useAccount();
  return (
    <>
      {isConnected ? (
        <Voting />
      ) : (
        <NotAuthorized />
      )}
    </>
  );
}
