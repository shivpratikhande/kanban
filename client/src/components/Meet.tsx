import { Button } from './ui/button';
import { Video, Calendar } from 'lucide-react';
import React from 'react';

function Meet({ clickedMeet }: { clickedMeet: boolean }) {
  const handleScheduleMeet = () => {
    console.log('Schedule Meet clicked');
    // Add logic to open schedule modal or form
  };

  const handleInstantMeet = () => {
    console.log('Instant Meet clicked');
    window.open('https://meet.google.com/new', '_blank');
  };

  if (!clickedMeet) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-5 w-[300px]">
        <h2 className="text-lg font-semibold mb-4 text-center">Start a Meeting</h2>
        <div className="flex flex-col gap-3">
          <Button 
            className="flex items-center justify-start gap-2 w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-700"
            onClick={handleInstantMeet}
            variant="ghost"
          >
            <Video className="h-4 w-4" />
            <span>Instant Google Meet</span>
          </Button>

          <Button 
            className="flex items-center justify-start gap-2 w-full text-left bg-green-50 hover:bg-green-100 text-green-700"
            onClick={handleScheduleMeet}
            variant="ghost"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule for later</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Meet;
