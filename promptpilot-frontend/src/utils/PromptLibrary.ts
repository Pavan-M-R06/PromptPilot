// src/utils/promptLibrary.ts
export interface SavedPrompt {
    id: string;
    name: string;
    originalPrompt: string;
    generatedPrompt: string;
    mode: string;
    createdAt: Date;
    category?: string;
  }
  
  export interface PromptLibrary {
    [category: string]: SavedPrompt[];
  }
  
  const STORAGE_KEY_PREFIX = 'promptpilot_library_';
  
  // Get current user's storage key
  const getUserStorageKey = (): string => {
    // Prefer a stable user identifier. Try an explicit stored email first.
    const userEmail = localStorage.getItem('promptpilot_user_email');
    if (userEmail) return STORAGE_KEY_PREFIX + userEmail;
  
    // Fallback to token-based hash (older behavior)
    const token = localStorage.getItem('authToken');
    if (!token) {
      // If no token or email is available, return a generic key so operations
      // don't throw, but keep data isolated per-browser/profile where possible.
      return STORAGE_KEY_PREFIX + 'anonymous';
    }
  
    // Create a simple hash from the token for user identification
    let hash = 0;
    for (let i = 0; i < token.length; i++) {
      const char = token.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
  
    return STORAGE_KEY_PREFIX + Math.abs(hash).toString();
  };
  
  // Get user's prompt library from localStorage
  export const getPromptLibrary = (): PromptLibrary => {
    try {
      const storageKey = getUserStorageKey();
      const stored = localStorage.getItem(storageKey);
      if (!stored) return {};
      const parsed = JSON.parse(stored);
      // Convert createdAt back to Date objects
      const asLibrary = parsed as PromptLibrary;
      Object.values(asLibrary).forEach((arr) => {
        arr.forEach((p: any) => {
          if (p.createdAt && typeof p.createdAt === 'string') {
            p.createdAt = new Date(p.createdAt);
          }
        });
      });
      return asLibrary;
    } catch (error) {
      // If user is not authenticated or other error, return empty library
      console.error('Error loading prompt library:', error);
      return {};
    }
  };
  
  // Save prompt to library with custom name and category
  export const savePromptToLibrary = (
    name: string,
    originalPrompt: string,
    generatedPrompt: string,
    mode: string,
    category: string = 'General'
  ): SavedPrompt => {
    try {
      const library = getPromptLibrary();
    
    const newPrompt: SavedPrompt = {
      id: generateId(),
      name,
      originalPrompt,
      generatedPrompt,
      mode,
      createdAt: new Date(),
      category
    };
  
    if (!library[category]) {
      library[category] = [];
    }
  
    library[category].push(newPrompt);
      const storageKey = getUserStorageKey();
      // Serialize dates as ISO strings
      const serializable: any = {};
      Object.entries(library).forEach(([cat, arr]) => {
        serializable[cat] = arr.map(p => ({ ...p, createdAt: (p.createdAt as Date).toISOString() }));
      });
      localStorage.setItem(storageKey, JSON.stringify(serializable));
      
      return newPrompt;
    } catch (error) {
      console.error('Error saving prompt to library:', error);
      throw error;
    }
  };
  
  // Get prompts from a specific category
  export const getPromptsFromCategory = (category: string): SavedPrompt[] => {
    const library = getPromptLibrary();
    return library[category] || [];
  };
  
  // Get all categories
  export const getCategories = (): string[] => {
    const library = getPromptLibrary();
    return Object.keys(library);
  };
  
  // Delete a prompt
  export const deletePrompt = (promptId: string, category: string): void => {
    const library = getPromptLibrary();
    if (library[category]) {
      library[category] = library[category].filter(prompt => prompt.id !== promptId);
      if (library[category].length === 0) {
        delete library[category];
      }
      const storageKey = getUserStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(library));
    }
  };
  
  // Generate unique ID
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  
  // Search prompts across all categories
  export const searchPrompts = (query: string): SavedPrompt[] => {
    const library = getPromptLibrary();
    const results: SavedPrompt[] = [];
    
    Object.values(library).forEach(categoryPrompts => {
      categoryPrompts.forEach(prompt => {
        if (
          prompt.name.toLowerCase().includes(query.toLowerCase()) ||
          prompt.originalPrompt.toLowerCase().includes(query.toLowerCase()) ||
          prompt.generatedPrompt.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push(prompt);
        }
      });
    });
    
    return results;
  };
  
  // Replace entire prompt library (used when syncing from server)
  export const setPromptLibrary = (library: PromptLibrary): void => {
    try {
      const storageKey = getUserStorageKey();
      const serializable: any = {};
      Object.entries(library).forEach(([cat, arr]) => {
        serializable[cat] = arr.map(p => ({ ...p, createdAt: (p.createdAt as Date).toISOString() }));
      });
      localStorage.setItem(storageKey, JSON.stringify(serializable));
    } catch (e) {
      console.error('Error setting prompt library:', e);
    }
  };
  
  // Get a flat array of all prompts across categories
  export const getAllPrompts = (): SavedPrompt[] => {
    const library = getPromptLibrary();
    const results: SavedPrompt[] = [];
    Object.values(library).forEach(arr => {
      arr.forEach(p => results.push(p));
    });
    return results;
  };