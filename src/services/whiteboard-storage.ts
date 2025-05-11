
import { Stroke } from "@/types/whiteboard";
import { useToast } from "@/hooks/use-toast";

export class WhiteboardStorageService {
  // Save strokes to local storage
  static saveStrokesToLocalStorage(strokes: Stroke[], page: number): void {
    try {
      localStorage.setItem(`whiteboard_strokes_page_${page}`, JSON.stringify(strokes));
    } catch (error) {
      console.error("Failed to save strokes to local storage:", error);
    }
  }

  // Load strokes from local storage
  static loadStrokesFromLocalStorage(page: number): Stroke[] {
    try {
      const savedStrokes = localStorage.getItem(`whiteboard_strokes_page_${page}`);
      if (savedStrokes) {
        return JSON.parse(savedStrokes) as Stroke[];
      }
    } catch (error) {
      console.error("Failed to parse saved strokes:", error);
    }
    return [];
  }

  // Save a stroke to Puter DB
  static async saveStrokeToPuter(
    stroke: Stroke, 
    puter: any, 
    syncErrorShown: React.MutableRefObject<boolean>,
    toast: ReturnType<typeof useToast>["toast"]
  ): Promise<boolean> {
    if (!puter?.db) return false;

    try {
      const strokesTable = puter.db.table('whiteboard_strokes');
      await strokesTable.insert(stroke);
      return true;
    } catch (error) {
      console.error("Failed to save stroke to Puter DB:", error);
      
      // Show error toast if not shown already
      if (!syncErrorShown.current) {
        toast({
          title: "Local mode active",
          description: "Your drawings are saved locally only.",
          variant: "default"
        });
        syncErrorShown.current = true;
      }
      
      return false;
    }
  }

  // Clear strokes from Puter DB
  static async clearStrokesFromPuter(page: number, puter: any): Promise<boolean> {
    if (!puter?.db) return false;
    
    try {
      const strokesTable = puter.db.table('whiteboard_strokes');
      await strokesTable.where('page', '==', page).delete();
      return true;
    } catch (error) {
      console.error("Failed to clear board from Puter DB:", error);
      return false;
    }
  }

  // Load strokes from Puter DB
  static async loadStrokesFromPuter(page: number, puter: any): Promise<Stroke[] | null> {
    if (!puter?.db) return null;
    
    try {
      const strokesTable = puter.db.table('whiteboard_strokes');
      return await strokesTable.where('page', '==', page).get();
    } catch (error) {
      console.error("Failed to load strokes from Puter DB:", error);
      return null;
    }
  }
}
