

'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookCheck, PlayCircle, WholeWord } from "lucide-react";
import Link from 'next/link';
import { learningModules } from '@/lib/learning-modules-data';

const skills = [
    { icon: BookCheck, name: 'Biosecurity', learners: '1.2M' },
    { icon: WholeWord, name: 'Feed Formulation', learners: '980k' },
    { icon: PlayCircle, name: 'Disease Prev...', learners: '1.5M' },
    { icon: BookCheck, name: 'Farrowing', learners: '750k' },
    { icon: PlayCircle, name: 'Vaccination', learners: '1.8M' },
];


export default function LearningModulesPage() {
  return (
    <div className="space-y-12">
        <div>
            <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {learningModules.map((module, index) => (
                    <Link key={module.id} href={`/learning-modules/${module.id}`}>
                        <Card className="relative overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow h-full">
                            <CardContent className="p-6">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold">{module.title}</h3>
                                    <p className="text-muted-foreground mt-1 mb-4">{module.description}</p>
                                    <div className="font-semibold text-primary group-hover:underline flex items-center">
                                        Start course <ArrowRight className="ml-1 h-4 w-4" />
                                    </div>
                                </div>
                                <div className="absolute -right-4 -bottom-4 z-0">
                                    <span className="text-[10rem] font-bold text-muted/20 leading-none">{index + 1}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
        <div>
            <h2 className="text-2xl font-bold mb-6">Learn the skills that matter most</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {skills.map(skill => (
                    <Card key={skill.name} className="p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer">
                        <div className="bg-primary/10 p-3 rounded-lg mb-2">
                           <skill.icon className="h-6 w-6 text-primary" />
                        </div>
                        <p className="font-semibold text-sm">{skill.name}</p>
                        <p className="text-xs text-muted-foreground">{skill.learners} learners</p>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
