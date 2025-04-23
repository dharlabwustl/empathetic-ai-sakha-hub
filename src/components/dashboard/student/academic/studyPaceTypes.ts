
export type StudyPace = "slow" | "moderate" | "fast";
export type StudyTime = "morning" | "afternoon" | "evening" | "night";
export type StudyPacePretty = "Relaxed" | "Balanced" | "Aggressive";
export type StudyTimePretty = "Morning" | "Afternoon" | "Evening" | "Night";

export const mapPaceToDisplay = (pace: StudyPace): StudyPacePretty => {
  switch (pace) {
    case "slow": return "Relaxed";
    case "moderate": return "Balanced";
    case "fast": return "Aggressive";
    default: return "Balanced";
  }
};

export const mapDisplayToPace = (pace: StudyPacePretty): StudyPace => {
  switch (pace) {
    case "Relaxed": return "slow";
    case "Balanced": return "moderate";
    case "Aggressive": return "fast";
    default: return "moderate";
  }
};

export const mapTimeToDisplay = (time: StudyTime): StudyTimePretty => {
  switch (time) {
    case "morning": return "Morning";
    case "afternoon": return "Afternoon";
    case "evening": return "Evening";
    case "night": return "Night";
    default: return "Morning";
  }
};

export const mapDisplayToTime = (time: StudyTimePretty): StudyTime => {
  switch (time) {
    case "Morning": return "morning";
    case "Afternoon": return "afternoon";
    case "Evening": return "evening";
    case "Night": return "night";
    default: return "morning";
  }
};
