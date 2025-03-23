
import React from "react";
import SavedLines from "./SavedLines";
import { NumberSelectionType } from "./types";

interface SavedLinesSectionProps {
  savedLines: NumberSelectionType[];
  onRemoveLine: (index: number) => void;
  onEditLine: (index: number) => void;
  extraPlayName: string;
}

const SavedLinesSection: React.FC<SavedLinesSectionProps> = ({
  savedLines,
  onRemoveLine,
  onEditLine,
  extraPlayName
}) => {
  return (
    <div className="bg-gray-50 p-4">
      <h3 className="font-semibold mb-3">Minhas Linhas</h3>
      
      <SavedLines 
        savedLines={savedLines} 
        onRemoveLine={onRemoveLine}
        onEditLine={onEditLine}
      />
    </div>
  );
};

export default SavedLinesSection;
