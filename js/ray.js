class Ray 
{
    constructor(map, mapWidth, mapHeight, incrementAngle, x)
    {
        this.x              = x;
        this.map            = map;
        this.mapWidth       = mapWidth;
        this.mapHeight      = mapHeight;
        this.angle          = incrementAngle;
        this.incrementAngle = incrementAngle;
        this.distanceWall   = 0;

        this.wallHitX       = 0;
        this.wallHitY       = 0;

        this.wallHitXHor    = 0;
        this.wallHitYHor    = 0;

        this.wallHitXVer    = 0;
        this.wallHitYVer    = 0;

        this.texturePixel   = 0;

        this.textureID      = 0;
    }

    casting(playerX, playerY, playerAngle, tamTile)
    {
        let exitWhile = false;

        this.angle = normalizeAngle(playerAngle+this.incrementAngle);

        let down = false;
        let left = false;

        if (this.angle < Math.PI)  down = true;
        if (this.angle > Math.PI/2 && this.angle < 3*Math.PI/2) left = true;

        this.distanceWall = 0;
        let xStep = 0;
        let yStep = 0;

        /// COLISION HORIZONTAL-----------------------------------------------
        let yIntercept = Math.floor(playerY / tamTile) * tamTile;

        if (down) yIntercept += tamTile;

        let xIntercept = playerX + (yIntercept-playerY) / Math.tan(this.angle);

        yStep = (!down) ? -tamTile : tamTile;
        xStep = tamTile / Math.tan(this.angle);

        if ((left && xStep > 0) || (!left && xStep < 0)) xStep = -xStep;

        let Cx = xIntercept; 
        let Cy = yIntercept;

        if (!down)
            Cy--;

        let wallHitHor = false;

        while (!wallHitHor && !exitWhile)
        {
            let Dx = parseInt(Cx/tamTile);
            let Dy = parseInt(Cy/tamTile);
            if (Dx < 0 || Dx >= this.mapWidth || Dy < 0 || Dy >= this.mapHeight)
            {
                exitWhile = true;
                continue;
            }
            if (getIdTile(Dx, Dy, this.mapWidth) > -1)
            {
                wallHitHor = true;
                this.wallHitXHor = Cx;
                this.wallHitYHor = Cy;
            }
            else
            {
                Cx += xStep;
                Cy += yStep;
            }
        }

        /// COLISION VERTICAL-----------------------------------------------
        xIntercept = Math.floor(playerX / tamTile) * tamTile;

        if (!left) xIntercept += tamTile;

        yIntercept = playerY + (xIntercept-playerX) * Math.tan(this.angle);

        xStep = (left) ? -tamTile : tamTile;
        yStep = tamTile * Math.tan(this.angle);

        if ((!down && yStep > 0) || (down && yStep < 0)) yStep = -yStep;

        Cx = xIntercept; 
        Cy = yIntercept;

        if (left)
            Cx--;

        let wallHitVer = false;
        exitWhile = false;

        while (!wallHitVer && !exitWhile)
        {
            let Dx = parseInt(Cx/tamTile);
            let Dy = parseInt(Cy/tamTile);
            if (Dx < 0 || Dx >= this.mapWidth || Dy < 0 || Dy >= this.mapHeight)
            {
                exitWhile = true;
                continue;
            }
            if (getIdTile(Dx, Dy, this.mapWidth) > -1)
            {
                wallHitVer = true;
                this.wallHitXVer = Cx;
                this.wallHitYVer = Cy;
            }
            else
            {
                Cx += xStep;
                Cy += yStep;
            }
        }

        let distanceHor = Number.MAX_VALUE;
        let distanceVer = Number.MAX_VALUE;

        if (wallHitHor) 
            distanceHor = getDistancePoint(playerX, playerY, this.wallHitXHor, this.wallHitYHor);
        if (wallHitVer)
            distanceVer = getDistancePoint(playerX, playerY, this.wallHitXVer, this.wallHitYVer);

        if (distanceHor < distanceVer)
        {
            this.wallHitX = this.wallHitXHor;
            this.wallHitY = this.wallHitYHor;
            this.distanceWall = distanceHor;

            var cell = parseInt(this.wallHitX/tamTile);
            this.texturePixel = this.wallHitX - (cell * tamTile) ;
        }
        else
        {
            this.wallHitX = this.wallHitXVer;
            this.wallHitY = this.wallHitYVer;
            this.distanceWall = distanceVer;

            var cell = parseInt(this.wallHitY/tamTile);
            this.texturePixel = this.wallHitY - (cell * tamTile);
        }

        let Dx = parseInt(this.wallHitX/tamTile);
        let Dy = parseInt(this.wallHitY/tamTile);

        this.textureID = getIdTile(Dx, Dy, this.mapWidth);

    }

    draw(viewPoint, playerA)
    {
        let distanceWall = this.distanceWall * Math.cos(playerA - this.angle);
        let distancePJ = (screenWidth)/Math.tan(FOV/2);
        let wallHeight = (tamTile/distanceWall) * (distancePJ);

        let ceiling = parseInt(screenHeight/2) - parseInt(wallHeight/4)   -   viewPoint;
        let floor =  screenHeight - ceiling*2                             -   viewPoint*2;

        ctx.globalAlpha = 1 / ( (distanceWall) * 0.01 );

        var textureHeight = 32;
2
        ctx.drawImage(
            tiles,
            this.texturePixel + 32,
            0,
            1,
            32,
            this.x * pixelWidth,
            ceiling,
            pixelWidth,
            floor
        );

        ctx.globalAlpha = 1;
    }

    drawTracing(playerX, playerY)
    {
        ctx.beginPath();
        ctx.strokeStyle = '#FF0000';
        ctx.moveTo(playerX, playerY);
        ctx.lineTo(this.wallHitX/tamTile * tamTileShow, this.wallHitY/tamTile * tamTileShow);
        ctx.stroke();
    }
}