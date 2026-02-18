import { Lesson } from "@/lib/examData";
import { ArrowRight, BookOpen } from "lucide-react";

interface LessonSelectionProps {
  lessons: Lesson[];
  subjectName: string;
  className: string;
  onSelectLesson: (lesson: Lesson) => void;
  onBack: () => void;
}

export default function LessonSelection({
  lessons,
  subjectName,
  className,
  onSelectLesson,
  onBack,
}: LessonSelectionProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
          رجوع
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
          اختر الدرس
        </h1>
        <p className="text-lg text-slate-600">
          {className} - {subjectName}
        </p>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full"></div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => onSelectLesson(lesson)}
            className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-xl border border-white/30"></div>

            {/* Content */}
            <div className="relative p-8 md:p-10">
              {/* Icon */}
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg group-hover:shadow-xl transition-shadow w-fit">
                <BookOpen className="w-8 h-8 text-white" />
              </div>

              {/* Lesson Name */}
              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                {lesson.name}
              </h2>

              {/* Description */}
              <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                {lesson.description}
              </p>

              {/* Question Count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <span className="text-lg">{lesson.questions.length}</span>
                  <span className="text-sm">أسئلة</span>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
