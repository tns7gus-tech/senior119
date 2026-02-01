import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import QuestionCard from '../components/common/QuestionCard';
import PrescriptionResult from '../components/common/PrescriptionResult';
import { diagnoseUnemploymentBenefit, diagnoseRetirementPay } from '../lib/logic';

const QUESTIONS = {
    unemployment: [
        {
            id: "age_check",
            text: "지금 회사에 처음 들어갔을 때,\n'만 65세'가 지난 후였나요?",
            yesValue: { isHiredAfter65: true },
            noValue: { isHiredAfter65: false }
        },
        {
            id: "leaving_reason",
            text: "회사를 그만두는 이유가\n내 발로 직접 나가는 '자진퇴사' 인가요?",
            yesValue: { reason: "voluntary" },
            noValue: { reason: "fired" }
        },
        {
            id: "voluntary_detail",
            condition: (answers) => answers.reason === "voluntary",
            text: "그냥 그만두는 게 아니라,\n아프거나 월급을 못 받아서 어쩔 수 없이 그만두나요?",
            yesValue: { validReason: true },
            noValue: { validReason: false }
        },
        {
            id: "insurance_period",
            text: "최근 1년 6개월 동안,\n고용보험 가입 기간이 1년 이상인가요?",
            yesValue: { longEnough: true },
            noValue: { longEnough: false }
        }
    ],
    severance: [
        {
            id: "work_period",
            text: "이 회사에서 일한 기간이\n다 합쳐서 '1년 이상' 인가요?",
            yesValue: { workedOverYear: true },
            noValue: { workedOverYear: false }
        },
        {
            id: "weekly_hours",
            text: "일주일에 일하는 시간이\n평균 '15시간 이상' 인가요?",
            yesValue: { hoursOver15: true },
            noValue: { hoursOver15: false }
        },
        {
            id: "weekly_days",
            text: "일주일에 회사 나가는 날이\n'4일 이상' 인가요?",
            yesValue: { daysOver4: true },
            noValue: { daysOver4: false }
        },
        {
            id: "contract_check",
            text: "계약서에 '퇴직금 없음'이나\n'3.3% 프리랜서'라고 써있나요?",
            yesValue: { badClause: true },
            noValue: { badClause: false }
        }
    ]
};

const CheckPage = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    if (!QUESTIONS[type]) {
        // Redirect to NotFound or Home if type is invalid
        return <Navigate to="/404" replace />;
    }

    const questionList = QUESTIONS[type];

    const currentQuestion = questionList[step];

    const handleAnswer = (value) => {
        const newAnswers = { ...answers, ...value };
        setAnswers(newAnswers);

        let nextStep = step + 1;
        while (nextStep < questionList.length) {
            const q = questionList[nextStep];
            if (!q.condition || q.condition(newAnswers)) {
                break;
            }
            nextStep++;
        }

        if (nextStep < questionList.length) {
            setStep(nextStep);
        } else {
            analyzeResult(newAnswers);
        }
    };

    const analyzeResult = (finalAnswers) => {
        let diagnosis = {};

        if (type === 'unemployment') {
            const today = new Date();
            const birth = new Date(today.getFullYear() - 67, 0, 1); // 67 years old

            let hireDate;
            if (finalAnswers.isHiredAfter65) {
                hireDate = new Date(); // Hired now (Age 67) -> Ineligible
            } else {
                hireDate = new Date(today.getFullYear() - 10, 0, 1); // Hired 10 years ago -> Eligible
            }

            const logicInput = {
                firstHireDate: hireDate,
                birthDate: birth,
                reasonForLeaving: finalAnswers.reason || "fired",
                validReasonFlag: finalAnswers.validReason || false,
                insuranceMonths: finalAnswers.longEnough ? 13 : 6
            }

            diagnosis = diagnoseUnemploymentBenefit(logicInput);

        } else if (type === 'severance') {
            const input = {
                totalWorkMonths: finalAnswers.workedOverYear ? 13 : 11,
                weeklyHours: finalAnswers.hoursOver15 ? 40 : 10,
                weeklyDays: finalAnswers.daysOver4 ? 5 : 2,
                hasRetirementPayClause: finalAnswers.badClause || false
            };
            diagnosis = diagnoseRetirementPay(input);
        }

        setResult(diagnosis);

        // [New] Send Statistics to Backend
        // Fire-and-forget (don't wait for it)
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        fetch(`${apiUrl}/api/diagnosis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type,
                result: diagnosis,
                answers: finalAnswers,
                timestamp: new Date().toISOString()
            })
        }).catch(err => console.error("Failed to save stats:", err));
    };

    if (result) {
        return <PrescriptionResult diagnosis={result} onRestart={() => navigate('/')} />;
    }

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <QuestionCard
            question={currentQuestion.text}
            onYes={() => handleAnswer(currentQuestion.yesValue)}
            onNo={() => handleAnswer(currentQuestion.noValue)}
            currentStep={step + 1}
            totalSteps={questionList.filter(q => !q.condition || q.condition(answers)).length}
        />
    );
};

export default CheckPage;
