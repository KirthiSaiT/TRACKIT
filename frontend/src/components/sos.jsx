import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,     
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Sos = ({ onEmergencyAlert, isEmergency }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSosClick = () => {
    if (!isEmergency) {
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    onEmergencyAlert();
    setShowConfirm(false);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <Button
          variant={isEmergency ? "destructive" : "default"}
          size="lg"
          className={`
            relative rounded-full w-20 h-20 
            flex items-center justify-center 
            shadow-lg transition-all duration-300
            ${isEmergency 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-white hover:bg-red-50'
            }
            ${isHovered ? 'scale-110' : 'scale-100'}
            before:content-[''] before:absolute before:inset-0 
            before:rounded-full before:shadow-[0_0_20px_rgba(239,68,68,0.5)]
            before:opacity-0 before:transition-opacity before:duration-500
            ${isEmergency ? 'before:opacity-100 animate-pulse' : ''}
          `}
          onClick={handleSosClick}
          disabled={isEmergency}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col items-center">
            <AlertTriangle className={`w-8 h-8 mb-1 ${isEmergency ? 'text-white' : 'text-red-600'}`} />
            <span className={`text-sm font-bold ${isEmergency ? 'text-white' : 'text-red-600'}`}>
              SOS
            </span>
          </div>
        </Button>
        
        {isEmergency && (
          <div className="animate-fadeIn">
            <span className="bg-red-600 text-white font-semibold px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <span className="animate-pulse">●</span>
              Emergency Alert Active
            </span>
          </div>
        )}
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Confirm Emergency Alert
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              This will send an emergency signal to all connected users. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Send Emergency Alert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Sos;