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
        return this;
    }
    rotate(angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        this.x = Math.round(16384 * (this.x * cos - this.y * sin)) / 16384;
        this.y = Math.round(16384 * (this.x * sin + this.y * cos)) / 16384;
        return this;
    }
    rotateAround(vector2, angle) {
        this.substract(vector2);
        this.rotate(angle);
        this.add(vector2);
        return this;
    }
    add(vector2) {
        this.x += vector2.x;
        this.y += vector2.y;
        return this;
    }
    substract(vector2) {
        this.x -= vector2.x;
        this.y -= vector2.y;
        return this;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    distanceFrom(vector2) {
        var dVector = Vector2.zero();
        return dVector.add(this).substract(vector2).length();
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    roundTo(precision) {
        if (precision !== undfined && precision !== 1) {
            this.x = Math.round(this.x / precision) * precision;
            this.y = Math.round(this.y / precision) * precision;
        } else { this.round(); }
        return this;
    }
}

module.exports = Vector2;