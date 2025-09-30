

'use client';

import { useParams } from 'next/navigation';
import { learningModules } from '@/lib/learning-modules-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Radio } from 'lucide-react';
import Link from 'next/link';

export default function ModuleSyllabusPage() {
  const params = useParams();
  const { moduleId } = params;
  
  const module = learningModules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Module not found</h2>
        <p className="text-muted-foreground">The learning module you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link href="/learning-modules">Back to Learning</Link>
        </Button>
      </div>
    );
  }
  
  const totalPoints = module.syllabus.reduce((sum, item) => sum + item.points, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/learning-modules">← Back to all modules</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{module.title}</CardTitle>
          <CardDescription className="text-lg">{module.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-6 bg-accent/20 border border-accent p-4 rounded-lg flex items-center justify-between">
                <h3 className="font-semibold text-lg text-accent-foreground">Total Points for this course:</h3>
                <span className="text-2xl font-bold text-accent-foreground">{totalPoints}</span>
            </div>

            <div className="space-y-4">
                {module.syllabus.map((item, index) => (
                    <Card key={index} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                            <Radio className="h-6 w-6 text-muted-foreground" />
                            <div>
                                <h4 className="font-medium">{item.topic}</h4>
                                <p className="text-sm text-muted-foreground">{item.points} points</p>
                            </div>
                        </div>
                        <Button variant="secondary" disabled>Start Lesson</Button>
                    </Card>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                 <Button size="lg" disabled>
                    <CheckCircle className="mr-2" />
                    Complete Course & Claim Points
                 </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

