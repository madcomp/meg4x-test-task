import { Vec3 } from 'cc';

export class Utils {

    static capitalizeFirstLetter(text: string): string {
        if (!text)
        {
            return text;
        }
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    static getValue<TKey, TValue>(map: Map<TKey, TValue>, key: TKey): TValue | null {
        if (map.has(key))
        {
            return map.get(key)!;
        }
        return null;
    }

    static objectToVec3(obj: { x: number, y: number }): Vec3 {
        return new Vec3(obj.x, obj.y, 0);
    }
}