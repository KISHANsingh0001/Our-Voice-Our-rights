// src/app/api/cache/clear/route.ts
import { NextResponse } from 'next/server';
import { redisService } from '@/services/redis';
import { DistrictPerformance } from '@/models/DistrictPerformance';

export async function POST(request: Request) {
  try {
    const { district_name, state_name } = await request.json();

    if (district_name && state_name) {
      // Clear specific district
      const key = `district:${district_name}:${state_name}`.toLowerCase();
      await redisService.del(key);
      await DistrictPerformance.deleteMany({ district_name, state_name });
      return NextResponse.json({ message: 'Cache cleared for specific district' });
    }

    // Clear all
    await redisService.clear('district:*');
    await DistrictPerformance.deleteMany({});
    return NextResponse.json({ message: 'All caches cleared' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear cache' }, { status: 500 });
  }
}