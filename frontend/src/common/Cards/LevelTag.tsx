interface SkillLevels {
  beginner: string;
  intermediate: string;
  advanced: string;
  [key: string]: string;
}
const levelColor: SkillLevels = {
  beginner: "/icons/range1.svg",
  intermediate: "/icons/range2.svg",
  advanced: "/icons/range3.svg",
};

export default function LevelTag({
  level,
  isCardTag,
}: {
  level: string;
  isCardTag?: boolean;
}) {
  return (
    <div
      className={`bg-white flex gap-2 ${
        isCardTag ? "shadow-sm absolute py-1" : "shadow-2xl"
      }  rounded-lg px-3  bottom-3 left-3`}
    >
      {level?.charAt(0).toUpperCase() + level?.slice(1)}
      <img src={levelColor[level?.toLowerCase()]} alt="course-level" />
    </div>
  );
}
