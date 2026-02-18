import { Lesson } from "@/lib/examData";
import { RotateCcw, Home, Award } from "lucide-react";

interface ResultsPageProps {
  results: {
    correctAnswers: number;
    totalQuestions: number;
    score: number;
    answers: number[];
  };
  lesson: Lesson;
  lessonName: string;
  subjectName: string;
  className: string;
  onRestart: () => void;
  onRetry: () => void;
}

export default function ResultsPage({
  results,
  lesson,
  lessonName,
  subjectName,
  className,
  onRestart,
  onRetry,
}: ResultsPageProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-green-500 to-emerald-500";
    if (score >= 75) return "from-blue-500 to-cyan-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "ممتاز جداً!";
    if (score >= 75) return "جيد جداً!";
    if (score >= 60) return "جيد!";
    return "حاول مرة أخرى!";
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Success Illustration */}
      <div className="text-center mb-12">
        <div className="mb-8 flex justify-center">
          <img
            src="https://private-us-east-1.manuscdn.com/sessionFile/u5ZVHfAcn1RMOEMcsbY0x5/sandbox/yMV24v9vO3w8FOQPs1zrIw-img-3_1771355767000_na1fn_c3VjY2Vzcy1pbGx1c3RyYXRpb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdTVaVkhmQWNuMVJNT0VNY3NiWTB4NS9zYW5kYm94L3lNVjI0djl2TzN3OEZPUVBzMXpySXctaW1nLTNfMTc3MTM1NTc2NzAwMF9uYTFmbl9jM1ZqWTJWemN5MXBiR3gxYzNSeVlYUnBiMjQucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dtRxJOeFtRYoE2Je7NTgpbz6GZxhE6R2neiLk0A9vnjkyaqrQ-iHsY4xhRxzy6QNJQTHoWO3~sG40SbDrg4gBn9HGFjNW58IfIkbaeJB8h5nEYap8zcPbKHAwOfvSuT0SlveEjcpwAAm7m8bvSdbORwv04TdGAbmy9p8pPVo2pOuI60Qp5Rg9wzDpWh8S6RLyywr6SRSCihOtAOt7TGkxzuu5K0UUjTIwfSUbbuXMgIkHdYIMj0-S3bNsrMul79Pkbux-TFQkkr3ojGVOOGvER2Kqf8vr7qr8MaRNJTnTYcnH26iNzlQUOT2d4XTNG5dckA6sghLaQnTi2~CgcSOFQ__"
            alt="نتائج ممتازة"
            className="w-64 h-64 object-contain"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
          {results.score}%
        </h1>
        <p className={`text-3xl font-bold bg-gradient-to-r ${getScoreColor(results.score)} bg-clip-text text-transparent mb-2`}>
          {getScoreMessage(results.score)}
        </p>
      </div>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Correct Answers */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-slate-600 text-sm mb-2">الإجابات الصحيحة</p>
          <p className="text-4xl font-bold text-green-600">
            {results.correctAnswers}/{results.totalQuestions}
          </p>
        </div>

        {/* Score */}
        <div className={`bg-gradient-to-br ${getScoreColor(results.score)} rounded-2xl p-8 text-white text-center shadow-lg`}>
          <div className="text-5xl font-bold mb-2">{results.score}</div>
          <p className="text-white/90 text-sm">النسبة المئوية</p>
        </div>

        {/* Wrong Answers */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <div className="text-2xl font-bold text-red-600">×</div>
          </div>
          <p className="text-slate-600 text-sm mb-2">الإجابات الخاطئة</p>
          <p className="text-4xl font-bold text-red-600">
            {results.totalQuestions - results.correctAnswers}
          </p>
        </div>
      </div>

      {/* Exam Info */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">معلومات الاختبار</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-600 text-sm mb-2">الصف الدراسي</p>
            <p className="text-lg font-semibold text-slate-900">{className}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm mb-2">المادة الدراسية</p>
            <p className="text-lg font-semibold text-slate-900">{subjectName}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm mb-2">الدرس</p>
            <p className="text-lg font-semibold text-slate-900">{lessonName}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm mb-2">عدد الأسئلة</p>
            <p className="text-lg font-semibold text-slate-900">{results.totalQuestions}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-100 text-blue-600 font-semibold rounded-lg hover:bg-blue-200 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          حل الاختبار مرة أخرى
        </button>
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          <Home className="w-5 h-5" />
          العودة للصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}
