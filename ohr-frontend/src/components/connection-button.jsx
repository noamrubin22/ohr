import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const ConnectionButton = () => {
  return (
    <div className="flex justify-center	">
      <WalletMultiButton className="wallet-button glowing-border" />
    </div>
  );
};

export default ConnectionButton;
