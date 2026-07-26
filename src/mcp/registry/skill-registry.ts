/**
 * Skill Registry
 * Manages registration and lookup of available skills
 */

import { Skill } from '../types/skill';

export class SkillRegistry {
  private skills: Map<string, Skill> = new Map();
  private categories: Map<string, Set<string>> = new Map();
  private tags: Map<string, Set<string>> = new Map();

  /**
   * Register a skill
   */
  registerSkill(skill: Skill): void {
    const { id } = skill.metadata;
    
    if (this.skills.has(id)) {
      throw new Error(`Skill with id ${id} is already registered`);
    }

    this.skills.set(id, skill);
    this.indexSkillByCategory(skill);
    this.indexSkillByTags(skill);
  }

  /**
   * Unregister a skill
   */
  unregisterSkill(skillId: string): boolean {
    const skill = this.skills.get(skillId);
    if (!skill) return false;

    this.skills.delete(skillId);
    this.removeFromCategoryIndex(skill);
    this.removeFromTagsIndex(skill);
    
    return true;
  }

  /**
   * Get a skill by ID
   */
  getSkill(skillId: string): Skill | undefined {
    return this.skills.get(skillId);
  }

  /**
   * Get all registered skills
   */
  getAllSkills(): Skill[] {
    return Array.from(this.skills.values());
  }

  /**
   * Get skills by category
   */
  getSkillsByCategory(category: string): Skill[] {
    const skillIds = this.categories.get(category) || new Set();
    return Array.from(skillIds).map(id => this.skills.get(id)!).filter(Boolean);
  }

  /**
   * Get skills by tag
   */
  getSkillsByTag(tag: string): Skill[] {
    const skillIds = this.tags.get(tag) || new Set();
    return Array.from(skillIds).map(id => this.skills.get(id)!).filter(Boolean);
  }

  /**
   * List all categories
   */
  getCategories(): string[] {
    return Array.from(this.categories.keys());
  }

  /**
   * List all tags
   */
  getTags(): string[] {
    return Array.from(this.tags.keys());
  }

  /**
   * Check if a skill exists
   */
  hasSkill(skillId: string): boolean {
    return this.skills.has(skillId);
  }

  private indexSkillByCategory(skill: Skill): void {
    const { category } = skill.metadata;
    if (!this.categories.has(category)) {
      this.categories.set(category, new Set());
    }
    this.categories.get(category)!.add(skill.metadata.id);
  }

  private indexSkillByTags(skill: Skill): void {
    for (const tag of skill.metadata.tags) {
      if (!this.tags.has(tag)) {
        this.tags.set(tag, new Set());
      }
      this.tags.get(tag)!.add(skill.metadata.id);
    }
  }

  private removeFromCategoryIndex(skill: Skill): void {
    const { category, id } = skill.metadata;
    const skillIds = this.categories.get(category);
    if (skillIds) {
      skillIds.delete(id);
      if (skillIds.size === 0) {
        this.categories.delete(category);
      }
    }
  }

  private removeFromTagsIndex(skill: Skill): void {
    for (const tag of skill.metadata.tags) {
      const skillIds = this.tags.get(tag);
      if (skillIds) {
        skillIds.delete(skill.metadata.id);
        if (skillIds.size === 0) {
          this.tags.delete(tag);
        }
      }
    }
  }
}
