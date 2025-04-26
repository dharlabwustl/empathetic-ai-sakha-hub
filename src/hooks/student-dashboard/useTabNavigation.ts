
import { useNavigate } from "react-router-dom";

export function useTabNavigation() {
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    navigate(`/dashboard/student/${tab}`);
  };

  return { handleTabChange };
}
