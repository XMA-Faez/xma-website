"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  countryCodes,
  defaultCountry,
  validatePhoneWithMessage,
  stripLeadingZero,
  type CountryCode,
} from "@/data/country-codes";

export interface PhoneInputProps {
  label?: string;
  error?: string;
  value?: string;
  defaultCountryIso?: string;
  onChange?: (
    fullNumber: string,
    isValid: boolean,
    validationError?: string
  ) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
  placeholder?: string;
}

export interface PhoneInputRef {
  focus: () => void;
  getValue: () => string;
  isValid: () => boolean;
}

export const PhoneInput = forwardRef<PhoneInputRef, PhoneInputProps>(
  (
    {
      label,
      error,
      value,
      defaultCountryIso = "AE",
      onChange,
      disabled,
      required,
      name,
      className,
      placeholder = "50 123 4567",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
      countryCodes.find((c) => c.iso === defaultCountryIso) || defaultCountry
    );
    const [phoneNumber, setPhoneNumber] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value) {
        const country = countryCodes.find((c) => value.startsWith(c.dialCode));
        if (country) {
          setSelectedCountry(country);
          setPhoneNumber(value.replace(country.dialCode, "").trim());
        } else {
          setPhoneNumber(value);
        }
      }
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getFullNumber = () => {
      const normalized = stripLeadingZero(phoneNumber);
      return normalized ? `${selectedCountry.dialCode}${normalized}` : "";
    };

    const checkIsValid = () => {
      if (!phoneNumber.trim()) return false;
      return validatePhoneWithMessage(phoneNumber, selectedCountry).isValid;
    };

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      getValue: getFullNumber,
      isValid: checkIsValid,
    }));

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const digitsOnly = input.replace(/\D/g, "");
      setPhoneNumber(digitsOnly);

      const normalized = stripLeadingZero(digitsOnly);
      const fullNumber = normalized
        ? `${selectedCountry.dialCode}${normalized}`
        : "";
      const validation = validatePhoneWithMessage(digitsOnly, selectedCountry);
      onChange?.(fullNumber, validation.isValid, validation.error);
    };

    const handleCountrySelect = (country: CountryCode) => {
      setSelectedCountry(country);
      setIsOpen(false);
      inputRef.current?.focus();

      const normalized = stripLeadingZero(phoneNumber);
      const fullNumber = normalized ? `${country.dialCode}${normalized}` : "";
      const validation = phoneNumber
        ? validatePhoneWithMessage(phoneNumber, country)
        : { isValid: false, error: "Phone number is required" };
      onChange?.(fullNumber, validation.isValid, validation.error);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <label
            htmlFor={name}
            className="text-sm font-medium text-muted-foreground"
          >
            {label}
            {required && <span className="text-error-600 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative" ref={dropdownRef}>
          <div className="flex">
            <button
              type="button"
              onClick={() => !disabled && setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className={cn(
                "flex items-center gap-1 px-3 h-9 border border-r-0 border-input bg-neutral-800/30 rounded-l-md rounded-r-none transition-colors",
                "hover:bg-neutral-700/30 disabled:opacity-50 disabled:cursor-not-allowed",
                error && "border-error-600"
              )}
            >
              <span className="text-base leading-none">
                {selectedCountry.flag}
              </span>
              <span className="text-sm font-medium text-foreground">
                {selectedCountry.dialCode}
              </span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 text-muted-foreground transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <Input
              ref={inputRef}
              type="tel"
              id={name}
              name={name}
              value={phoneNumber}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "!rounded-l-none flex-1",
                error && "border-error-600 focus-visible:ring-error-600"
              )}
            />
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-neutral-900 border border-input rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              {countryCodes.map((country) => (
                <button
                  key={country.iso}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-800 transition-colors text-left",
                    country.iso === selectedCountry.iso && "bg-neutral-800"
                  )}
                >
                  <span className="text-base">{country.flag}</span>
                  <span className="flex-1 text-sm text-foreground">
                    {country.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {country.dialCode}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {error && <span className="text-sm text-error-600">{error}</span>}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
