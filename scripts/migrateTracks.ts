import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.error("Missing required Sanity environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrate() {
  console.log("Fetching all disciplines...");
  const disciplines = await client.fetch(`*[_type == "discipline"]`);
  
  if (disciplines.length === 0) {
    console.log("No disciplines found.");
    return;
  }

  let migratedCount = 0;

  for (const doc of disciplines) {
    if (!doc.tracks || !Array.isArray(doc.tracks)) continue;

    console.log(`\nProcessing Discipline: "${doc.title}" (${doc._id})`);
    
    let needsUpdate = false;
    const newTracksArray = [];

    for (const track of doc.tracks) {
      // Check if it's already a reference
      if (track._type === 'reference' || track._ref) {
         console.log(`  [Skip] Track is already a reference.`);
         newTracksArray.push(track);
         continue;
      }

      console.log(`  [Migrating] Extracting track: "${track.title}"...`);

      // Create a new track document
      const newTrackDoc = {
        _type: 'track',
        title: track.title,
        slug: track.slug,
        subtitle: track.subtitle,
        heroDesc: track.heroDesc,
        popular: track.popular || false,
        upcoming: track.upcoming || false,
        levels: track.levels || [],
        disciplineRef: {
          _type: 'reference',
          _ref: doc._id,
        }
      };

      try {
        const createdTrack = await client.create(newTrackDoc);
        console.log(`    -> Created new track document: ${createdTrack._id}`);
        
        // Push the reference back to the array, preserving the original _key
        newTracksArray.push({
          _key: track._key,
          _type: 'reference',
          _ref: createdTrack._id,
        });
        
        needsUpdate = true;
        migratedCount++;
      } catch (err: any) {
        console.error(`    -> ERROR creating track "${track.title}":`, err.message);
      }
    }

    if (needsUpdate) {
      console.log(`  [Patching] Saving new references to Discipline "${doc.title}"...`);
      try {
        await client.patch(doc._id).set({ tracks: newTracksArray }).commit();
        console.log(`  [Success] Discipline updated.`);
      } catch (err: any) {
        console.error(`  [ERROR] Failed to patch Discipline:`, err.message);
      }
    }
  }

  console.log(`\nMigration complete! Successfully migrated ${migratedCount} tracks into standalone documents.`);
}

migrate().catch(console.error);
