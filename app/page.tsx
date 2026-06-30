import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  FileText,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              Visit Management
            </h1>

            <p className="text-sm text-slate-500">
              Plantation Inspection System
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium transition hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Plantation Monitoring Platform
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900">
              Digital Inspection &
              <br />
              Visit Management
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Kelola seluruh aktivitas kunjungan lapangan, dokumentasi, GPS
              tracking, attachment, dan laporan inspeksi dalam satu sistem yang
              modern.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Open Dashboard
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/login"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl">
            <div className="grid gap-6 sm:grid-cols-2">
              <FeatureCard
                icon={<MapPinned className="text-blue-600" size={28} />}
                title="GPS Validation"
                description="Validasi lokasi kunjungan dengan area blok."
              />

              <FeatureCard
                icon={<FileText className="text-green-600" size={28} />}
                title="Documentation"
                description="Kelola foto dan attachment setiap visit."
              />

              <FeatureCard
                icon={<BarChart3 className="text-orange-500" size={28} />}
                title="Analytics"
                description="Laporan inspeksi secara realtime."
              />

              <FeatureCard
                icon={<ShieldCheck className="text-purple-600" size={28} />}
                title="Secure Data"
                description="Semua data tersimpan secara aman."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Visit Management System
          </p>

          <p className="text-sm text-slate-400">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}
