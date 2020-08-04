class Player
{
    constructor(x, y, angle)
    {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.viewPointVertical = 0;

        // limits
        this.limitCrounch = 100;
        this.limitCenter = 0;
        this.limitFly    = -100;
        this.limitAll = 100;

        // speeds of changes
        this.speedChangeViewPoint = 4;
        this.speedRotation        = 1.5 * (Math.PI / 180);
        this.speedMove            = 0.04 * tamTile;

        // diccinary of limits

        this.rays = new Array(Number);

        // Init rays
        for (let i = 0; i < numRays; ++i)
        {
            this.rays[i] = new Ray(map, mapWidth, mapHeight, (-FOV/2) + (i/numRays)*FOV, i);
        }
    }

    update()
    {
        // Update view point
        let multiplierLimit = Key.isDown(KEY_ROT_DOWN) - Key.isDown(KEY_ROT_UP);

        this.viewPointVertical = approach(this.viewPointVertical, this.limitAll * multiplierLimit, this.speedChangeViewPoint);

        // Rotate Player
        let multiplierPlayerRot = Key.isDown(KEY_ROT_RIGHT) - Key.isDown(KEY_ROT_LEFT);
        this.angle += multiplierPlayerRot * this.speedRotation;

        // Move Player
        let multiplierPlayerMoveForward = Key.isDown(KEY_MOV_DOWN) - Key.isDown(KEY_MOV_UP);
        let multiplierPlayerMoveSideways = Key.isDown(KEY_MOV_RIGHT) - Key.isDown(KEY_MOV_LEFT);

        let nextPlayerX = -(Math.cos(this.angle) * this.speedMove) * multiplierPlayerMoveForward;
        let nextPlayerY = -(Math.sin(this.angle) * this.speedMove) * multiplierPlayerMoveForward;

        let nextPlayerXSideways = -(Math.cos(this.angle - (Math.PI/2)) * this.speedMove) * multiplierPlayerMoveSideways;
        let nextPlayerYSideways = -(Math.sin(this.angle - (Math.PI/2)) * this.speedMove) * multiplierPlayerMoveSideways;

        // Aliases
        let nx = Math.floor((this.x + nextPlayerX) / tamTile);
        let ny = Math.floor((this.y + nextPlayerY) / tamTile);
        let nxsw = Math.floor((this.x + nextPlayerXSideways) / tamTile);
        let nysw = Math.floor((this.y + nextPlayerYSideways) / tamTile);

        // Collision
        /*if (getIdTile(nx, Math.floor(this.y/tamTile), mapWidth)  > -1) nextPlayerX = 0;
        if (getIdTile(Math.floor(this.x/tamTile), ny,  mapWidth) > -1) nextPlayerY = 0;
        if (getIdTile(nxsw, Math.floor(this.y/tamTile),  mapWidth) > -1) nextPlayerXSideways = 0;
        if (getIdTile(Math.floor(this.x/tamTile), nysw,  mapWidth) > -1) nextPlayerYSideways = 0;*/

        this.x += nextPlayerX + nextPlayerXSideways;
        this.y += nextPlayerY + nextPlayerYSideways;

        // Normalize Angle
        this.angle = normalizeAngle(this.angle);

        // Update rays
        for (let i = 0; i < numRays; ++i)
        {
            this.rays[i].casting(this.x, this.y, this.angle, tamTile);
        }
    }

    draw()
    {
        // Draw all
        ctx.fillStyle = COLOR_BACK;
        ctx.fillRect(0, 0, screenWidth, screenHeight);

        if (Key.isReleased(VK_Q)) showMap = !showMap;
        
        if (showMap)
        {
            // Ray Casting
            for (let i = 0; i < numRays; i++)
                this.rays[i].draw(this.viewPointVertical, this.angle);

            // Draw Map
            for (let y = 0; y < mapHeight; y++)
            {
                for (let x = 0; x < mapWidth; x++)
                {
                    if (getIdTile(x, y, mapWidth) > -1)   ctx.fillStyle = COLOR_MAP;
                    else                                  ctx.fillStyle = COLOR_BACK_MAP;

                    ctx.fillRect(x * tamTileShow, y * tamTileShow, tamTileShow, tamTileShow);
                }   
            }

            // Draw Player
            let xRepair = this.x/tamTile * tamTileShow;
            let yRepair = this.y/tamTile * tamTileShow;

            ctx.fillStyle = COLOR_PLAYER;
            ctx.fillRect(xRepair - 3, yRepair - 3, 6, 6);

            // Ray Casting
            for (let i = 0; i < numRays; i++)
                this.rays[i].drawTracing(xRepair, yRepair);
                

            // Draw Direction
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.strokeStyle = COLOR_PLAYER;
            ctx.moveTo(xRepair, yRepair);
            ctx.lineTo(xRepair+ Math.cos(this.angle) * 40, yRepair + Math.sin(this.angle) * 40);
            ctx.stroke();
            ctx.lineWidth = 1;
        }
        else
        {
            // Ray Casting
            for (let i = 0; i < numRays; i++)
                this.rays[i].draw(this.viewPointVertical, this.angle);
        }
    }
}