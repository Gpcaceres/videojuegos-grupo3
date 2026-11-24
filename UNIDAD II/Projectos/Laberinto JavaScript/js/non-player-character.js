"use strict";
class NonPlayerCharacter {
    constructor() {
        this.mMatrix = []; this.mRow = 0; this.mColumn = 0;
        this.mM = 0; this.mN = 0; this.mDirection = Direction.Up;
        this.mMiliseconds = 100;
    }

    CreateMatrix(r, c) {
this.mMatrix = Array.from({length: r}, () => Array(c).fill(0));
        this.mM = r; this.mN = c;
    }

    InitializeMatrix(a) {

            let i, j;

            for (i = 0; i < this.mM; i++)
            {
                for (j = 0; j < this.mN; j++)
                {
                    this.mMatrix[i][j] = a[i][j];
                }
            }
        
    }

    InitializeRoad() {

            this.mRow = 0; this.mColumn = 0;
        
    }

    LocalizeStart() {

            let i, j;

            for (i = 0; i < this.mM; i++)
            {
                for (j = 0; j < this.mN; j++)
                {
                    if (this.mMatrix[i][j] == 2)
                    {
                        this.mRow = i; this.mColumn = j;
                    }
                }
            }
        
    }

    MoveRightSide(picWalker) {

            picWalker.Left = picWalker.Left + 25;
            this.mColumn++;
        
    }

    MoveLeftSide(picWalker) {

            picWalker.Left = picWalker.Left - 25;
            this.mColumn--;
        
    }

    MoveUpSide(picWalker) {

            picWalker.Top = picWalker.Top - 25;
            this.mRow--;
        
    }

    MoveDownSide(picWalker) {

            picWalker.Top = picWalker.Top + 25;
            this.mRow++;
        
    }

    DetermineStartDirection() {

            if (this.mMatrix[this.mRow][this.mColumn + 1] != 0)
            {
                this.mDirection = Direction.Right;
            }
            if (this.mMatrix[this.mRow][this.mColumn - 1] != 0)
            {
                this.mDirection = Direction.Left;
            }
            if (this.mMatrix[this.mRow - 1][this.mColumn] != 0)
            {
                this.mDirection = Direction.Up;
            }
            if (this.mMatrix[this.mRow + 1][this.mColumn] != 0)
            {
                this.mDirection = Direction.Down;
            }
        
    }

    InitializeRapidMovement(picWalker) {

            this.DetermineStartDirection();

            switch (this.mDirection)
            {
                case Direction.Down:
                    this.MoveDownSide(picWalker);
                    break;
                case Direction.Up:
                    this.MoveUpSide(picWalker);
                    break;
                case Direction.Right:
                    this.MoveRightSide(picWalker);
                    break;
                case Direction.Left:
                    this.MoveLeftSide(picWalker);
                    break;
            }
        
    }

    async InitializePausedMovement(txtDirection, picWalker) {

            this.DetermineStartDirection();

            switch (this.mDirection)
            {
                case Direction.Down:
                    this.MoveDownSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                    txtDirection.Text = this.mDirection.toString();
                    break;
                case Direction.Up:
                    this.MoveUpSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                    txtDirection.Text = this.mDirection.toString();
                    break;
                case Direction.Right:
                    this.MoveRightSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                    txtDirection.Text = this.mDirection.toString();
                    break;
                case Direction.Left:
                    this.MoveLeftSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                    txtDirection.Text = this.mDirection.toString();
                    break;
            }
        
    }

    DetermineFinishDirection(picWalker) {

            if (this.mMatrix[this.mRow][this.mColumn + 1] == 3)
            {
                this.mDirection = Direction.Right;
                this.MoveRightSide(picWalker);
                return true;
            }
            else if (this.mMatrix[this.mRow][this.mColumn - 1] == 3)
            {
                this.mDirection = Direction.Left;
                this.MoveLeftSide(picWalker);
                return true;
            }
            else if (this.mMatrix[this.mRow - 1][this.mColumn] == 3)
            {
                this.mDirection = Direction.Up;
                this.MoveUpSide(picWalker);
                return true;
            }
            else if (this.mMatrix[this.mRow + 1][this.mColumn] == 3)
            {
                this.mDirection = Direction.Down;
                this.MoveDownSide(picWalker);
                return true;
            }
            else
                return false;
        
    }

