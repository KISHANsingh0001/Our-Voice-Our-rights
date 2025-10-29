import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get('lat');
  const lon = request.nextUrl.searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
      { headers: { 'User-Agent': 'Our-Voice-Our-Rights-App' } }
    );
    const data = await response.json();
    const address = data.address || {};
    
    return NextResponse.json({
      district: address.state_district || address.district || address.county || address.city,
      city: address.city,
      state: address.state,
      address: address,
      // Priority order for matching
      searchTerms: [
        address.state_district,
        address.district,
        address.city,
        address.county,
        address.state
      ].filter(Boolean)
    });
  } catch (error) {
    console.error('Geolocation error:', error);
    return NextResponse.json({ error: 'Failed to get location' }, { status: 500 });
  }
}