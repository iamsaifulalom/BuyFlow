import { Path } from "react-hook-form";
import { SignInBody } from "../schema/auth.schema";

interface SignInItem {
    name: Path<SignInBody>;
    type: React.HTMLInputTypeAttribute;
    placeholder?: string;
}
export const SignIn: SignInItem[] = [
    { name: "email", type: "text", placeholder: "example@user.com"},
    { name: "password", type: "password", placeholder: "Password" },
];
