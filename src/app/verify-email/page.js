import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="card w-full max-w-lg bg-white shadow-xl p-8 lg:p-10 border border-gray-100 rounded-4xl text-center">
        {/* Animated Mail Icon */}
        <div className="mx-auto w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-nazrul-terracotta animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>

        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Check Your Inbox
        </h2>

        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          We&apos;ve sent a secure confirmation link to your email address. Please
          click the link inside to verify your account and complete your
          registration to the archive.
        </p>

        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-8">
          <p className="text-xs text-gray-500 font-medium">
            Didn&apos;t receive an email? Check your spam folder or ensure you
            entered the correct email address.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-block w-full py-4 bg-nazrul-terracotta text-white rounded-2xl font-black uppercase tracking-widest hover:bg-nazrul-crimson transition-colors duration-300 shadow-xl shadow-nazrul-terracotta/10 active:scale-[0.99]"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}
