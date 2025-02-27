
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaPrint, FaFolderOpen, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Druckstation() {
  const [inputValue, setInputValue] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [selectedPaperSize, setSelectedPaperSize] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  
  const folderOptions = ["100g", "250g", "500g", "1000g", "500ml", "1000ml", "50ml", "5g", "5ml"];
  const printerOptions = ["Drucker 1", "Drucker 2", "Drucker 3"];
  const paperSizeOptions = ["A4", "A5", "Letter", "Legal"];

  const handleFolderSelection = (folder) => {
    setSelectedFolder(folder);
  };

  const handlePrint = () => {
    if (!selectedFolder || !inputValue || !selectedPrinter || !selectedPaperSize) return;
    alert(`Drucke Datei: ${inputValue}.pdf aus ${selectedFolder} auf ${selectedPrinter} mit Papierformat ${selectedPaperSize}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Druckstation</h1>
      <div className="flex gap-2 mb-4 flex-wrap justify-center">
        {folderOptions.map((folder) => (
          <Button 
            key={folder} 
            onClick={() => handleFolderSelection(folder)} 
            className={\`\${selectedFolder === folder ? "bg-green-500" : "bg-blue-500"} text-white px-4 py-2 rounded-md\`}
          >
            {folder}
          </Button>
        ))}
      </div>
      
      <Input 
        type="text" 
        placeholder="Nummer eingeben..." 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        onKeyDown={(e) => e.key === "Enter" && handlePrint()} 
        className="mb-4 p-2 border rounded w-full" 
      />
      
      <Button onClick={handlePrint} className="bg-green-500 text-white w-full py-2 flex items-center justify-center gap-2">
        <FaPrint /> Drucken
      </Button>

      <Button onClick={() => setShowSettings(!showSettings)} className="mt-4 bg-gray-500 text-white w-full py-2 flex items-center justify-center gap-2">
        <FaCog /> Einstellungen
      </Button>
      {showSettings && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-4 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Druckereinstellungen</h3>
          <select className="w-full p-2 border rounded-md" value={selectedPrinter} onChange={(e) => setSelectedPrinter(e.target.value)}>
            <option value="">Drucker auswählen</option>
            {printerOptions.map((printer) => (
              <option key={printer} value={printer}>{printer}</option>
            ))}
          </select>
          <h3 className="text-lg font-semibold mt-4 mb-2">Papierformat wählen</h3>
          <select className="w-full p-2 border rounded-md" value={selectedPaperSize} onChange={(e) => setSelectedPaperSize(e.target.value)}>
            <option value="">Papierformat auswählen</option>
            {paperSizeOptions.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </motion.div>
      )}
      <div className="mt-6 text-sm text-gray-600">Parfumfabrik Version 1.0 - Made with ❤️</div>
    </div>
  );
}
