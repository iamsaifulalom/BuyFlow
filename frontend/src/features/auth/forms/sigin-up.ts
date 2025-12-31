import { Path } from "react-hook-form";
import { SignUpBody } from "../schema/auth.schema";

interface SignUpItem {
    name: Path<SignUpBody>;
    type: React.HTMLInputTypeAttribute;
    placeholder?: string;
}
export const SignUp: SignUpItem[] = [
    { name: "name", type: "text", placeholder: "Jon Doe"},
    { name: "email", type: "text", placeholder: "example@user.com"},
    { name: "password", type: "password", placeholder: "Password" },
    { name: "termsAccepted", type: "checkbox"}
];
