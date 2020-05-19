class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static zero() {
        return new Vector2(0, 0);
    }
    scale(k) {
        this.x *= k;
        this.y *= k;
    }
    rotate(angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        this.x = Math.round(16384 * (this.x * cos - this.y * sin)) / 16384;
        this.y = Math.round(16384 * (this.x * sin + this.y * cos)) / 16384;
    }
    rotateAround(vector2, angle) {
        this.substract(vector2);
        this.rotate(angle);
        this.add(vector2);
    }
    add(vector2) {
        this.x += vector2.x;
        this.y += vector2.y;
    }
    substract(vector2) {
        this.add(vector2.scale(-1));
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    distanceFrom(vector2) {
        return this.substract(vector2).length();
    }
}

module.exports = Vector2;