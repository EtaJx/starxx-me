export namespace SkillType { // 技能
  interface Item {
    title: string,
    val: string[]
  }
  interface Props {
    skill: Item
  }
}

export namespace EvaluationType {
  interface Props {
    evaluation: string[]
  }
}

export namespace ContentType {
  interface ExperienceItem {
    company: string,
    key: string,
    time: string,
    content: string,
    projects: string[],
    skills?: string[],
    department?: string
  }
  interface ExperienceResume {
    skill: Skill,
    experience: ExperienceItem[]
  }
  interface Props {
    resume: ExperienceResume
  }
}
