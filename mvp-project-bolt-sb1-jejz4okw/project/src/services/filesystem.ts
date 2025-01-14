import { getDB } from './db';

interface ProjectFiles {
  metadata: any;
  conversations: any[];
  tasks: any[];
  artifacts: any[];
}

export async function createProjectFolder(projectId: string, files: ProjectFiles) {
  try {
    const db = await getDB();
    
    // Store project files in IndexedDB
    await db.put('project_files', {
      id: projectId,
      ...files,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    console.log(`Project files stored for: ${projectId}`);
    return true;
  } catch (error) {
    console.error('Error storing project files:', error);
    throw error;
  }
}