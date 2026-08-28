import { Discipline, TrackLevel } from '@/features/academy/types/models';
type TrackType = Discipline['tracks'][number];

/**
 * Resolves the level that should be shown by default for a track:
 * 1. The level explicitly flagged `isDefault`
 * 2. Otherwise, the first level in the array
 *
 * `track.levels` is guaranteed non-empty by TrackSchema (`.min(1)`),
 * so this always returns a valid TrackLevelData.
 */
export function getDefaultLevel(track: TrackType): TrackLevel {
    return track.levels.find((level) => level.isDefault) ?? track.levels[0];
}

export function hasMultipleLevels(track: TrackType): boolean {
    return track.levels.length > 1;
}

export function getLevelById(track: TrackType, levelId: string): TrackLevel {
    return track.levels.find((level) => level.id === levelId) ?? getDefaultLevel(track);
}

/**
 * Produces a human-readable summary of a track's levels for card/list UIs:
 * - Single level  -> the level's own name (e.g. "Comprehensive")
 * - Multiple levels -> level names joined (e.g. "Basic • Intermediate • Advanced")
 */
export function getLevelSummaryLabel(track: TrackType): string {
    if (!hasMultipleLevels(track)) {
        return getDefaultLevel(track).name;
    }
    return track.levels.map((level) => level.name).join(' • ');
}