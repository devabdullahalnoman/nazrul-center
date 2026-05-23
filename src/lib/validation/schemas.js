import { z } from "zod";

// Strict Runtime Environment Variable Validation Guard (Issue 6, 22)
const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  SSLCOMMERZ_STORE_ID: z.string().min(3),
  SSLCOMMERZ_STORE_PASSWORD: z.string().min(3),
});

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export function validateEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error(
      "❌ CRITICAL COMPILATION ERROR: Insecure or Missing Environment Configs:",
      result.error.format(),
    );
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Application startup aborted due to critical infrastructure env misconfigurations.",
      );
    }
    return false;
  }
  return result.data;
}

// Immutable Checkout Body Input Validation Schema (Issue 8, 23)
export const CheckoutInputSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().uuid("Invalid catalog sequence lookup target"),
        name: z.string().min(1, "Product tracking title required"),
        quantity: z
          .number()
          .int()
          .positive("Quantities must be positive integers"),
        price: z
          .number()
          .positive("Financial baseline markers cannot be fallback references"),
      }),
    )
    .min(1, "Cart array structure must contain at least one valid line item"),
  customer_name: z.string().min(2).max(100).default("Nazrul Archive Customer"),
  customer_email: z.string().email("Invalid security routing email reference"),
  phone: z.string().min(11, "Valid contact telephone entry required").max(15),
  address: z
    .string()
    .min(5, "Comprehensive delivery physical mapping target required"),
});
