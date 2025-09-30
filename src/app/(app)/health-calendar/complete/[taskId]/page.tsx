
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { CalendarTask } from '@/app/(app)/health-calendar/health-calendar-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileImage, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export default function CompleteTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { taskId } = params;

  const [task, setTask] = useState<CalendarTask | null>(null);
  const [completionPhoto, setCompletionPhoto] = useState<string | undefined>();
  const [completionDescription, setCompletionDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const storageKey = `health-calendar-${user?.uid}`;

  useEffect(() => {
    if (!taskId || !user) return;
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const calendarData: CalendarTask[] = JSON.parse(savedData);
        const foundTask = calendarData.find(t => t.id === taskId);
        if (foundTask) {
          setTask(foundTask);
          if (foundTask.status === 'done') {
            setCompletionDescription(foundTask.completionDetails?.description || '');
            setCompletionPhoto(foundTask.completionDetails?.photo);
          }
        } else {
          setError('Task not found.');
        }
      }
    } catch (e) {
      setError('Failed to load calendar data.');
    }
  }, [taskId, user, storageKey]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      const base64 = await toBase64(file);
      setCompletionPhoto(base64);
    } else {
      setFileName('');
      setCompletionPhoto(undefined);
    }
  };

  const handleSubmit = () => {
    if (!task) return;

    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        let calendarData: CalendarTask[] = JSON.parse(savedData);
        const taskIndex = calendarData.findIndex(t => t.id === task.id);

        if (taskIndex !== -1) {
          calendarData[taskIndex] = {
            ...calendarData[taskIndex],
            status: 'done',
            completionDetails: {
              photo: completionPhoto,
              description: completionDescription,
            },
          };
          localStorage.setItem(storageKey, JSON.stringify(calendarData));
          setSuccess(true);
          setTimeout(() => router.push('/health-calendar'), 2000);
        } else {
          setError('Task not found in storage. Could not save.');
        }
      }
    } catch (e) {
      setError('Failed to save completion details.');
    }
  };

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>An Error Occurred</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => router.push('/health-calendar')} className="mt-4">
            Back to Calendar
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!task) {
    return <div>Loading task...</div>;
  }
  
  if (success) {
      return (
         <Card className="max-w-xl mx-auto">
            <CardContent className="pt-6">
                 <Alert variant="default" className="border-green-500 text-green-700">
                    <CheckCircle className="h-4 w-4 text-green-700" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                        Task marked as complete. Redirecting you back to the calendar...
                    </AlertDescription>
                </Alert>
            </CardContent>
         </Card>
      )
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Task</CardTitle>
        <CardDescription>
          Provide verification details for completing the task: <span className="font-bold">{task.task}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Upload Photo (Optional)</Label>
          <div className="relative">
            <Input
              id="picture"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
              disabled={task.status === 'done'}
            />
            <div className="flex items-center justify-center w-full h-12 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background">
              <FileImage className="w-4 h-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">
                {fileName || (completionPhoto ? 'Photo uploaded' : 'Click to select an image')}
              </span>
            </div>
          </div>
          {completionPhoto && <img src={completionPhoto} alt="Completion preview" className="mt-2 rounded-md max-h-48" />}
          <p className="text-xs text-muted-foreground">Upload a photo as proof of completion.</p>
        </div>

        <div className="space-y-2">
          <Label>Description (Optional)</Label>
          <Textarea
            placeholder="Add any notes or comments about the task..."
            value={completionDescription}
            onChange={(e) => setCompletionDescription(e.target.value)}
            className="min-h-24"
            disabled={task.status === 'done'}
          />
        </div>
        {task.status === 'done' && (
             <Alert>
                <AlertTitle>Task Already Completed</AlertTitle>
                <AlertDescription>This task has already been marked as complete. You can view the details you provided.</AlertDescription>
            </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.push('/health-calendar')}>
          Back to Calendar
        </Button>
        {task.status !== 'done' && (
            <Button onClick={handleSubmit}>Confirm Completion</Button>
        )}
      </CardFooter>
    </Card>
  );
}
