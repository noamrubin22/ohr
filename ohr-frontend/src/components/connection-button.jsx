import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const ConnectionButton = () => {
  const wallet = useWallet();
  return (
    <div className="flex justify-center	">
      <WalletMultiButton className="wallet-button glowing-border" />
    </div>
  );
};

export default ConnectionButton;
