import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { quiz } from "~/hardcoded_questions";

type IcompletedQuestion = {
  questionIndex: number;
  selectedAnswer: number;
  selectedAnswerString: String | undefined;
};

const Home: NextPage = () => {
  const [showTime, setShowTime] = useState(true);
  const [completedQuestions, setCompletedQuestions] = useState<
    IcompletedQuestion[]
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState<number>(0);
  const [chosenAnswerString, setChosenAnswerString] = useState<
    string | undefined
  >("");
  const [submitted, setSubmitted] = useState(false);

  const handleAddQuestion = () => {
    if (
      completedQuestions.filter((q) => q.questionIndex === currentQuestion)
        .length > 0
    ) {
      if (chosenAnswer != 0) {
        const newCompletedQuestions = completedQuestions.filter((q) => {
          if (q.questionIndex === currentQuestion) {
            q.selectedAnswer = chosenAnswer;
          }
          return q;
        });
        setCompletedQuestions(newCompletedQuestions);
      } else {
        const newCompletedQuestions = completedQuestions.filter((q) => {
          if (q.questionIndex != currentQuestion) {
            return q;
          }
        });
        setCompletedQuestions(newCompletedQuestions);
      }
    } else {
      if (chosenAnswer != 0) {
        setCompletedQuestions((prev) => [
          ...prev,
          {
            questionIndex: currentQuestion,
            selectedAnswer: chosenAnswer,
            selectedAnswerString: chosenAnswerString,
          },
        ]);
      } else {
        return;
      }
    }
    setChosenAnswer(0);
  };

  const handleNext = () => {
    handleAddQuestion();
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
    }
  };

  const handleBack = () => {
    handleAddQuestion();
    if (currentQuestion > 0) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion - 1);
    }
  };

  const handleJump = (_question: number) => {
    handleAddQuestion();
    if (_question > 0 && _question < quiz.questions.length - 1) {
      setCurrentQuestion(_question);
    } else if (_question <= 0) {
      setCurrentQuestion(_question);
    } else {
      setCurrentQuestion(_question);
    }
  };

  const handleChooseAnswer = (
    _optionIndex: number,
    _optionString: string | undefined
  ) => {
    if (chosenAnswer === _optionIndex) {
      setChosenAnswer(0);
      setChosenAnswerString("");
    } else {
      setChosenAnswer(_optionIndex);
      setChosenAnswerString(_optionString);
    }
  };

  const handleSubmit = () => {
    handleAddQuestion();
    setSubmitted(true);
  };

  useEffect(() => {
    completedQuestions.filter((q) => {
      if (q.questionIndex === currentQuestion) {
        setChosenAnswer(q.selectedAnswer);
      }
      return q;
    });
  }, [currentQuestion]);

  return (
    <div className="grid h-auto min-h-screen w-full items-center justify-items-center bg-bg p-6 font-montserratBold text-almostblack">
      {!submitted ? (
        <div className="grid h-max w-full max-w-5xl rounded-3xl bg-gradient-to-br  from-linearStart to-linearEnd p-12 text-3xl shadow-2xl">
          <p className="mb-12 text-center">
            {quiz.questions[currentQuestion]?.prompt}
          </p>
          <div className="mb-12 grid grid-cols-2 grid-rows-2 gap-6">
            <div
              onClick={() =>
                handleChooseAnswer(1, quiz.questions[currentQuestion]?.option1)
              }
              className={`grid cursor-pointer items-center rounded-xl bg-element px-10 py-10 text-2xl transition-all hover:bg-neutral-300 ${
                chosenAnswer === 1
                  ? "border-4 border-purple shadow-equal"
                  : "shadow-md"
              }`}
            >
              {quiz.questions[currentQuestion]?.option1}
            </div>
            <div
              onClick={() =>
                handleChooseAnswer(2, quiz.questions[currentQuestion]?.option2)
              }
              className={`grid cursor-pointer items-center rounded-xl bg-element px-10 py-10 text-2xl transition-all hover:bg-neutral-300 ${
                chosenAnswer === 2
                  ? "border-4 border-purple shadow-equal"
                  : "shadow-md"
              }`}
            >
              {quiz.questions[currentQuestion]?.option2}
            </div>
            <div
              onClick={() =>
                handleChooseAnswer(3, quiz.questions[currentQuestion]?.option3)
              }
              className={`grid cursor-pointer items-center rounded-xl bg-element px-10 py-10 text-2xl transition-all hover:bg-neutral-300 ${
                chosenAnswer === 3
                  ? "border-4 border-purple shadow-equal"
                  : "shadow-md"
              }`}
            >
              {quiz.questions[currentQuestion]?.option3}
            </div>
            <div
              onClick={() =>
                handleChooseAnswer(4, quiz.questions[currentQuestion]?.option4)
              }
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
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="w-max cursor-pointer rounded-full bg-purple p-6 text-2xl text-white shadow-equal transition-all hover:bg-fuchsia-800"
              >
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
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-max cursor-pointer rounded-full bg-purple p-6 text-2xl text-white shadow-equal transition-all hover:bg-fuchsia-800"
              >
                Submit
              </button>
            )}
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
                    completedQuestions.filter((q) => q.questionIndex === index)
                      .length > 0
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
      ) : (
        <Results completedQuestions={completedQuestions} />
      )}
      {!submitted ? <Timer handleSubmit={() => setSubmitted(true)} /> : null}
    </div>
  );
};

