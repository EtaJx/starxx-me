export namespace SkillType { // 技能
  type Item = {
    title: string,
    val: string[]
  }
  type Props = {
    skill: Item
  }
}

export namespace EvaluationType {
  type Props = {
    evaluation: string[]
  }
}

export namespace ContentType {
  type ExperienceItem = {
    company: string,
    key: string,
    time: string,
    content: string,
    projects: string[],
    skills?: string[],
    department?: string
  }
  type ExperienceResume = {
    skill: Skill,
    experience: ExperienceItem[]
  }
  type Props = {
    resume: ExperienceResume
  }
}
