import { SchoolClass } from "@/lib/examData";
import { BookOpen } from "lucide-react";

interface ClassSelectionProps {
  classes: SchoolClass[];
  onSelectClass: (classItem: SchoolClass) => void;
}

export default function ClassSelection({
  classes,
  onSelectClass,
}: ClassSelectionProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
المُــــعَلِّــــم        </h1>
        <p className="text-lg text-slate-600 mb-2">
          اختر صفك الدراسي لبدء الاختبار
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            onClick={() => onSelectClass(classItem)}
            className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-xl border border-white/30"></div>

            {/* Content */}
            <div className="relative p-8 md:p-10 h-full flex flex-col justify-center items-center text-center">
              {/* Icon */}
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg group-hover:shadow-xl transition-shadow">
                <BookOpen className="w-8 h-8 text-white" />
              </div>

              {/* Class Name */}
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                {classItem.name}
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                {classItem.description}
              </p>

              {/* Subject Count */}
              <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
                <span className="text-lg">{classItem.subjects.length}</span>
                <span className="text-sm">مواد دراسية</span>
              </div>

              {/* Button */}
              <button className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                اختر الصف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
