/**
 * Skill Loader
 * Loads and parses skills from files
 */

import fs from 'fs/promises';
import path from 'path';
import { Skill, SkillMetadata } from '../types/skill';

export class SkillLoader {
  private skillsPath: string;
  private loadedSkills: Map<string, Skill> = new Map();

  constructor(skillsPath: string) {
    this.skillsPath = skillsPath;
  }

  /**
   * Load a single skill file
   */
  async loadSkill(fileName: string): Promise<Skill | null> {
    try {
      const filePath = path.join(this.skillsPath, fileName);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const skillData = JSON.parse(fileContent);
      
      // Validate skill structure
      this.validateSkillStructure(skillData);
      
      return skillData as Skill;
    } catch (error) {
      console.error(`Failed to load skill from ${fileName}:`, error);
      return null;
    }
  }

  /**
   * Load all skills from the skills directory
   */
  async loadAllSkills(): Promise<Skill[]> {
    try {
      const files = await fs.readdir(this.skillsPath);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      const skills: Skill[] = [];
      
      for (const file of jsonFiles) {
        const skill = await this.loadSkill(file);
        if (skill) {
          skills.push(skill);
          this.loadedSkills.set(skill.metadata.id, skill);
        }
      }
      
      return skills;
    } catch (error) {
      console.error('Failed to load skills directory:', error);
      return [];
    }
  }

  /**
   * Get a skill by ID
   */
  getSkill(skillId: string): Skill | undefined {
    return this.loadedSkills.get(skillId);
  }

  /**
   * Get all loaded skills
   */
  getAllSkills(): Skill[] {
    return Array.from(this.loadedSkills.values());
  }

  /**
   * Validate skill structure
   */
  private validateSkillStructure(skill: unknown): void {
    if (!skill || typeof skill !== 'object') {
      throw new Error('Skill must be an object');
    }

    const skillObj = skill as Record<string, unknown>;

    if (!skillObj.metadata) {
      throw new Error('Skill must have metadata property');
    }

    if (!skillObj.input) {
      throw new Error('Skill must have input property');
    }

    if (!skillObj.output) {
      throw new Error('Skill must have output property');
    }

    const metadata = skillObj.metadata as Record<string, unknown>;
    if (!metadata.id || !metadata.name || !metadata.version) {
      throw new Error('Skill metadata must have id, name, and version');
    }
  }
}
