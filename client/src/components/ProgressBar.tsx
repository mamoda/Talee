import { CheckCircle2, Circle } from "lucide-react";

type ExamStep = "class" | "subject" | "lesson" | "exam" | "results";

interface ProgressBarProps {
  currentStep: ExamStep;
}

const steps: { id: ExamStep; label: string }[] = [
  { id: "class", label: "الصف" },
  { id: "subject", label: "المادة" },
  { id: "lesson", label: "الدرس" },
  { id: "exam", label: "الاختبار" },
  { id: "results", label: "النتائج" },
];

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    index <= currentIndex
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {index < currentIndex ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`text-sm font-semibold hidden sm:inline ${
                    index <= currentIndex ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    index < currentIndex
                      ? "bg-gradient-to-r from-blue-500 to-purple-500"
                      : "bg-slate-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
