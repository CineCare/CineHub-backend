import { BadRequestException } from '@nestjs/common';

export function gpsDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): string {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return (Math.round(d * 100) / 100).toFixed(3);
}

export function castPositionParam(value: string): { lat: number; lon: number } {
  const cast = value.split(',');
  if (cast.length !== 2 || isNaN(+cast[0]) || isNaN(+cast[1])) {
    throw new BadRequestException('Invalid gps coordinates');
  }
  return { lat: +cast[0], lon: +cast[1] };
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
