const calculatorSketch = (p) => {
    let angle = 0;
    let sizeFactor = 0;

    const starShape = (x, y, radius1, radius2, npoints) => {
        const angleStep = p.TWO_PI / npoints;
        const halfAngle = angleStep / 2.0;
        p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += angleStep) {
            const sx = x + p.cos(a) * radius2;
            const sy = y + p.sin(a) * radius2;
            p.vertex(sx, sy);
            const sx2 = x + p.cos(a + halfAngle) * radius1;
            const sy2 = y + p.sin(a + halfAngle) * radius1;
            p.vertex(sx2, sy2);
        }
        p.endShape(p.CLOSE);
    };

    p.setup = () => {
        const container = document.getElementById('calculatorImage');
        const canvas = p.createCanvas(container.clientWidth, container.clientHeight);
        canvas.parent('calculatorImage');
        p.clear();
        sizeFactor = Math.min(p.width, p.height) * 0.4;
    };

    p.windowResized = () => {
        const container = document.getElementById('calculatorImage');
        p.resizeCanvas(container.clientWidth, container.clientHeight);
        sizeFactor = Math.min(p.width, p.height) * 0.4;
    };

    p.draw = () => {
        p.clear();
        p.noFill();

        p.stroke(245, 247, 250, 220);
        p.strokeWeight(3);
        p.push();
        p.translate(p.width * 0.3, p.height * 0.28);
        p.rotate(angle * 0.3);
        starShape(0, 0, sizeFactor * 0.22, sizeFactor * 0.5, 5);
        p.pop();

        p.stroke(245, 247, 250, 200);
        p.strokeWeight(2.5);
        p.push();
        p.translate(p.width * 0.7, p.height * 0.2);
        p.rotate(-angle * 0.25);
        starShape(0, 0, sizeFactor * 0.18, sizeFactor * 0.42, 5);
        p.pop();

        p.stroke(245, 247, 250, 180);
        p.strokeWeight(2);
        p.push();
        p.translate(p.width * 0.62, p.height * 0.72);
        p.rotate(angle * 0.2);
        starShape(0, 0, sizeFactor * 0.16, sizeFactor * 0.38, 5);
        p.pop();

        angle += 0.015;
    };
};

new p5(calculatorSketch);
