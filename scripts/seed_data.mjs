// Seeding Script for Supabase Questions
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ''
);

async function seed() {
  try {
    const dataPath = join(process.cwd(), 'scripts', 'questions.json');
    const SEED_DATA = JSON.parse(readFileSync(dataPath, 'utf8'));

    console.log("Starting master seed process...");
    
    for (const cat of SEED_DATA) {
      console.log(`Processing category: ${cat.category}...`);
      
      const { data: category, error: catError } = await supabase
        .from('categories')
        .upsert({ name: cat.category, slug: cat.slug })
        .select()
        .single();

      if (catError) {
         console.error(`Error creating category ${cat.category}:`, catError);
         continue;
      }

      const questionEntries = cat.questions.map(q => ({
        question: q.question,
        options: q.options,
        correct_answer: q.correct_answer,
        category_id: category.id
      }));

      const { data: inserted, error: qError } = await supabase
        .from('questions')
        .insert(questionEntries)
        .select();

      if (qError) {
        console.error(`Error inserting questions for ${cat.category}:`, qError);
      } else {
        console.log(`Successfully seeded ${cat.category} with ${inserted.length} questions`);
      }
    }
    
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Critical error during seeding:", err);
  }
}

seed();
