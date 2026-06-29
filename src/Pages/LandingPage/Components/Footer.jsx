import { Briefcase } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-8 backdrop-blur sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-3 shadow-sm shadow-blue-200">
              <Briefcase className="h-6 w-6 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              HireHub
            </h3>
          </div>

          <p className="mx-auto max-w-md text-sm leading-6 text-gray-600">
            Connecting talented professionals with innovative companies
            worldwide. Your career success is our mission.
          </p>

          <p className="mt-6 border-t border-slate-200 pt-5 text-sm text-gray-500">
            © {new Date().getFullYear()} Time To Program. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
