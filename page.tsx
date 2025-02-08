"use client";

import { TonConnectUI, useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("Wallet connected successfully");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully");
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI?.connected && tonConnectUI?.account?.address) {
        handleWalletConnection(tonConnectUI.account.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet: any) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonWalletAddress) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-grey-200 text-grey-700 font-bold py-2 px-4 rounded-lg">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">TON connect demo</h1>
      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
          <button
            onClick={handleWalletAction}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect TON wallet
        </button>
      )}
    </main>
  );
}
