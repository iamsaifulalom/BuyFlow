"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

export const title = "Password with Toggle";

export function Password({ ...props }: React.ComponentProps<"input">) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                className="bg-background"
                id="password-toggle"
                type={showPassword ? "text" : "password"}
            />
            <Button
                className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                size="icon"
                type="button"
                variant="ghost"
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                )}
            </Button>
        </div>
    );
};