// /**
//  * Adjust next-day readiness based on recovery
//  */
// export const adjustNextDayReadiness = ({
//   currentReadinessScore,
//   recoveryType
// }) => {
//   let adjustment = 0;
//   let reason = "Readiness unchanged";

//   switch (recoveryType) {
//     case "full_rest":
//       adjustment = -10;
//       reason = "High fatigue — readiness reduced";
//       break;

//     case "mobility":
//       adjustment = -5;
//       reason = "Moderate fatigue — slight readiness reduction";
//       break;

//     case "active":
//       adjustment = +2;
//       reason = "Good recovery — readiness maintained";
//       break;

//     default:
//       adjustment = 0;
//   }

//   const adjustedScore = Math.min(
//     100,
//     Math.max(0, currentReadinessScore + adjustment)
//   );

//   return {
//     adjustedScore,
//     adjustment,
//     reason
//   };
// };


export const adjustNextDayReadiness = ({
  currentReadinessScore,
  recoveryType,
  perceivedExertion
}) => {
  let adjustment = 0;
  let reason = "Readiness unchanged";

  switch (recoveryType) {
    case "full_rest":
      adjustment = perceivedExertion >= 8 ? -12 : -8;
      reason = "High accumulated fatigue";
      break;

    case "mobility":
      adjustment = perceivedExertion >= 7 ? -6 : -4;
      reason = "Moderate fatigue with partial recovery";
      break;

    case "active":
      adjustment = perceivedExertion <= 5 ? +3 : +1;
      reason = "Good recovery with controlled load";
      break;
  }

  const adjustedScore = Math.min(
    100,
    Math.max(0, currentReadinessScore + adjustment)
  );

  return {
    adjustedScore,
    adjustment,
    reason
  };
};
