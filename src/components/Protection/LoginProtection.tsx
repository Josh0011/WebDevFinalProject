import { useSelector } from "react-redux";

export default function LoginProtection({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  if (currentUser) {
    return <>{children}</>;
  }
  return null;
}
