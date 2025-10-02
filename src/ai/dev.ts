import { config } from 'dotenv';
config();

import '@/ai/flows/ai-disease-prediction.ts';
import '@/ai/flows/generate-health-calendar.ts';
import '@/ai/tools/outbreak-tools.ts';
