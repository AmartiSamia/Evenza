import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#F8F6FF] text-[#1a1a1a] font-inter py-[50px]">
{/* Extra Links Section */}
<div className="bg-[#F8F6FF] max-w-7xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-sm text-[#1a1a1a]">
  <div>
    <h3 className="text-black font-semibold mb-3">About</h3>
    <ul className="space-y-2">
      <li><a href="#" className="hover:text-pink-500">Company</a></li>
      <li><a href="#" className="hover:text-pink-500">Careers</a></li>
      <li><a href="#" className="hover:text-pink-500">Blog</a></li>
    </ul>
  </div>
  <div>
    <h3 className="text-black font-semibold mb-3">Services</h3>
    <ul className="space-y-2">
      <li><a href="#" className="hover:text-pink-500">Event Planning</a></li>
      <li><a href="#" className="hover:text-pink-500">Consulting</a></li>
      <li><a href="#" className="hover:text-pink-500">Partnerships</a></li>
    </ul>
  </div>
  <div>
    <h3 className="text-black font-semibold mb-3">Support</h3>
    <ul className="space-y-2">
      <li><a href="#" className="hover:text-pink-500">Help Center</a></li>
      <li><a href="#" className="hover:text-pink-500">Terms of Service</a></li>
      <li><a href="#" className="hover:text-pink-500">Privacy Policy</a></li>
    </ul>
  </div>
  <div>
    <h3 className="text-black font-semibold mb-3">Contact</h3>
    <ul className="space-y-2">
      <li><a href="mailto:contact@evenza.com" className="hover:text-pink-500">contact@evenza.com</a></li>
      <li><a href="#" className="hover:text-pink-500">+212 6 00 00 00 00</a></li>
      <li><a href="#" className="hover:text-pink-500">Casablanca, Morocco</a></li>
    </ul>
  </div>
</div>

   {/* Bottom Line */}
<div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#d6d3e0] flex flex-col md:flex-row justify-between text-sm text-[#1a1a1a]">
  <span>Publish Ninja</span>
  <span>© 2024, Publish Ninja All Rights Reserved.</span>
  <span className="text-right">Built by Samia El Amarti</span>
</div>


    </footer>
  );
};

export default Footer;
