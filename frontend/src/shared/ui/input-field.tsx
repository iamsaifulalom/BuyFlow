'use client';

import { FormControl, FormField, FormItem, FormMessage } from "./form";
import { UseFormReturn, FieldValues , Path } from "react-hook-form";
import { Input } from "./input";
import { Password } from "./password";
import { Checkbox } from "./checkbox";
import TermsAndPrivacyLabel from "@/features/auth/components/termsa-nd-privacy-label";

interface InputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute; // text, password, checkbox, etc.
}

export default function InputField<T extends FieldValues>({
  form,
  name,
  placeholder,
  type = "text",
}: InputFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {type === "password" ? (
              <Password {...field} placeholder={placeholder} className="py-4" />
            ) : type === "checkbox" ? (
              <div className="flex items-center gap-2">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                 <TermsAndPrivacyLabel/> {/* just wrap label in span if you want styling */}
              </div>
            ) : (
              <Input {...field} placeholder={placeholder} type={type} className="py-4" />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
