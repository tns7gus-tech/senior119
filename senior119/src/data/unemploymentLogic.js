export const unemploymentSteps = [
    {
        id: 'age',
        question: "현재 만 65세 이상이신가요?",
        options: [
            { label: "네, 65세 이상입니다", value: 'yes', next: 'insurance_history' },
            { label: "아니오, 아직 65세 전입니다", value: 'no', result: 'standard_process' } // 65세 미만은 일반 절차
        ]
    },
    {
        id: 'insurance_history',
        question: "만 65세가 되기 전부터(또는 그 이전부터) 계속해서 고용보험에 가입되어 일하고 계셨나요?",
        description: "65세 이후에 새로 취업하여 고용보험에 가입한 경우에는 실업급여 수급이 어렵습니다. (단, 65세 이전부터 계속 근무하다가 65세 이후에 비자발적으로 퇴사한 경우는 가능)",
        options: [
            { label: "네, 65세 이전부터 계속 일했습니다", value: 'yes', next: 'work_period' },
            { label: "아니오, 65세 이후에 새로 취업했습니다", value: 'no', result: 'not_eligible_age_new_hire' }
        ]
    },
    {
        id: 'work_period',
        question: "퇴사하기 전 18개월 동안, 고용보험 가입 기간이 180일(약 6~7개월) 이상인가요?",
        description: "실제 근무한 날짜와 유급휴일만 포함됩니다. (주말 중 하루는 보통 무급)",
        options: [
            { label: "네, 180일 넘습니다", value: 'yes', next: 'reason' },
            { label: "아니오, 부족합니다", value: 'no', result: 'not_eligible_period' }
        ]
    },
    {
        id: 'reason',
        question: "어떤 사유로 퇴사하셨나요?",
        options: [
            { label: "계약 만료 / 정년 퇴직 / 회사 경영상 해고", value: 'involuntary', next: 'capability' },
            { label: "임금 체불 / 질병 / 직장 괴롭힘 등 (정당한 사유)", value: 'justifiable', next: 'capability' },
            { label: "개인 사정 / 자발적 퇴사 / 본인 잘못으로 인한 해고", value: 'voluntary', result: 'not_eligible_voluntary' }
        ]
    },
    {
        id: 'capability',
        question: "현재 건강하시고, 다시 일할 의사와 능력이 있으신가요?",
        options: [
            { label: "네, 재취업을 원합니다", value: 'yes', result: 'eligible' },
            { label: "아니오, 쉬고 싶거나 일하기 어렵습니다", value: 'no', result: 'not_eligible_capability' }
        ]
    }
];

export const getResultContent = (resultId) => {
    const results = {
        standard_process: {
            title: "일반 실업급여 신청 대상입니다",
            description: "65세 미만이시므로 일반적인 실업급여 절차를 따르시면 됩니다. 가까운 고용센터를 방문하세요.",
            status: "info"
        },
        not_eligible_age_new_hire: {
            title: "아쉽지만, 실업급여 수급이 어렵습니다",
            description: "현재 법적으로 65세 이후에 새로 취업하여 고용보험에 가입한 경우에는 실업급여(구직급여) 수급 대상에서 제외됩니다.",
            status: "error"
        },
        not_eligible_period: {
            title: "고용보험 가입 기간이 부족합니다",
            description: "이직일 이전 18개월 동안 고용보험 피보험 단위기간이 통산하여 180일 이상이어야 합니다.",
            status: "error"
        },
        not_eligible_voluntary: {
            title: "자발적 퇴사는 실업급여를 받을 수 없습니다",
            description: "개인 사정으로 인한 퇴직이나, 본인의 중대한 귀책사유로 해고된 경우에는 수급 자격이 제한됩니다.",
            status: "error"
        },
        not_eligible_capability: {
            title: "구직 의사와 능력이 필요합니다",
            description: "실업급여는 재취업을 지원하는 제도이므로, 구직 의사가 없거나 근로 능력이 없는 경우에는 받을 수 없습니다.",
            status: "error"
        },
        eligible: {
            title: "축하합니다! 실업급여 수급 가능성이 높습니다",
            description: "65세 이전부터 고용보험을 유지하셨고, 비자발적으로 퇴사하셨으므로 수급 요건을 충족하는 것으로 보입니다. 정확한 확인을 위해 관할 고용센터에 방문하여 신청하세요.",
            status: "success"
        }
    };
    return results[resultId] || null;
};
