import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { quiz } from "~/hardcoded_questions";
import localFont from "next/font/local";

const Home: NextPage = () => {
  const [showTime, setShowTime] = useState(true);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([
    1, 2, 3,
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState<number | null>(null);

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
    } else {
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion - 1);
    } else {
    }
  };

  const handleJump = (_question: number) => {
    if (_question > 0 && _question < quiz.questions.length - 1) {
      setCurrentQuestion(_question);
    } else if (_question <= 0) {
      setCurrentQuestion(_question);
    } else {
      setCurrentQuestion(_question);
    }
  };

  return (
    <div className="grid h-screen w-screen items-center justify-items-center bg-bg p-6 font-montserratBold text-almostblack">
      <div className="grid h-max w-full max-w-5xl rounded-3xl bg-gradient-to-br  from-linearStart to-linearEnd p-12 text-3xl shadow-2xl">
        <p className="mb-12 text-center">
          {quiz.questions[currentQuestion]?.prompt}
        </p>
        <div className="mb-12 grid grid-cols-2 grid-rows-2 gap-6">
          <div
            onClick={() => setChosenAnswer(1)}
            className={`grid cursor-pointer items-center rounded-xl bg-element px-10 py-10 text-2xl transition-all hover:bg-neutral-300 ${
              chosenAnswer === 1
                ? "border-4 border-purple shadow-equal"
                : "shadow-md"
            }`}
          >
            {quiz.questions[currentQuestion]?.option1}
          </div>
          <div
            onClick={() => setChosenAnswer(2)}
            className={`grid cursor-pointer items-center rounded-xl bg-element px-10 py-10 text-2xl transition-all hover:bg-neutral-300 ${
              chosenAnswer === 2
                ? "border-4 border-purple shadow-equal"
                : "shadow-md"
            }`}
          >
            {quiz.questions[currentQuestion]?.option2}
          </div>
          <div
            onClick={() => setChosenAnswer(3)}
            className={`grid cursor-pointer items-center rounded-xl bg-element px-10 py-10 text-2xl transition-all hover:bg-neutral-300 ${
              chosenAnswer === 3
                ? "border-4 border-purple shadow-equal"
                : "shadow-md"
            }`}
          >
            {quiz.questions[currentQuestion]?.option3}
          </div>
          <div
            onClick={() => setChosenAnswer(4)}
            className={`grid cursor-pointer items-center rounded-xl bg-element px-10 py-10 text-2xl transition-all hover:bg-neutral-300 ${
              chosenAnswer === 4
                ? "border-4 border-purple shadow-equal"
                : "shadow-md"
            }`}
          >
            {quiz.questions[currentQuestion]?.option4}
          </div>
        </div>
        <div
          className={`mb-12 grid ${
            currentQuestion > 0
              ? "grid-cols-[repeat(2,_max-content)]"
              : "grid-cols-1"
          } justify-center justify-items-center gap-6`}
        >
          {currentQuestion > 0 ? (
            <button
              onClick={handleBack}
              className="grid w-max cursor-pointer items-center rounded-full bg-darkenedElement py-6 px-14 text-2xl text-subtext transition-all hover:bg-neutral-300 hover:text-almostblack"
            >
              Back
            </button>
          ) : null}
          <button
            onClick={handleNext}
            className="w-max cursor-pointer rounded-full bg-purple p-6 text-2xl text-white shadow-equal transition-all hover:bg-fuchsia-800"
          >
            {currentQuestion < quiz.questions.length - 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </div>
        <div
          className={`grid auto-cols-max grid-flow-col gap-10 justify-self-center grid-cols-${quiz.questions.length}`}
        >
          {quiz.questions.map((q, index) => (
            <div
              className="grid grid-cols-[max-content_100%] items-center"
              key={q.prompt}
            >
              <button
                onClick={() => handleJump(index)}
                className={`grid h-10 w-10 cursor-pointer items-center justify-items-center rounded-full bg-element text-lg transition-all hover:bg-neutral-300 ${
                  completedQuestions.includes(index + 1)
                    ? "border-2 border-almostblack"
                    : ""
                } ${
                  currentQuestion === index
                    ? "border-2 border-purple shadow-equal"
                    : ""
                }`}
              >
                {index + 1}
              </button>
              {index != quiz.questions.length - 1 ? (
                <div className="w-full border-t-2 border-subtext"></div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
