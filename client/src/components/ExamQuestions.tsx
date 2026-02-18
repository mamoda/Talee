import { useState } from "react";
import { Lesson } from "@/lib/examData";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

interface ExamQuestionsProps {
  lesson: Lesson;
  lessonName: string;
  subjectName: string;
  className: string;
  onComplete: (results: {
    correctAnswers: number;
    totalQuestions: number;
    score: number;
    answers: number[];
  }) => void;
  onBack: () => void;
}

export default function ExamQuestions({
  lesson,
  lessonName,
  subjectName,
  className,
  onComplete,
  onBack,
}: ExamQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(lesson.questions.length).fill(-1));
  const [showReview, setShowReview] = useState(false);

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const isAnswered = answers[currentQuestionIndex] !== -1;

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = answers.filter(
      (answer, index) => answer === lesson.questions[index].correctAnswer
    ).length;
    const score = Math.round((correctAnswers / lesson.questions.length) * 100);

    onComplete({
      correctAnswers,
      totalQuestions: lesson.questions.length,
      score,
      answers,
    });
  };

  if (showReview) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setShowReview(false)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            رجوع
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            مراجعة الإجابات
          </h1>
          <p className="text-lg text-slate-600">
            {className} - {subjectName} - {lessonName}
          </p>
        </div>

        {/* Review Questions */}
        <div className="space-y-6">
          {lesson.questions.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={question.id} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 font-semibold text-slate-700 flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      {question.text}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer === optionIndex;
                        const isCorrectOption = optionIndex === question.correctAnswer;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              isUserAnswer && isCorrect
                                ? "bg-green-50 border-green-500"
                                : isUserAnswer && !isCorrect
                                ? "bg-red-50 border-red-500"
                                : isCorrectOption && !isCorrect
                                ? "bg-green-50 border-green-500"
                                : "bg-slate-50 border-slate-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isUserAnswer && isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              )}
                              {isUserAnswer && !isCorrect && (
                                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                              )}
                              {isCorrectOption && !isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              )}
                              {!isUserAnswer && !isCorrectOption && (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex-shrink-0" />
                              )}
                              <span className="text-slate-900">{option}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900">
                          <span className="font-semibold">الشرح: </span>
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setShowReview(false)}
            className="flex-1 px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
          >
            العودة للاختبار
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            إرسال الإجابات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
          رجوع
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {lessonName}
        </h1>
        <p className="text-lg text-slate-600">
          {className} - {subjectName}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8 bg-white rounded-2xl p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-slate-600">
            السؤال {currentQuestionIndex + 1} من {lesson.questions.length}
          </span>
          <span className="text-sm font-semibold text-slate-600">
            {answers.filter((a) => a !== -1).length} / {lesson.questions.length} مجاب
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
            style={{
              width: `${((currentQuestionIndex + 1) / lesson.questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-8">
        {/* Question Number and Text */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              {currentQuestionIndex + 1}
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {currentQuestion.text}
            </h2>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={`w-full p-4 rounded-lg border-2 text-right transition-all ${
                answers[currentQuestionIndex] === index
                  ? "bg-blue-50 border-blue-500 shadow-md"
                  : "bg-slate-50 border-slate-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    answers[currentQuestionIndex] === index
                      ? "bg-blue-500 border-blue-500"
                      : "border-slate-300"
                  }`}
                >
                  {answers[currentQuestionIndex] === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-semibold text-slate-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex-1 px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          السابق
        </button>

        {currentQuestionIndex < lesson.questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
          >
            التالي
          </button>
        ) : (
          <button
            onClick={() => setShowReview(true)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            مراجعة الإجابات
          </button>
        )}
      </div>

      {/* Question Selector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">الأسئلة</h3>
        <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
          {lesson.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                index === currentQuestionIndex
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : answers[index] !== -1
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
