import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="border-b-4 border-accent-light-100">
      <div className="flex items-center justify-between w-5/6 mx-auto ">
        <h1 className=" h-10v font-bold text-3xl text-black flex items-center ">
          learnhub.
        </h1>
        {isAuthenticated && (
          <button
            className="bg-primary-dark p-2 rounded-md text-accent-light-50"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
