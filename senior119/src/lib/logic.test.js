import { diagnoseUnemploymentBenefit, diagnoseRetirementPay, detectSplitContract } from './logic.js';

console.log("=== Senior 119 Logic Test ===\n");

// 1. Unemployment Test Cases
console.log("--- 1. Unemployment Benefit Diagnosis ---");

const case1 = {
    firstHireDate: new Date("2024-01-01"), // Hired recently
    birthDate: new Date("1950-01-01"),     // Age 74+ (Hired well after 65)
    reasonForLeaving: "contract_expired",
    validReasonFlag: true,
    insuranceMonths: 18
};
console.log("[Case 1.1] Hired after 65:", diagnoseUnemploymentBenefit(case1).canReceive === false ? "PASS" : "FAIL");

const case2 = {
    firstHireDate: new Date("2010-01-01"), // Hired long ago (Before 65)
    birthDate: new Date("1950-01-01"),     // Age 74+
    reasonForLeaving: "fired",
    validReasonFlag: true,
    insuranceMonths: 18
};
console.log("[Case 1.2] Hired before 65, Fired:", diagnoseUnemploymentBenefit(case2).canReceive === true ? "PASS" : "FAIL");

const case3 = {
    firstHireDate: new Date("2010-01-01"),
    birthDate: new Date("1960-01-01"),
    reasonForLeaving: "voluntary",
    validReasonFlag: false, // No valid reason
    insuranceMonths: 24
};
console.log("[Case 1.3] Voluntary Resignation (No reason):", diagnoseUnemploymentBenefit(case3).canReceive === false ? "PASS" : "FAIL");


// 2. Severance Pay Test Cases
console.log("\n--- 2. Severance Pay Diagnosis ---");

const sevCase1 = {
    totalWorkMonths: 11,
    weeklyHours: 40,
    weeklyDays: 5,
    hasRetirementPayClause: false
};
console.log("[Case 2.1] Worked 11 months:", diagnoseRetirementPay(sevCase1).canReceive === false ? "PASS" : "FAIL");

const sevCase2 = {
    totalWorkMonths: 24,
    weeklyHours: 10, // < 15 hours
    weeklyDays: 2,
    hasRetirementPayClause: false
};
console.log("[Case 2.2] Worked 10 hours/week:", diagnoseRetirementPay(sevCase2).canReceive === false ? "PASS" : "FAIL");

const sevCase3 = {
    totalWorkMonths: 24,
    weeklyHours: 40,
    weeklyDays: 5,
    hasRetirementPayClause: true // "No Severance" clause
};
const res3 = diagnoseRetirementPay(sevCase3);
console.log("[Case 2.3] Invalid Contract Clause:", (res3.canReceive === true && res3.warning != null) ? "PASS" : "FAIL");


// 3. Split Contract Test Cases
console.log("\n--- 3. Split Contract Detection ---");

const splitCase1 = [
    { startDate: new Date("2023-01-01"), endDate: new Date("2023-11-30") }, // 11 months
    { startDate: new Date("2023-12-01"), endDate: new Date("2024-10-30") }  // 11 months
];
const splitRes1 = detectSplitContract(splitCase1);
console.log("[Case 3.1] 11-month split contracts:", splitRes1.isSuspected === true ? "PASS" : "FAIL");

console.log("\n=== Test Complete ===");