    ObserveRightSide() {

            if (this.mMatrix[this.mRow][this.mColumn + 1] != 0)
                return true;
            else
                return false;
        
    }

    ObserveLeftSide() {

            if (this.mMatrix[this.mRow][this.mColumn - 1] != 0)
                return true;
            else
                return false;
        
    }

    ObserveUpSide() {

            if (this.mMatrix[this.mRow - 1][this.mColumn] != 0)
                return true;
            else
                return false;
        
    }

    ObserveDownSide() {

            if (this.mMatrix[this.mRow + 1][this.mColumn] != 0)
                return true;
            else
                return false;
        
    }

    RapidMovementWithLeftHandAI(picWalker) {

            if (this.mDirection == Direction.Right)
            {
                if (this.ObserveUpSide() == false && this.ObserveDownSide() == false && this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveDownSide() == true && this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
                else if (this.ObserveUpSide() == true)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveDownSide() == true && this.ObserveRightSide() == false)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveDownSide() == false && this.ObserveRightSide() == false)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
            }
            else if (this.mDirection == Direction.Left)
            {
                if (this.ObserveUpSide() == false && this.ObserveDownSide() == false && this.ObserveLeftSide() == true)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
                else if (this.ObserveUpSide() == true && this.ObserveDownSide() == false && this.ObserveLeftSide() == true)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
                else if (this.ObserveDownSide() == true)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
                else if (this.ObserveUpSide() == true && this.ObserveDownSide() == false && this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveDownSide() == false && this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
            }
            else if (this.mDirection == Direction.Up)
            {
                if (this.ObserveLeftSide() == false && this.ObserveRightSide() == false && this.ObserveUpSide() == true)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
                else if (this.ObserveLeftSide() == false && this.ObserveRightSide() == true && this.ObserveUpSide() == true)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
                else if (this.ObserveLeftSide() == true)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
                else if (this.ObserveLeftSide() == false && this.ObserveUpSide() == false && this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveRightSide() == false && this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
            }
            else if (this.mDirection == Direction.Down)
            {
                if (this.ObserveLeftSide() == false && this.ObserveRightSide() == false && this.ObserveDownSide() == true)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
                else if (this.ObserveLeftSide() == true && this.ObserveRightSide() == false && this.ObserveDownSide() == true)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
                else if (this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
                else if (this.ObserveLeftSide() == true && this.ObserveDownSide() == false && this.ObserveRightSide() == false)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
                else if (this.ObserveDownSide() == false && this.ObserveRightSide() == false && this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
            }
        
    }

    RapidMovementWithRightHandAI(picWalker) {

            if (this.mDirection == Direction.Right)
            {
                if (this.ObserveUpSide() == false && this.ObserveDownSide() == false && this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
                else if (this.ObserveUpSide() == true && this.ObserveDownSide() == false && this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
                else if (this.ObserveDownSide() == true)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
                else if (this.ObserveUpSide() == true && this.ObserveDownSide() == false && this.ObserveRightSide() == false)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveDownSide() == false && this.ObserveRightSide() == false)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
            }

            if (this.mDirection == Direction.Left)
            {
                if (this.ObserveUpSide() == false && this.ObserveDownSide() == false && this.ObserveLeftSide() == true)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveDownSide() == true && this.ObserveLeftSide() == true)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
                else if (this.ObserveUpSide() == true)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveDownSide() == true && this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveDownSide() == false && this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
            }

            if (this.mDirection == Direction.Up)
            {
                if (this.ObserveLeftSide() == false && this.ObserveRightSide() == false && this.ObserveUpSide() == true)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
                else if (this.ObserveLeftSide() == true && this.ObserveRightSide() == false && this.ObserveUpSide() == true)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
                else if (this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
                else if (this.ObserveLeftSide() == true && this.ObserveUpSide() == false && this.ObserveRightSide() == false)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
                else if (this.ObserveUpSide() == false && this.ObserveRightSide() == false && this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
            }

            if (this.mDirection == Direction.Down)
            {
                if (this.ObserveLeftSide() == false && this.ObserveRightSide() == false && this.ObserveDownSide() == true)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
                else if (this.ObserveLeftSide() == false && this.ObserveRightSide() == true && this.ObserveDownSide() == true)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                }
                else if (this.ObserveLeftSide() == true)
                {
                    this.mDirection = Direction.Left;
                    this.MoveLeftSide(picWalker);
                }
                else if (this.ObserveLeftSide() == false && this.ObserveDownSide() == false && this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    this.MoveRightSide(picWalker);
                }
                else if (this.ObserveDownSide() == false && this.ObserveRightSide() == false && this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Up;
                    this.MoveUpSide(picWalker);
                }
            }

        
    }

    async PausedMovementWithAI(txtDirection, picWalker) {

            if (this.mDirection == Direction.Right)
            {
                if (this.ObserveUpSide() == false && 
                    this.ObserveDownSide() == false && 
                    this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveRightSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveUpSide() == true && 
                    this.ObserveDownSide() == false && 
                    this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveRightSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveDownSide() == true)
                {
                    this.mDirection = Direction.Down;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveDownSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveUpSide() == true && 
                    this.ObserveDownSide() == false && 
                    this.ObserveRightSide() == false)
                {
                    this.mDirection = Direction.Up;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveUpSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveUpSide() == false && 
                    this.ObserveDownSide() == false && 
                    this.ObserveRightSide() == false)
                {
                    this.mDirection = Direction.Left;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveLeftSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
            }

            if (this.mDirection == Direction.Left)
            {
                if (this.ObserveUpSide() == false && 
                    this.ObserveDownSide() == false && 
                    this.ObserveLeftSide() == true)
                {
                    this.mDirection = Direction.Left;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveLeftSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveUpSide() == false && 
                    this.ObserveDownSide() == true && 
                    this.ObserveLeftSide() == true)
                {
                    this.mDirection = Direction.Left;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveLeftSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveUpSide() == true)
                {
                    this.mDirection = Direction.Up;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveUpSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveUpSide() == false && 
                    this.ObserveDownSide() == true && 
                    this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Down;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveDownSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveUpSide() == false && 
                    this.ObserveDownSide() == false && 
                    this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Right;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveRightSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
            }

            if (this.mDirection == Direction.Up)
            {
                if (this.ObserveLeftSide() == false && 
                    this.ObserveRightSide() == false && 
                    this.ObserveUpSide() == true)
                {
                    this.mDirection = Direction.Up;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveUpSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveLeftSide() == true && 
                    this.ObserveRightSide() == false && 
                    this.ObserveUpSide() == true)
                {
                    this.mDirection = Direction.Up;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveUpSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveRightSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveLeftSide() == true && 
                    this.ObserveUpSide() == false && 
                    this.ObserveRightSide() == false)
                {
                    this.mDirection = Direction.Left;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveLeftSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveUpSide() == false && 
                    this.ObserveRightSide() == false && 
                    this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Down;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveDownSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
            }

            if (this.mDirection == Direction.Down)
            {
                if (this.ObserveLeftSide() == false && 
                    this.ObserveRightSide() == false && 
                    this.ObserveDownSide() == true)
                {
                    this.mDirection = Direction.Down;
                    this.MoveDownSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveLeftSide() == false && 
                    this.ObserveRightSide() == true && 
                    this.ObserveDownSide() == true)
                {
                    this.mDirection = Direction.Down;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveDownSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveLeftSide() == true)
                {
                    this.mDirection = Direction.Left;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveLeftSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveLeftSide() == false && 
                    this.ObserveDownSide() == false && 
                    this.ObserveRightSide() == true)
                {
                    this.mDirection = Direction.Right;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveRightSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
                else if (this.ObserveDownSide() == false && 
                    this.ObserveRightSide() == false && 
                    this.ObserveLeftSide() == false)
                {
                    this.mDirection = Direction.Up;
                    txtDirection.Text = this.mDirection.toString();
                    this.MoveUpSide(picWalker);
                    await new Promise(resolve => setTimeout(resolve, this.mMiliseconds));
                }
            }

            
        
    }
}
