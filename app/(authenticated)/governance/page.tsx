import { EmployeeSentimentAnalytics } from "@/app/components/EmployeeSentimentAnalytics";

export default function Governance() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-emerald-800">
        Governance & Employee Sentiment
      </h1>
      <EmployeeSentimentAnalytics />
    </div>
  );
}
