/**
 * Senior 119 - Legal Logic Module
 * 
 * Based on current Korean Labor Standards Act and Employment Insurance Act.
 * DISCLAIMER: This logic is for reference only and does not constitute legal advice.
 */

// ============================================
// [1] Unemployment Benefit Diagnosis
// ============================================

export function diagnoseUnemploymentBenefit(input) {
    const {
        firstHireDate,     // Date object
        birthDate,         // Date object
        reasonForLeaving,  // "voluntary" | "fired" | "contract_expired"
        validReasonFlag,   // boolean (true if there is a valid reason for voluntary resignation)
        insuranceMonths    // number (months of insurance coverage in last 18 months)
    } = input;

    // Calculate Age 65 Date
    const age65Date = new Date(birthDate);
    age65Date.setFullYear(birthDate.getFullYear() + 65);

    // Step 1: Check if hired after 65
    // If firstHireDate > age65Date, they are generally not eligible for unemployment benefits 
    // because they cannot acquire new coverage (though they are exempt from premiums).
    // Exception: If they had continuous coverage from before 65, but here we check "newly hired".
    // The rule is: "Newly employed after 65" -> No unemployment benefit.
    if (firstHireDate > age65Date) {
        return {
            canReceive: false,
            reason: "만 65세 이후에 새로 고용된 경우에는 실업급여 수급 자격이 제한됩니다.",
            reasonDetail: "고용보험법 제10조: 65세 이후 취득 제한",
            referLaw: "고용보험법 제10조"
        };
    }

    // Step 2: Reason for Leaving
    if (reasonForLeaving === "voluntary") {
        if (!validReasonFlag) {
            return {
                canReceive: false,
                reason: "개인 사정으로 인한 자진 퇴사는 실업급여를 받을 수 없습니다.",
                reasonDetail: "단, 아픔/이사/임금체불 등 정당한 사유가 인정되면 가능합니다.",
                referLaw: "고용보험법 제58조"
            };
        }
    }
    // reasonForLeaving === "fired" or "contract_expired" are eligible.

    // Step 3: Coverage Duration
    // Must be insured for at least 180 days (approx 6-7 months of work, but safe to ask for 12 months for simplicity in conservative estimate, 
    // however 180 days is the legal minimum. The plan said 12 months in last 18 months, which works.)
    // Let's stick to the user's plan logic: "12 months in last 18 months" for simplicity/safety, 
    // or strictly "180 days". 
    // NOTE: The plan.md example logic used "insuranceMonths < 12". Let's use that for consistency with the approved plan.
    if (insuranceMonths < 12) { // Logic from plan.md
        return {
            canReceive: false,
            reason: `고용보험 가입 기간이 부족합니다. (최근 18개월 확인 필요)`,
            reasonDetail: `현재 입력: ${insuranceMonths}개월 (안전권: 12개월 이상 권장)`,
            referLaw: "고용보험법 제40조"
        };
    }

    // Success
    return {
        canReceive: true,
        benefit: "실업급여 수급 자격이 있을 가능성이 높습니다.",
        nextStep: "관할 고용센터를 방문하여 실업인정 신청을 진행하세요.",
        referLaw: "고용보험법 제40조"
    };
}

// ============================================
// [2] Retirement Pay (Severance) Diagnosis
// ============================================

export function diagnoseRetirementPay(input) {
    const {
        totalWorkMonths,      // number (Total months worked)
        weeklyHours,          // number (Average weekly working hours)
        weeklyDays,           // number (Average working days per week)
        hasRetirementPayClause // boolean (Does contract say "No Severance"?)
    } = input;

    // Step 1: Work Duration (< 1 year)
    if (totalWorkMonths < 12) {
        return {
            canReceive: false,
            reason: "계속 근로 기간이 1년 미만입니다.",
            reasonDetail: "퇴직금은 만 1년 이상 근무해야 발생합니다.",
            referLaw: "근로자퇴직급여 보장법 제4조"
        };
    }

    // Step 2: Weekly Hours (< 15 hours)
    if (weeklyHours < 15) {
        return {
            canReceive: false,
            reason: "주당 평균 근로시간이 15시간 미만입니다 (초단시간 근로자).",
            reasonDetail: "1주 15시간 미만 근로자는 퇴직금 지급 대상에서 제외됩니다.",
            referLaw: "근로기준법 제18조 및 퇴직급여법 제4조"
        };
    }

    // Step 3: Weekly Days Check (Ambiguous case)
    // Logic from plan.md: if < 4 days, mark as "Ambiguous"
    if (weeklyDays < 4) {
        return {
            canReceive: false, // Or debatable, but safe to say "Check needed"
            isAmbiguous: true,
            reason: "주당 근무 일 수가 적어(4일 미만) 전문가 확인이 필요할 수 있습니다.",
            reasonDetail: "근로시간이 15시간 이상이라면 받을 수 있으나, 구체적인 계약 확인이 필요합니다.",
            nextStep: "법률 전문가 상담 필요",
            referLaw: "근로기준법 제18조"
        };
    }

    // Step 4: Contract Clause Warning
    // Even if contract says "No Severance", it's invalid.
    let warning = null;
    if (hasRetirementPayClause) {
        warning = "계약서에 '퇴직금 없음' 문구가 있어도 무효입니다. 법적으로 받을 수 있습니다.";
    }

    // Success
    return {
        canReceive: true,
        warning: warning,
        benefit: "퇴직금을 받을 수 있습니다.",
        nextStep: "회사에 퇴직금 지급을 요청하세요. 거부 시 노동청에 진정을 넣을 수 있습니다.",
        referLaw: "근로자퇴직급여 보장법 제4조"
    };
}

// ============================================
// [3] Split Contract Detection
// ============================================

export function detectSplitContract(contractList) {
    // contractList: Array of { startDate: Date, endDate: Date }

    if (!contractList || contractList.length === 0) {
        return { isSuspected: false };
    }

    const contractDurations = contractList.map(c => {
        // Difference in months (approx)
        const diffTime = Math.abs(c.endDate - c.startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays / 30; // Approx months
    });

    const totalMonths = contractDurations.reduce((a, b) => a + b, 0);

    // Pattern Detection: Every contract is between 2 and 11 months
    // e.g., 11 months, 11 months... or 3 months, 3 months...
    const isSuspiciousSplit = contractDurations.length >= 2 && contractDurations.every(
        d => d >= 2 && d < 12
    );

    if (isSuspiciousSplit) {
        return {
            isSuspected: true,
            reason: "쪼개기 계약(단기 반복 계약)이 의심됩니다.",
            details: `${contractDurations.length}회의 단기 계약이 반복되었습니다.`,
            totalDuration: `${Math.round(totalMonths)}개월`,
            recommendation: "반복된 계약 기간을 모두 합쳐서(통산) 퇴직금을 청구할 수 있습니다.",
            referLaw: "근로기준법 및 관련 판례 (계속근로기간 산정)"
        };
    }

    return {
        isSuspected: false,
        totalMonths: Math.round(totalMonths)
    };
}
