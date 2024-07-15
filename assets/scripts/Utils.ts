import { Vec3 } from 'cc';

export class Utils {
    static objectToVec3(obj: { x: number, y: number }): Vec3 {
        return new Vec3(obj.x, obj.y, 0);
    }
}