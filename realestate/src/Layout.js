import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Building2, LogOut, Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/entities/User";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [needsPasscode, setNeedsPasscode] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      if (!currentUser.passcode) {
        setNeedsPasscode(true);
      }
    } catch (error) {
      // User not authenticated, redirect to login
      await User.loginWithRedirect(window.location.href);
    }
    setIsLoading(false);
  };

  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError("Please enter your passcode");
      return;
    }

    try {
      if (user.passcode && user.passcode !== passcode) {
        setError("Invalid passcode. Please try again.");
        return;
      }

      if (!user.passcode) {
        await User.updateMyUserData({ passcode, access_level: "premium" });
      }

      setNeedsPasscode(false);
      setError("");
    } catch (error) {
      setError("Authentication failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    await User.logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (needsPasscode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>

        <div className="relative z-10 w-full max-w-md">
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
            <CardHeader className="text-center pb-8 pt-12">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl p-2">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d80d08b76cbe09750cf182/31184185b_RIGEL1.png"
                  alt="Rigel Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800 mb-2">
                Rigel Premium Homes
              </CardTitle>
              <p className="text-slate-600 font-medium">Real Estate Projects</p>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
            </CardHeader>

            <CardContent className="px-12 pb-12">
              <form onSubmit={handlePasscodeSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Access Passcode
                  </label>
                  <Input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter your unique passcode"
                    className="h-12 text-center font-mono text-lg tracking-widest border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 text-sm font-medium text-center">
                      {error}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Access Projects
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200">
                  <p className="text-amber-800 text-xs text-center font-medium">
                    🏆 Exclusive access to premium Athens real estate projects
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <style>
        {`
          :root {
            --primary-navy: #1e293b;
            --primary-gold: #d4af37;
            --accent-blue: #3b82f6;
            --text-primary: #0f172a;
            --text-secondary: #64748b;
          }
        `}
      </style>

      {/* Premium Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link
              to={createPageUrl("Projects")}
              className="flex items-center space-x-3 group cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 p-1">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d80d08b76cbe09750cf182/31184185b_RIGEL1.png"
                  alt="Rigel Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                  Rigel Premium Homes
                </h1>
                <p className="text-sm text-slate-500 font-medium group-hover:text-blue-600 transition-colors duration-300">
                  Real Estate Projects
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to={createPageUrl("Projects")}
                className={`font-semibold transition-all duration-200 hover:scale-105 ${
                  location.pathname === createPageUrl("Projects")
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                All Projects
              </Link>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-full border border-amber-200">
                <Crown className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">
                  Premium Access
                </span>
              </div>
            </nav>

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-slate-600 hover:text-slate-800 hover:bg-slate-100 hover:scale-105 transition-all duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Premium Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d80d08b76cbe09750cf182/31184185b_RIGEL1.png"
                    alt="Rigel Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold">Rigel Premium Homes</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Exclusive real estate opportunities in Athens, Greece. Golden
                Visa eligible properties.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-2 text-slate-300">
                <p>📍 Athens, Greece</p>
                <p>📧 rigelhospitalitygr@gmail.com</p>
                <p>📞 +30 697 225 0118</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Golden Visa Program</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Eligible properties for Greece's Golden Visa program. Invest
                €250,000+ and gain European residency.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-slate-300">
                <Link
                  to={createPageUrl("Projects")}
                  className="hover:text-white"
                >
                  All Projects
                </Link>
                <br />
                <Link to={createPageUrl("Admin")} className="hover:text-white">
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>
              &copy; 2024 Rigel Premium Homes Real Estate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
