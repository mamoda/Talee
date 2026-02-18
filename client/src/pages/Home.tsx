import { useState } from "react";
import { examData, SchoolClass, Subject, Lesson } from "@/lib/examData";
import ClassSelection from "@/components/ClassSelection";
import SubjectSelection from "@/components/SubjectSelection";
import LessonSelection from "@/components/LessonSelection";
import ExamQuestions from "@/components/ExamQuestions";
import ResultsPage from "@/components/ResultsPage";
import ProgressBar from "@/components/ProgressBar";

type ExamStep = "class" | "subject" | "lesson" | "exam" | "results";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<ExamStep>("class");
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [examResults, setExamResults] = useState<{
    correctAnswers: number;
    totalQuestions: number;
    score: number;
    answers: number[];
  } | null>(null);

  const handleClassSelect = (classItem: SchoolClass) => {
    setSelectedClass(classItem);
    setCurrentStep("subject");
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentStep("lesson");
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentStep("exam");
  };

  const handleExamComplete = (results: {
    correctAnswers: number;
    totalQuestions: number;
    score: number;
    answers: number[];
  }) => {
    setExamResults(results);
    setCurrentStep("results");
  };

  const handleRestart = () => {
    setCurrentStep("class");
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedLesson(null);
    setExamResults(null);
  };

  const handleBackToClasses = () => {
    setCurrentStep("class");
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedLesson(null);
  };

  const handleBackToSubjects = () => {
    setCurrentStep("subject");
    setSelectedSubject(null);
    setSelectedLesson(null);
  };

  const handleBackToLessons = () => {
    setCurrentStep("lesson");
    setSelectedLesson(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50">
      <ProgressBar currentStep={currentStep} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {currentStep === "class" && (
          <ClassSelection
            classes={examData}
            onSelectClass={handleClassSelect}
          />
        )}

        {currentStep === "subject" && selectedClass && (
          <SubjectSelection
            subjects={selectedClass.subjects}
            className={selectedClass.name}
            onSelectSubject={handleSubjectSelect}
            onBack={handleBackToClasses}
          />
        )}

        {currentStep === "lesson" && selectedSubject && (
          <LessonSelection
            lessons={selectedSubject.lessons}
            subjectName={selectedSubject.name}
            className={selectedClass?.name || ""}
            onSelectLesson={handleLessonSelect}
            onBack={handleBackToSubjects}
          />
        )}

        {currentStep === "exam" && selectedLesson && (
          <ExamQuestions
            lesson={selectedLesson}
            lessonName={selectedLesson.name}
            subjectName={selectedSubject?.name || ""}
            className={selectedClass?.name || ""}
            onComplete={handleExamComplete}
            onBack={handleBackToLessons}
          />
        )}

        {currentStep === "results" && examResults && selectedLesson && (
          <ResultsPage
            results={examResults}
            lesson={selectedLesson}
            lessonName={selectedLesson.name}
            subjectName={selectedSubject?.name || ""}
            className={selectedClass?.name || ""}
            onRestart={handleRestart}
            onRetry={() => {
              setCurrentStep("exam");
              setExamResults(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
