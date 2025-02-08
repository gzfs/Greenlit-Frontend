import React from "react";

interface CompanyProfileFormProps {
  companyDetails: {
    companyName: string;
    mission: string;
    vision: string;
    sector: string;
  };
  setCompanyDetails: React.Dispatch<
    React.SetStateAction<{
      companyName: string;
      mission: string;
      vision: string;
      sector: string;
    }>
  >;
}

const CompanyProfileForm: React.FC<CompanyProfileFormProps> = ({
  companyDetails,
  setCompanyDetails,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-4xl mb-6 text-gray-800 font-medium tracking-tighter">
        Company Profile
      </h2>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={companyDetails.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sector
            </label>
            <input
              type="text"
              name="sector"
              value={companyDetails.sector}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              placeholder="AI-Determined Sector"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mission Statement
          </label>
          <textarea
            name="mission"
            value={companyDetails.mission}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Describe your company's mission"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vision Statement
          </label>
          <textarea
            name="vision"
            value={companyDetails.vision}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Share your company's long-term vision"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
