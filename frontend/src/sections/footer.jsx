import React from 'react';
import { Heart, Mail, Facebook, Twitter, Instagram, Shield, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-transparent border-t border-white/20">
      <div className="w-full px-6 py-8">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                ALUMA
              </h3>
              <p className="text-xs text-white/70">Your wellness companion</p>
            </div>
          </div>


          {/* Social Links */}
          <div className="flex items-center space-x-3">
            <a href="#" className="p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white/70 hover:text-white hover:bg-white/30 transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white/70 hover:text-white hover:bg-white/30 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white/70 hover:text-white hover:bg-white/30 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-sm text-white/70">
          <div className="flex items-center space-x-4">
            <span>© 2025 MindfulSpace</span>
            <a href="/privacy" className="flex items-center space-x-1 hover:text-white transition-colors">
              <Shield className="w-3 h-3" />
              <span>Privacy</span>
            </a>
            <a href="/terms" className="flex items-center space-x-1 hover:text-white transition-colors">
              <FileText className="w-3 h-3" />
              <span>Terms</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-2 text-white/80">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400" />
            <span>for your wellbeing</span>
          </div>
        </div>

        {/* Crisis Support - Minimal */}
        <div className="mt-6 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-center">
          <p className="text-sm text-white/90">
            <strong>Crisis Support:</strong> Call 112 or local emergency services if you need immediate help.
          </p>
        </div>
      </div>
    </footer>
  );
}