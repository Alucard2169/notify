import { UserContextProps, userContext } from "@/context/UserContext";
import pfp from "@/public/1.jpg";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useContext } from "react";


interface NavbarProps {
  stateProps: {
    formState: boolean;
    setFormState: Dispatch<SetStateAction<boolean>>;
  };
}

const Navbar: FC<NavbarProps> = ({ stateProps }) => {
  const {  setFormState } = stateProps;
  const userContextValue = useContext(userContext) as UserContextProps;
  const { data, setData } = userContextValue;
  const router = useRouter();

  const handleLogout = async () => {
    setData(null);
    const response = await fetch("/api/logout");
    if (router.pathname.startsWith(`/user/`)) router.push("/");
  };

  return (
    <nav className="fixed z-50 w-screen py-2 px-2 md:px-8 flex justify-between items-center bg-PRIMARY">
      <ul className="flex gap-4 items-center">
        <li className="font-bold text-sm py-2 px-4 rounded-md bg-MAIN text-NEUTRAL hover:bg-PRIMARY hover:text-NEUTRAL transition-all duration-200">
          <Link href="/">notify</Link>
        </li>
      </ul>

      <ul className="flex gap-8 items-center">
        {!data && (
          <li
            className="px-4 py-2 text-sm bg-MAIN text-NEUTRAL font-semibold rounded-lg cursor-pointer hover:bg-PRIMARY transition-all duration-200"
            onClick={() => setFormState(true)}
          >
            SignUp
          </li>
        )}
        {data && (
          <li
            className="px-2 py-1 font-semibold rounded-lg cursor-pointer"
            onClick={handleLogout}
          >
            <Button bg="#121212" color="white">
              Logout
            </Button>
          </li>
        )}
        {data && (
          <Link href={`/user/${data?.user_id}`}>
            <Image
              alt="userPfp"
              className="rounded-full w-10 h-10 object-cover"
              width={50}
              height={70}
              src={pfp}
            />
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