export default Home;

export const Results = ({
  completedQuestions,
}: {
  completedQuestions: IcompletedQuestion[];
}) => {
  for (let i = 0; i < quiz.questions.length; i++) {
    if (completedQuestions.filter((q) => q.questionIndex === i).length === 0) {
      completedQuestions.push({
        questionIndex: i,
        selectedAnswer: 0,
        selectedAnswerString: "",
      });
    }
  }
  const newCompletedQuestions = completedQuestions.sort(
    (a: IcompletedQuestion, b: IcompletedQuestion) =>
      a.questionIndex > b.questionIndex ? 1 : -1
  );
  return (
    <div className="grid gap-12">
      {newCompletedQuestions.map((q: IcompletedQuestion) => (
        <div
          key={q.questionIndex}
          className={`grid items-center rounded-xl bg-element py-8 px-8 shadow-equal ${
            q.selectedAnswerString !=
            quiz.questions[q.questionIndex]?.rightOption
              ? "border-red-600 shadow-red-600"
              : "border-green-600 shadow-green-600"
          }`}
        >
          <p className="mb-12 text-lg">
            {quiz.questions[q.questionIndex]?.prompt}
          </p>
          <p className="mb-6 text-base">
            Your answer: {q.selectedAnswerString}
          </p>
          <p className="mb-12 text-base">
            Correct answer: {quiz.questions[q.questionIndex]?.rightOption}
          </p>
          {q.selectedAnswerString ===
          quiz.questions[q.questionIndex]?.rightOption ? (
            <p className="text-base text-green-600">Correct</p>
          ) : (
            <p className="text-base text-red-600">Incorrect</p>
          )}
        </div>
      ))}
    </div>
  );
};

export const Timer = ({ handleSubmit }: { handleSubmit: () => void }) => {
  var countDownDate1 = new Date("Jul 25, 2021 16:37:52").getTime();
  var countDownDate2 = new Date("Jul 25, 2021 16:34:52").getTime();

  const [timeleft, setTimeLeft] = useState(countDownDate1 - countDownDate2);

  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeleft <= 0) {
    handleSubmit();
  }

  return (
    <div className="grid h-max self-start">
      <div className="h-max">
        00:0{minutes}:{seconds < 10 ? "0" : null}
        {seconds}
      </div>
    </div>
  );
};
